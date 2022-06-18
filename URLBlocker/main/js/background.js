chrome.runtime.onMessage.addListener((message, sender, response) => {
	
	//タブのurlを取得
	//console.log(sender.tab.url);
	
	var domain= sender.tab.url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1];
	//console.log(R);
	
	if(domain === "www.youtube.com"){
		//console.log("Yes!!");
		chrome.tabs.remove(sender.tab.id);
		chrome.tabs.create({url: "public/blocked.html"});
	}
	
	response();
})
