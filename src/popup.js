/**
 * @file
 * the only script for now.
 */

function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  return id.toString();
}

function sendMessage() {
  var text = document.getElementById('messageText').value
  if (text) {
    chrome.notifications.create(getNotificationId(), {
      title: 'Flymer',
      iconUrl: 'https://flymer.ru/img/logo/shortlogo.png',
      type: 'basic',
      message: text
    }, function () { console.log('sent'); });
    document.getElementById('messageText').value = ''
  }
}

function bind_trailing_args(fn, ...bound_args) {
  return function (...args) {
    return fn(...args, ...bound_args);
  };
}

function openOptions() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}

window.onload = function () {
  var openInTab = function (mouseEv, url) {
    chrome.tabs.create(
      { 'url': 'https://flymer.ru/' + url }, function (tab) { }
    );
  }

  document.getElementById('sendMessage').onclick = sendMessage;
  document.getElementById('go-home').onclick = bind_trailing_args(openInTab, '');
  // document.getElementById('go-launch').onclick = bind_trailing_args(openInTab, 'launch');
  document.getElementById('go-to-bin').onclick = bind_trailing_args(openInTab, 'bin');
  document.getElementById('go-to-options').onclick = openOptions;
}
