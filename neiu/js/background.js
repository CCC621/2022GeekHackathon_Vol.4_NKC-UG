chrome.runtime.onMessage.addListener((message, sender, response) => {
	
	//タブのurlを取得
	//console.log(sender.tab.url);
	
	var domain= sender.tab.url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1];
	//console.log(R);
	
	chrome.storage.local.get('urls', function (items) {
		const urls = Array.from(new Set(items.urls.split('`')));
		
		for(var i=1;i<urls.length;i++)
			
			if(domain === urls[i].match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]){
				chrome.tabs.remove(sender.tab.id);
				chrome.tabs.create({url: "public/blocked.html"});
			}
	});
	
	response();
})



