chrome.tabs.getSelected(null, function(tab) {
	window.alert(tab.url);
});