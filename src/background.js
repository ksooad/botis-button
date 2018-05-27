chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({serverList: 'Configure_servers_in_options'}, function() {
    console.log("Install init success");
  });
});