function Save(){
	chrome.storage.local.get('urls', function (items) {
		var msg = items.urls + "`" + document.getElementById('input_message').value;
		chrome.storage.local.set({'urls': msg},()=>{});
		});
	window.close();
}

document.getElementById('save_button').addEventListener('click', Save);
// 保存ボタン（save_button）がクリックされたらSave関数を実行