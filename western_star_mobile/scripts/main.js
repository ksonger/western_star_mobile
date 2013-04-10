// JavaScript Document

// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);
// PhoneGap is ready
function onDeviceReady() {
	tpl.loadTemplates([
		'login',
		'home',
        'ws',
		'library',
		'calculators',
		'interiors',
        'tabstrip',
        'header',
        'video'
	], function () {
		app = new AppRouter();
		Backbone.history.start();
	});
	navigator.splashscreen.hide();
}