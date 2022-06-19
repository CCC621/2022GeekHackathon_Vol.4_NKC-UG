chrome.runtime.onMessage.addListener((message, sender, response) => {
	response();
	//タブのurlを取得
	//console.log(sender.tab.url);
	
	if(sender.tab.url !== null)
		var domain= sender.tab.url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1];
	else
		domain = "arienaidomain";
	//console.log(domain);
	
	chrome.storage.local.get('urls', function (items) {
		//console.log(items.urls);
		if(typeof items.urls === "undefined")
			return;
		
		const urls = Array.from(new Set(items.urls.split('`')));
		//console.log(urls)
		
		for(var i=1; i <urls.length ;i++){
			/*
			console.log(domain);
			console.log(urls);
			console.log(i);
			console.log(urls[i]);
			console.log(urls[i].match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1])
			*/
			var url = urls[i].match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/);
			if(url !== null){
				//console.log(url)
				if(domain === url[1]){
					chrome.tabs.remove(sender.tab.id);
					chrome.tabs.create({url: "public/blocked.html"});
				}
			}
		}
		
	});
	
	
})

///////////////////////////////////////////////////////////////////////////////////////////

// The HistreeStorage class has methods for accessing the the stored histrees
class HistreeStorage {

  constructor() {
    // The rootsDict is where we will store
    this.rootsDict = {
      // tabId: tree
    };
  }

  insertNodeIntoTreeByTabId(node, tabId) {
    // Ensure that the node has a children array
    node.children = node.children || [];

    // If this tab does not yet have a tree
    if (!(tabId in this.rootsDict)) {
      // Create a new tree for the tab
      this.rootsDict[tabId] = {
        root: node,
        currentNode: node,
        depth: 1,
        width: 1
      }
    }
    // Else if the tab already has a tree
    else {
      // Check to see if the node is already in the tree
      var visitedNode = treeHasVisited(this.rootsDict[tabId].root, node);

      // If the node is already in the tree
      if (visitedNode) {
        // Set the node to be the current node
        this.rootsDict[tabId].currentNode = visitedNode;
      }
      else {
        // Else add the node as a child of the current node
        this.rootsDict[tabId].currentNode.children.push(node);
        // and set the current node to the new page
        this.rootsDict[tabId].currentNode = node;
      }

      // Recalc width and depth of tree
      this.rootsDict[tabId].depth = depthOf(this.rootsDict[tabId].root, 0);
      this.rootsDict[tabId].width = widthOf(this.rootsDict[tabId].root, 0);
    }
  }

  getHistreeForTabId(tabId) {
    return this.rootsDict[tabId];
  }
}


// Initialize a new HistreeStorage object when background process / chrome starts up
const histreeStorage = new HistreeStorage();

// This handles messages sent from inject.js or browser_action.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handles requests from browser_action.js
  if (request.from === 'browser_action') {
    if (request.action === 'get-tree') {
      return sendResponse(histreeStorage.getHistreeForTabId(request.data.tab.id));
    }
  }
});

// Listens for changes to tabs to see when pages are loaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    histreeStorage.insertNodeIntoTreeByTabId({
      url: tab.url,
      title: tab.title,
      favIconUrl: tab.favIconUrl
    }, tab.id);
  }
});

function areSameNode(node1, node2) {
	return node1.url === node2.url;
}

function treeHasVisited(r, n){
	if (areSameNode(n, r)) {
		return r;
	}
	else{
		for (var i = 0; i < r.children.length; i++){
			var visitedNode = treeHasVisited(r.children[i], n);
			if (visitedNode){
				return visitedNode;
			}
		}
	}
	return false;
};

function depthOf(r, d){
	d++;
	if (isLeaf(r)){
		return d;
	}
	else{
		var children_depths = r.children.map(function(x){return depthOf(x, d);});
		return Math.max.apply( Math, children_depths);
	}
};

function widthOf(r, w){
	if (isLeaf(r)){
		return 1;
	}
	else{
		current_width = w;
		r.children.forEach(function(c){ w += widthOf(c, current_width); })
	}
	return w;
};

function isLeaf(r){
	return (r.children.length === 0);
}

// Here's an alternative implementation of this method - the functionality isn't different, it
// 	just uses some native javascript iteration power
// function treeHasVisited(tree, node){
// 	if (areSameNode(tree, node)) {
// 		return tree;
// 	}
// 	// Find the child tree that has the node, or return undefined if that node isn't found
// 	return tree.children.find(child => treeHasVisited(child, node));
// };
