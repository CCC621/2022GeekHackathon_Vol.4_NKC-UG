chrome.runtime.onMessage.addListener((message, sender, response) => {
	
	//タブのurlを取得
	//console.log(sender.tab.url);
	
	var domain= sender.tab.url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1];
	//console.log(domain);
	
	chrome.storage.local.get('urls', function (items) {
		//console.log(items.urls);
		
		const urls = Array.from(new Set(items.urls.split('`')));
		//console.log(urls)
		
		for(var i=1; i <urls.length ;i++){
			/*
			console.log(domain);
			console.log(urls);
			console.log(i);
			console.log(urls[i]);
			console.log(urls[i].match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1])
			*/
			var url = urls[i].match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/);
			if(url !== null){
				//console.log(url)
				if(domain === url[1]){
					chrome.tabs.remove(sender.tab.id);
					chrome.tabs.create({url: "public/blocked.html"});
				}
			}
		}
	});
	
	response();
})

