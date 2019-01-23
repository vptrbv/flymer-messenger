/**
 * @file
 * Checking activities in background
 */

function firstTimeRegistration() {
  chrome.storage.local.get("registered", function (result) {
    console.log( result["registered"] );
    if (result["registered"])
      return;

    chrome.storage.local.set({ "registered": true }, function () { });
  });
}

// Set up listeners to trigger the first time registration.
chrome.runtime.onInstalled.addListener(firstTimeRegistration);
chrome.runtime.onStartup.addListener(firstTimeRegistration);
console.log("run");
