
var min = 1;
var max = 5;
var current = min;

function updateIcon()
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://flymer.ru/", true); // тут происходит ГЕТ запрос на указанную страницу
	xhr.onreadystatechange = function()
	{
	  if (xhr.readyState == 4)
	  {
	    var dannie = document.getElementById('dannie');
	    dannie.innerHTML = xhr.responseText;
	  }
	}
	xhr.send();
	chrome.browserAction.setIcon({path:"/icons/48x48.png"});
	current++;

	if (current > max)
		current = min;
}

function resizeIframe(obj)
{
	obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}

var alarmName = 'refreshDelay';
//chrome.alarms.create(alarmName, 2);
//chrome.alarms.get(alarmName, updateIcon);
updateIcon();