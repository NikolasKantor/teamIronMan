/**
 * Listens for the app launching, then creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function(launchData) {
	chrome.app.window.create(
		'index.html', {
			id: 'mainWindow',
			minWidth: 300,
			minHeight: 400,
			bounds: {
				width: 400,
				height: 700
			}
		}
	);
});
