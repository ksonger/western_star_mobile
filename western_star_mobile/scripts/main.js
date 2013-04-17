var db_host = "http://kensonger.com";


document.addEventListener("deviceready", onDeviceReady, false);
// PhoneGap is ready
function onDeviceReady() {
	tpl.loadTemplates([
		'login',
		'home',
        'library',
        'ws',
		'calculators',
		'interiors',
        'tabstrip',
        'header',
        'video',
        'image'
	], function () {
		app = new AppRouter();
		Backbone.history.start();
	});
	navigator.splashscreen.hide();
    
}