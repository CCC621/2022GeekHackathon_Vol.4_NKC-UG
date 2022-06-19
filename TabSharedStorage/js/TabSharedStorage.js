window.onload=()=>{setUrlsFunction();document.getElementsByClassName("sk-cube-grid")[0].remove()}
function setUrlsFunction(){

	chrome.storage.sync.get('pageurl', function (items) {
		
		var url = [];
		var title = [];
		
		//console.log(items.pageurl);
		
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
	});
	
	document.getElementById('Delete').addEventListener('click', Delete);
	document.getElementById('Copy').addEventListener('click', Copy);
	
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
