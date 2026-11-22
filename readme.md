# StudyDrive Downloader ⭐

A browser extension that lets you download documents from [StudyDrive](https://www.studydrive.net) as PDF, without Premium.

It works through StudyDrive's own **Download** button. You don't need a popup or any extra button.

Works in **Chrome, Edge, Brave, Opera, Firefox** and **Safari** (macOS).

---

## 1. Download the extension

1. Open the repository: **https://github.com/momo-senpai1/StudyDrive-Downloader**
2. Click the green **Code** button, then **Download ZIP**.
3. Extract the ZIP into a folder you will keep (don't delete it later; the browser loads the extension from there).

Or with git:

```bash
git clone https://github.com/momo-senpai1/StudyDrive-Downloader.git
```

## 2. Install it in your browser

### Chrome / Edge / Brave / Opera

1. Open the extensions page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
   - Brave: `brave://extensions`
   - Opera: `opera://extensions`
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select the extracted folder (the one that contains `manifest.json`).

### Firefox

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…** and select `manifest.json` in the extracted folder.

> Firefox removes temporary add-ons when it restarts. Repeat these steps after each restart.

### Safari (macOS)

1. Install Xcode from the App Store.
2. In Safari: **Settings → Advanced →** enable **Show features for web developers**.
3. In Terminal, convert the extension:
   ```bash
   xcrun safari-web-extension-converter /path/to/StudyDrive-Downloader
   ```
4. Xcode opens the generated project. Press **Run** (▶).
5. In Safari: **Develop → Allow Unsigned Extensions**, then **Settings → Extensions**. Enable **StudyDrive Downloader** and allow it on `studydrive.net`.

## 3. Download a document

1. Open any document on StudyDrive (`https://www.studydrive.net/<lang>/doc/...`).
2. Click StudyDrive's **Download** button in the document toolbar (the one that normally opens the Premium page).
3. The PDF downloads straight away. While it is loading, the button fades out.

Every document is saved as PDF, including `.pptx`, `.docx` and other uploads, because StudyDrive serves the preview as a PDF.

---

## Updating

After you download a new version (or change the code):

- **Chrome & co.:** `chrome://extensions` → click the reload icon on the extension.
- **Firefox:** `about:debugging` → **Reload**.
- **Safari:** run the project again in Xcode.

Then refresh the StudyDrive tab.

## Troubleshooting

- **The Premium page still opens:** reload the extension and refresh the StudyDrive tab.
- **Nothing happens:** press F12 on the document page and look in the console for `[StudyDrive Download]` messages.
  In Chrome you can also click **Service worker** on the extension card in `chrome://extensions` to see errors from the background script.
- **An alert shows an error:** open an [issue](https://github.com/momo-senpai1/StudyDrive-Downloader/issues) and include the message and the browser you use.

## How it works

- `content.js` catches the click on StudyDrive's Download button before the site reacts to it. It then reads the document's PDF link from the page.
- `background.js` downloads that PDF with the browser's downloads API (Chrome, Firefox and Edge). In Safari, it sends the file back to the page to save.

## Credits

Based on [Hamidchkms/StudyDrive-Downloader-Extension](https://github.com/Hamidchkms/StudyDrive-Downloader-Extension).

**Disclaimer:** For personal and educational use only. Please respect StudyDrive's terms and the rights of the document authors.
