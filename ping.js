function Ping(url) {
	timeout = 1500;
	var timer = null;

	return $.Deferred(function deferred(defer) {

			var img = new Image();
			img.onload = function () { success("onload"); };
			img.onerror = function () { success("onerror"); };

			var start = new Date();
			img.src = url += ("?cache=" + +start);
			timer = window.setTimeout(function timer() { fail(); }, timeout);

			function cleanup() {
				window.clearTimeout(timer);
				timer = img = null;
			}

			function success(on) {
				cleanup();
				defer.resolve(true, url, new Date() - start, on);
			}

			function fail() {
				cleanup();
				defer.reject(false, url, new Date() - start, "timeout");
			}
			
	}).promise()
}

Ping("https://de174.die-staemme.de").done(function (success, url, time, on) {
	UI.SuccessMessage('Ping: '+time+'ms');
});
