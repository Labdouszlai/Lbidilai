(function() {
  var KEY = 'lbidilai_enabled';
  var SID = 'lbidilai-s';
  var on = true;
  var obs = null;

  function css() {
    return 'p, h1, h2, h3, h4, h5, h6, li, td, th, blockquote,' +
      'label, dd, dt, figcaption, caption, cite, q,' +
      'small, strong, em, b, u, i, s, a, button {' +
      'unicode-bidi: plaintext !important; text-align: start !important;}' +
      'pre, code, samp, kbd {' +
      'unicode-bidi: normal !important; direction: ltr !important; text-align: left !important;}' +
      'input, textarea, [contenteditable="true"] {' +
      'unicode-bidi: plaintext !important;}';
  }

  function addcss() {
    if (document.getElementById(SID)) return;
    var s = document.createElement('style');
    s.id = SID;
    s.textContent = css();
    document.head.appendChild(s);
  }

  function rmcss() {
    var s = document.getElementById(SID);
    if (s) s.remove();
  }

  function fixinputs() {
    document.querySelectorAll(
      'input[type="text"], input[type="search"], input[type="email"], ' +
      'input[type="url"], input[type="tel"], textarea, [contenteditable="true"]'
    ).forEach(function(el) {
      if (!el.hasAttribute('dir')) el.setAttribute('dir', 'auto');
    });
  }

  function sels() {
    var h = window.location.hostname;
    if (h.indexOf('chatgpt.com') > -1) {
      return ['article', '[data-message-author-role]', '[data-message-id]',
        '.markdown', '.prose', '[class*="message"]', '[class*="conversation"]'];
    }
    if (h.indexOf('instagram.com') > -1) {
      return ['article', '._a9zr', '._a9zs', '._a9ym', '._a9z_', 'h1', 'h2', '[role="button"]'];
    }
    if (h.indexOf('claude.ai') > -1) {
      return ['[data-message-role]', '.font-claude-message', '.prose',
        '.whitespace-pre-wrap', '[class*="message"]', 'article'];
    }
    return null;
  }

  function fixcons(arr) {
    if (!arr) return;
    arr.forEach(function(sel) {
      document.querySelectorAll(sel).forEach(function(el) {
        if (!el.hasAttribute('dir')) el.setAttribute('dir', 'auto');
      });
    });
  }

  function apply() {
    fixinputs();
    fixcons(sels());
  }

  function watch() {
    var arr = sels();
    obs = new MutationObserver(function(muts) {
      if (!on) return;
      muts.forEach(function(m) {
        m.addedNodes.forEach(function(n) {
          if (n.nodeType !== 1) return;
          if (n.matches && n.matches(
            'input[type="text"], input[type="search"], textarea, [contenteditable="true"]'
          ) && !n.hasAttribute('dir')) {
            n.setAttribute('dir', 'auto');
          }
          if (arr) {
            arr.forEach(function(sel) {
              if (n.matches && n.matches(sel) && !n.hasAttribute('dir')) {
                n.setAttribute('dir', 'auto');
              }
            });
          }
        });
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  function onfn() {
    addcss();
    apply();
    if (obs) obs.disconnect();
    watch();
  }

  function offfn() {
    rmcss();
    if (obs) { obs.disconnect(); obs = null; }
  }

  browser.storage.local.get(KEY, function(r) {
    on = r[KEY] !== false;
    if (on) onfn();
  });

  browser.runtime.onMessage.addListener(function(msg, snd, resp) {
    if (msg.type === 'getState') {
      resp({ enabled: on, hostname: window.location.hostname });
    } else if (msg.type === 'toggle') {
      on = msg.enabled;
      if (on) onfn(); else offfn();
      resp({ success: true, enabled: on });
    }
  });
})();
