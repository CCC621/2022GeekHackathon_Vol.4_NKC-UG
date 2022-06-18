window.onload=()=>{getParamFunction();document.getElementsByClassName("sk-cube-grid")[0].remove()}
function getParamFunction(){
	
	var params = (new URL(document.location)).searchParams;
	
	var url = params.get('url[]');
	var title = params.get('title[]');
	
	var contentAreaDiv = document.getElementById("contentAreaDiv");
	
	for(var i=0;i<url.length;i++){
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
//http://localhost:8000/?url[]=aaa&title[]=sioeuh&url[]=983217&title[]=86989879&
//	"url[]=" + text + "&" + "title[]=" + text+ "&"

