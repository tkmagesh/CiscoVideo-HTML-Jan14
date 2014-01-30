function doWork(){
		for(var i=0;i<100000;i++)
			for(var j=0;j<1000;j++)
				for(var k=0;k<100;k++)
				{}
	}

function displayMessage(msg){
		self.postMessage(msg);
	}
self.addEventListener("message",function(msgEvt){
	if (msgEvt.data === "start"){
		displayMessage("Work started");
		doWork();
		displayMessage("Work completed");
		self.postMessage("done");
	}
});
