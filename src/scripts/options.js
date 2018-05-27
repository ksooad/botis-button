function loadServerList() {
  chrome.storage.sync.get('serverList', function(data) {
    let serverList = data.serverList;
    console.log(serverList);
    let inputElement = document.getElementById('serverList');
    inputElement.value = serverList;
  });
}

function saveServerList() {
  let inputElement = document.getElementById('serverList');
  let serverList  = inputElement.value;
  chrome.storage.sync.set({serverList: serverList});
}

function bindSave() {
  let saveBtn = document.getElementById('saveBtn');
  saveBtn.onclick = saveServerList;
}

function init() {
  loadServerList();
  bindSave();
}

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

