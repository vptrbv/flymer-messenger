/**
 * @file
 * Checking activities in background
 */

var registerWindowCreated = false;

function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  return id.toString();
}

function firstTimeRegistration() {
  chrome.storage.local.get("registered", function (result) {
    // If already registered, bail out.
    if (result["registered"])
      return;

    registerWindowCreated = true;
    chrome.notifications.create(getNotificationId(), {
      title: 'Flymer',
      iconUrl: 'https://flymer.ru/img/logo/logo.png',
      type: 'basic',
      message: 'Initialized'
    });
    chrome.storage.local.set({ "registered": true }, function () { });
  });
}

// Set up listeners to trigger the first time registration.
chrome.runtime.onInstalled.addListener(firstTimeRegistration);
chrome.runtime.onStartup.addListener(firstTimeRegistration);
