// Downloads the file with the extension's own privileges, so page CORS rules don't apply.
const api = typeof browser !== 'undefined' ? browser : chrome;

async function fetchAsDataUrl(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const bytes = new Uint8Array(await res.arrayBuffer());
    let binary = '';
    for (let i = 0; i < bytes.length; i += 0x8000) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    }
    return 'data:application/pdf;base64,' + btoa(binary);
}

async function handle(msg) {
    // Chrome / Firefox / Edge: native downloads API (most reliable).
    if (api.downloads && api.downloads.download) {
        try {
            await api.downloads.download({ url: msg.url, filename: msg.fileName, saveAs: false });
            return { ok: true, done: true };
        } catch (e) {
            console.warn('[StudyDrive Download] downloads API failed, falling back', e);
        }
    }
    // Safari (no downloads API): send the file back to the page to save.
    return { ok: true, dataUrl: await fetchAsDataUrl(msg.url) };
}

api.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (!msg || msg.type !== 'sd-download') return;
    handle(msg)
        .then(sendResponse)
        .catch(e => sendResponse({ ok: false, error: String(e) }));
    return true; // keep channel open for async response
});
