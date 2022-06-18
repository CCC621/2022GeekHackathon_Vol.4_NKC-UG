window.onload=()=>{getParamFunction();document.getElementsByClassName("sk-cube-grid")[0].remove()}
function getParamFunction(){
	
	for(var prm of (new URL(document.location)).searchParams){
		
		console.log(
			'name :', prm[0], ', value :', prm[1]
		);
	}
}
//http://localhost:8000/?url[]=aaa&url[]=983217&
//	"url[]=" + text + "&"


