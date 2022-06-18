// テストよう
let pattern = /https:\/\/www.youtube.com\/*/;

chrome.runtime.onMessage.addListener((message, sender, response) => {
    response({
        "tabID": sender.tab.id,
        "url": sender.tab.url,
        "title": sender.tab.title
    })
    if(pattern.test(sender.tab.url)){
        chrome.tabs.remove(sender.tab.id);
        chrome.tabs.create({url: ""});
    }
})