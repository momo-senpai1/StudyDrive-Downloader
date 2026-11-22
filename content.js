(function() {
    const api = typeof browser !== 'undefined' ? browser : chrome;
    const urlPattern = /^https:\/\/www\.studydrive\.net\/[a-z]{2}\/doc\//i;
    const BUTTON_SELECTOR = 'button[data-specific-auth-trigger="download"]';
    let busy = false;

    function getButton(target) {
        if (!urlPattern.test(location.href) || !(target instanceof Element)) return null;
        const btn = target.closest(BUTTON_SELECTOR);
        if (btn) return btn;
        // Fallback in case StudyDrive renames the attribute.
        const b = target.closest('button');
        return b && /^\s*download\s*\d*\s*$/i.test(b.textContent || '') ? b : null;
    }

    // Swallow every pointer/mouse/touch event on the button in the capture phase,
    // so StudyDrive's own handlers (premium popup / login modal) never fire.
    const blocked = ['pointerdown', 'pointerup', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'auxclick', 'dblclick'];
    blocked.forEach(type => window.addEventListener(type, e => {
        if (getButton(e.target)) { e.preventDefault(); e.stopImmediatePropagation(); }
    }, { capture: true, passive: false }));

    window.addEventListener('click', e => {
        const btn = getButton(e.target);
        if (!btn) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        startDownload(btn);
    }, true);

    async function startDownload(btn) {
        if (busy) return;
        busy = true;
        btn.style.opacity = '0.6';
        btn.style.cursor = 'progress';
        try {
            const html = await (await fetch(location.href, { credentials: 'include' })).text();
            const url = getDownloadLink(html);
            if (!url) throw new Error('Download link not found');
            const fileName = getFileName(html);

            const res = await api.runtime.sendMessage({ type: 'sd-download', url, fileName });
            if (!res || !res.ok) throw new Error(res && res.error);
            if (res.dataUrl) saveUrl(res.dataUrl, fileName);
        } catch (err) {
            console.error('[StudyDrive Download]', err);
            alert('StudyDrive Downloader: ' + err.message);
        } finally {
            busy = false;
            btn.style.opacity = '';
            btn.style.cursor = '';
        }
    }

    function getDownloadLink(html) {
        const m = /"file_preview":("[^"]*")/.exec(html);
        return m ? JSON.parse(m[1]) : null;
    }

    function getFileName(html) {
        const m = /"filename":("[^"]*")/.exec(html);
        let name = m ? JSON.parse(m[1]) : 'document';
        // The preview StudyDrive serves is always a PDF (even for .pptx/.doc/.xlsx uploads),
        // so replace whatever extension the original had with .pdf.
        name = name.replace(/\.[a-z0-9]{1,5}$/i, '') || 'document';
        return name.replace(/[\\/:*?"<>|]/g, '_') + '.pdf';
    }

    function saveUrl(url, fileName) {
        const a = document.createElement('a');
        a.download = fileName;
        a.href = url;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => a.remove(), 1000);
    }
})();
