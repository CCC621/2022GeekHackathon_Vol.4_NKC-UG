window.onload = function() {
	chrome.tabs.getSelected(null, function(tab) {
		document.getElementById('app').innerHTML = tab.url;
	});
};