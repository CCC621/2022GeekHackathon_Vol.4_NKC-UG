chrome.storage.local.get('Alertmsg', function (items) {　　// Alertmsgキーの対になる値をitemsとして返す
  alert(items.Alertmsg);  // itemsに格納されたAlertmsgキーの値（文字列）をアラートに表示
});