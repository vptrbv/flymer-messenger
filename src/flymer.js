/**
 * @file
 * the only script for now.
 */

function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  return id.toString();
}

function sendMessage() {
  chrome.notifications.create(getNotificationId(), {
    title: 'Flymer',
    iconUrl: 'https://flymer.ru/img/logo/logo.png',
    type: 'basic',
    message: 'W00FW00F'
  }, function () { console.log('sent'); });
}

function openFlymer() {
  try {
    chrome.tabs.create(
      { 'url': 'https://flymer.ru' },
      function (tab) { console.log('opened'); }
    );
  } catch { // TODO: specify non-browser more specific
    console.log('not opened');
  }
}

window.onload = function () {
  document.getElementById('sendButton').onclick = sendMessage;
  document.getElementById('goHome').onclick = openFlymer;
}
