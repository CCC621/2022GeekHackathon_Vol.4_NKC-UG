
document.addEventListener("DOMContentLoaded", ()=>{
	chrome.runtime.sendMessage('load', response => {
       // console.dir(response);
    })
} );
