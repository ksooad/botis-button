let serverList;


function loadServerList() {
  chrome.storage.sync.get('serverList', function (data) {
    serverList = data.serverList;
  })
}


function tryCreateButtons() {
  if (!isNeedCreateButtons()) {
    return;
  }
  createAllButtons()
}

function getPopoverElement() {
  return document.getElementsByClassName('cbwf-info-action-popover')[0];
}

function isSelectHostSelectExist() {
  return document.querySelectorAll('[name=Host] > option').length > 0;
}

function isNeedCreateButtons() {
  let popOverElement = getPopoverElement();
  if (!popOverElement) {
    return false;
  }
  if (!isSelectHostSelectExist()) {
    return false;
  }

  if (alreadyHaveButtons()) {
    return false;
  }
  return true;
}


function getServersNamesFromServerList(serverList) {
  return serverList.split(/[\s]+/);
}

function alreadyHaveButtons() {
  return document.getElementById('boris-button-container')
}

function onDOMNodeInserted() {
  tryCreateButtons();
}

function createAllButtons() {
  const serverNames = getServersNamesFromServerList(serverList);
  let btnContainer = document.createElement('div');
  btnContainer.id = "boris-button-container";
  let label = document.createElement('label');
  label.innerHTML = "My servers:";
  label.id = "boris-button-servers-label";
  btnContainer.appendChild(label);
  serverNames.map( function (serverName) {
    let btn = createButton(serverName);
    btnContainer.appendChild(btn);
  });
  let popoverElement = getPopoverElement();
  popoverElement.appendChild(btnContainer);

}

function selectServer(serverName) {
  let selectElement = document.querySelector('[name=Host]');
  let options = document.querySelectorAll('[name=Host] > option');
  for (let i = 0 ; i <options.length ;i++) {
    let option = options[i];
    if (option.innerHTML === serverName) {
      option.selected = 'selected';
      selectElement.style.backgroundColor = "#d2e8d2";
      return;
    }
  }
  selectElement.style.backgroundColor = "#FABE58";
}

function createButton(serverName) {
  let btn = document.createElement('button');
  btn.type = 'button';
  btn.innerHTML = serverName;
  btn.className = "btn btn-info btn-sm boris-button";
  btn.onclick = function () {
    selectServer(serverName);
  };
  return btn;
}


console.log('content script started');
document.addEventListener('DOMNodeInserted', onDOMNodeInserted);
loadServerList();