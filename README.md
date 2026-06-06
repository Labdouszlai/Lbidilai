# Lbidilai

Firefox extension that fixes Arabic/English mixed text rendering on ChatGPT, Instagram and Claude.

## Install

1. Go to [addons.mozilla.org](https://addons.mozilla.org/)
2. Search for "Lbidilai"
3. Install

Or download the XPI from [Releases](https://github.com/Labdouszlai/Lbidilai/releases) and install manually.

### Temporary install (unsigned)

Before the add-on is signed by Mozilla, you can test it in Firefox:

1. Type `about:config` in the address bar
2. Search for `xpinstall.signatures.required`
3. Set it to **false**
4. Go to `about:addons`, click the gear icon → **Install Add-on From File**
5. Select the `.xpi` file

Or load it temporarily via `about:debugging` → This Firefox → Load Temporary Add-on.

## How it works

Injects BiDi CSS (`unicode-bidi: plaintext`) on all text elements and sets correct direction on containers so Arabic and English text in the same line renders properly.

## Supported sites

- chatgpt.com
- instagram.com
- claude.ai

## Developer

l'abdouszlai
