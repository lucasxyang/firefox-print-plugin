var doc = document;
if(doc.getElementById("TopShelfAddOnIsInstalled") != null){
	doc.getElementById("TopShelfAddOnIsInstalled").value = "true";
}
if(doc.getElementById("TopShelfAddOnVersion") != null){
	// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/getManifest
	doc.getElementById("TopShelfAddOnVersion").value = browser.runtime.getManifest().version;
}

doc.addEventListener("OnTopShelfPrintLabel", CustomEventListener, false, true);

function CustomEventListener(e){
	//shown when running the add-on through the sdk
	console.log("OnTopShelfPrintLabel Event");
	//console.log(e);
	//console.log(JSON.parse(e.detail));
	
	if(e != null && e.detail != null){
		// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/connect
		var conn = browser.runtime.connect({name: "TopShelf"});
		conn.postMessage({detail: e.detail});
	}
}