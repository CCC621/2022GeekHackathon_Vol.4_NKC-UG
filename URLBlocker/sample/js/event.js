window.addEventListener('load', () => {
    chrome.runtime.sendMessage('load', response => {
        console.dir(response);
    })
})