document.addEventListener('DOMContentLoaded', function() {
  var on = document.getElementById('on');
  var dark = document.getElementById('dark');
  var cur = document.getElementById('cur');

  browser.storage.local.get('lbidilai_theme', function(r) {
    var d = r.lbidilai_theme === 'dark';
    document.body.classList.toggle('dark', d);
    dark.checked = d;
  });

  function getst() {
    browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (!tabs[0] || !tabs[0].id) return;
      browser.tabs.sendMessage(tabs[0].id, { type: 'getState' }).then(function(res) {
        on.checked = res.enabled;
        cur.textContent = res.hostname || 'unknown';
      }).catch(function() {
        cur.textContent = 'reload page';
        on.checked = true;
      });
    });
  }

  getst();

  on.addEventListener('change', function() {
    var v = on.checked;
    browser.storage.local.set({ lbidilai_enabled: v });
    browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0] && tabs[0].id) {
        browser.tabs.sendMessage(tabs[0].id, { type: 'toggle', enabled: v });
      }
    });
  });

  dark.addEventListener('change', function() {
    var d = dark.checked;
    document.body.classList.toggle('dark', d);
    browser.storage.local.set({ lbidilai_theme: d ? 'dark' : 'light' });
  });
});
