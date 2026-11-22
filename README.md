# StudyDrive Downloader for free without premium⭐
# Installation Guide for StudyDrive Downloader Extension

This Chrome extension allows you to download documents from StudyDrive.

## Installation Steps

1. **Download the Extension**

    ![1](https://github.com/Hamidchkms/StudyDrive-Downloader-Extension/assets/85966772/a2700f84-cd81-4e47-8b18-207d25fac2cc)
   
![2](https://github.com/Hamidchkms/StudyDrive-Downloader-Extension/assets/85966772/527ec4d1-90b2-4b9a-ae53-3df9c48c0833)


3. **Extract the ZIP Archive**


    Extract the downloaded ZIP archive into a folder of your choice.
![3](https://github.com/Hamidchkms/StudyDrive-Downloader-Extension/assets/85966772/1157cf2c-3d96-432e-b9ea-967745e21f3c)

4. **Install the Extension**

    - Open Google Chrome.
    - Go to the extension settings by clicking the three-dot menu in the top-right corner of the browser, then selecting "More Tools" > "Extensions". or ![4](https://github.com/Hamidchkms/StudyDrive-Downloader-Extension/assets/85966772/614fd76e-28d6-49e4-88c1-e4d956e4227a)

    - Enable developer mode (top right).
    - Click on "Load Unpacked" and select the folder where you extracted the extension.
![5](https://github.com/Hamidchkms/StudyDrive-Downloader-Extension/assets/85966772/05b39353-2380-4f89-8e96-706e6ff91d43)
![7](https://github.com/Hamidchkms/StudyDrive-Downloader-Extension/assets/85966772/bd577211-d9ff-4b37-adc8-1372fd8cd0a2)

5. **Using the Extension**

    - Open any document page on StudyDrive (`https://www.studydrive.net/<lang>/doc/...`).
    - Click StudyDrive's own **Download** button in the document toolbar (the one that normally asks for Premium).
    - The extension intercepts that click and downloads the PDF instead. There is no popup or extra button; it works the same in every browser.
![8](https://github.com/Hamidchkms/StudyDrive-Downloader-Extension/assets/85966772/72cb1286-977a-44eb-99f9-9bd9b16cfd61)

## Other browsers

The extension uses a content script only, so the download behaves the same everywhere.

**Firefox**
1. Open `about:debugging#/runtime/this-firefox`.
2. Click "Load Temporary Add-on..." and select `manifest.json` in the extension folder.

**Safari (macOS)**
1. Safari > Settings > Advanced > enable "Show features for web developers".
2. In Terminal run: `xcrun safari-web-extension-converter /path/to/extension-folder` and build/run the generated Xcode project.
3. Enable the extension in Safari > Settings > Extensions and allow it on `studydrive.net`.

**Edge / Brave / Opera**: same steps as Chrome (Load Unpacked).

That's it! The extension is now installed and ready to use.

---

**After updating the extension:** reload it (Chrome: `chrome://extensions` → reload icon; Firefox: `about:debugging` → Reload) and refresh the StudyDrive tab.

**Troubleshooting:** if nothing happens, open the browser console (F12) on the document page and look for `[StudyDrive Download]` messages. In Chrome you can also click "Service worker" on the extension card in `chrome://extensions` to see background errors.

**Note:** Developed and tested in Google Chrome. Firefox and Safari support is included but less tested. If the direct download fails because of browser restrictions, the extension falls back to opening the PDF in a new tab, where you can save it manually.
