var db_host = "http://developmentcmd.com";
var net_host = "http://win-dev.developmentcmd.com/Service1.svc";
var asset_host = "http://win-dev.developmentcmd.com/AppAssets/"


document.addEventListener("deviceready", onDeviceReady, false);
// PhoneGap is ready
function onDeviceReady() {
	tpl.loadTemplates([
		'login',
		'home',
        'library',
        'library_item',
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