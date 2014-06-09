$("divpage").load('http://flymer.ru/');
//var myElements = document.querySelectorAll("*");
 
//for (var i = 0; i < myElements.length; i++) {
  //  myElements[i].style.visibility = 0;
//}

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});