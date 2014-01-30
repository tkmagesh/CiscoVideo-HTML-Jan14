function isPrime(n){
	if (n<=3) return true;
	for(var i=2;i<=(n/2);i++)
		if (n % i == 0) return false;
	return true;
}

self.addEventListener("message",onSelfMessage);
function onSelfMessage(msgArg){
	var req = msgArg.data;
	if (req.type === "findPrimes"){
		var start = req.start,
			end = req.end,
			primeCount = 0,
			reportDelta = (end - start) / 20;

		for(var i=start;i<=end;i++){
			if (isPrime(i)) primeCount++;
			var progressValue = i - start;
			if (progressValue % reportDelta == 0){
				var compeletedPercent = progressValue / reportDelta;
				var progressRes = {
					type : "progress",
					percentCompleted : compeletedPercent,
					primeCount : primeCount
				};
				self.postMessage(progressRes);
			}
		}
		var res = {
			type : "completed",
			start : start,
			end : end,
			primeCount : primeCount
		};
		self.postMessage(res);
	}
}