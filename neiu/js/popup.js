window.addEventListener('load',()=>{
	
	//現在のウインドウのタブをすべて取得
	chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT},(tabs) => {
		let txt = '';
		const delimiter = '\n';	//区切り文字
		const template = '%%URL%% | %%title%%'; //テンプレ

		document.querySelector('#numOfTabs').value = tabs.length;

		tabs.forEach((tab,i) => {
			if(i!=0) txt += delimiter;	//最初は区切り文字不要
			console.log(tab.title+" "+tab.url);
			txt += createTextFromTemplate(tab.title,tab.url,template);
		});

		document.querySelector('#txt').value = txt;

	});
	
	
	document.getElementById('Storage').addEventListener('click', Storage);
})

function Storage(){
	chrome.storage.sync.get('pageurl', function (items) {
		var msg = items.pageurl + "^" + document.querySelector('#txt').value;
		chrome.storage.sync.set({'pageurl': msg},()=>{});
		});
	window.close();
}

function Save(){
	chrome.storage.local.get('urls', function (items) {
		var msg = items.urls + "`" + document.getElementById('input_message').value;
		chrome.storage.local.set({'urls': msg},()=>{});
		});
	window.close();
}

document.getElementById('save_button').addEventListener('click', Save);
// 保存ボタン（save_button）がクリックされたらSave関数を実行

const createTextFromTemplate = (title, url, template) => {
	let txt = template;

	txt = txt.replace(/%%title%%/g,title);
	txt = txt.replace(/%%URL%%/g,url);
	
	return txt;
}

