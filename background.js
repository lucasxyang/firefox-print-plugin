// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onConnect
browser.runtime.onConnect.addListener(function(port){	
	//console.log(port);
	
	// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/Port
	port.onMessage.addListener(function(e){				
		//console.log(e);
		if(e != null && e.detail != null){
			var obj = null;
			try{
				obj = JSON.parse(e.detail);
			}catch(tempE){
				throw "Invalid Event Data: detail";
			}
			if(obj != null){
				var labelText = obj.labelText;
				var printerUrl = obj.printerUrl;
				
				if(labelText != null && printerUrl != null){
					var data = labelText;
					var req = new XMLHttpRequest();
					req.open("POST", printerUrl, true);	
					req.timeout = 1000;
					req.send(data);
					req = null;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}else{
			return false;
		}
		return true;
	});
});