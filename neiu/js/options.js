document.getElementById('remove_button').addEventListener('click',()=>{chrome.storage.local.set({'urls': ""},()=>{});location.reload();});

window.onload=()=>{loadFunction();document.getElementsByClassName("sk-cube-grid")[0].remove()}
function loadFunction(){
	
	chrome.storage.sync.get('pageurl', function (items) {
		
		var url = [];
		var title = [];
		
		//console.log(items.pageurl);
		if(items.pageurl){
			console.log(items.pageurl)
			var pages = Array.from(new Set(items.pageurl.split('\n')));
			pages[0] = pages[0].split('^')[1];	
			var txt = document.getElementById('txt');
			txt.value = "";
			
			for(var i=0;i<pages.length;i++){
				txt.value = txt.value + pages[i]
				var p = pages[i].split(' | ');
				url.push(p[0])
				title.push(p[1])
			}
			
			var contentAreaDiv = document.getElementById("contentAreaDiv");

			for(var i=0;i<5;i++){
				var div = document.createElement("div");
				div.className = "tab";
				
				var a = document.createElement("a");
				a.className = "clickable";
				a.setAttribute("href",url[i]);
				a.innerText = title[i];
				
				div.appendChild(a);
				contentAreaDiv.appendChild(div);
			}
		}
	});
	
	document.getElementById('Delete').addEventListener('click', Delete);
	document.getElementById('Copy').addEventListener('click', Copy);
	
	
	chrome.storage.local.get('urls', function (items) {
		//console.log(items.urls);
		//undefined:domain1:domain2:domain3
		if(items.urls){
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
		}
	});
}

function Delete(){
	if(window.confirm("本当に削除しますか？") == true)
		chrome.storage.sync.set({'pageurl': msg},()=>{})
}
function Copy(){
	const t = document.getElementById('txt');
	t.setAttribute("style","");
	t.select();
	document.execCommand('copy');
	t.setAttribute("style","display:none");
	alert("クリップボードにコピーしました！")
}
