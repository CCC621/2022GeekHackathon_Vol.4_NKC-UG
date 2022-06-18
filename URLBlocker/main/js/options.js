document.getElementById('remove_button').addEventListener('click',()=>{chrome.storage.local.set({'urls': ""},()=>{});location.reload();});

window.onload=()=>{getParamFunction();document.getElementsByClassName("sk-cube-grid")[0].remove()}
function getParamFunction(){
	
	chrome.storage.local.get('urls', function (items) {
		//console.log(items.urls);
		//undefined:domain1:domain2:domain3
		const urls = Array.from(new Set(items.urls.split('`')));
		
		var contentAreaDiv = document.getElementById("app");
	
		for(var i=1;i<urls.length;i++){
			
			var div = document.createElement("div");
			div.className = "tab";
			
			var a = document.createElement("a");
			a.className = "clickable";
			a.setAttribute("href","https://"+urls[i].match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]+"/");
			a.innerText = urls[i].match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1];
			
			div.appendChild(a);
			contentAreaDiv.appendChild(div);
		}
	
	});
	
	
}