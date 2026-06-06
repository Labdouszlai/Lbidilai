browser.runtime.onInstalled.addListener(function() {
  browser.storage.local.get('lbidilai_enabled', function(r1) {
    if (r1.lbidilai_enabled === undefined) {
      browser.storage.local.set({ lbidilai_enabled: true });
    }
  });
  browser.storage.local.get('lbidilai_theme', function(r2) {
    if (r2.lbidilai_theme === undefined) {
      browser.storage.local.set({ lbidilai_theme: 'light' });
    }
  });
});
