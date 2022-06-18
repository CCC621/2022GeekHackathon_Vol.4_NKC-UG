function Save() {
  var message = document.getElementById('input_message').value;  // テキストボックス（input_message）に入力された文字列をmessage変数に格納

  chrome.storage.local.set({'Alertmsg': message}, function () {
  });  // Alertキーとmessageの文字列を対にして記録
}

function Load() {
  chrome.storage.local.get('Alertmsg', function (items) {
    document.getElementById('input_message').value = items.Alertmsg;  // Alertmsgキーと対に記録された文字列を、idがinput_messageのテキストボックスに出力
  });
}

document.addEventListener('DOMContentLoaded', Load);  // オプションページ（options.html）の読み込みと解析が完了したらLoad関数を実行

document.getElementById('save_button').addEventListener('click', Save);　　// 保存ボタン（save_button）がクリックされたらSave関数を実行