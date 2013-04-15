Backbone.View.prototype.close = function () {
	console.log('Closing view ' + app);
	if (app.beforeClose) {
		app.beforeClose();
	}
	app.remove();
	app.unbind();
};

var app;

var AppRouter = Backbone.Router.extend({

	initialize:function () {
	},
	stringsCollection:null,
	usersCollection:null,
	assetsCollection:null,
	ioModel:null,
	mainView:null,
	int:null,
	currentLayout:"landscape",
	lang:"en",
	online:false,
	routes:{
		"":"index"
	},
	states:[],
	currentState:null,
	rInt:null,
	online:true,
    
    
	index:function () {
		app.begin();
	},
	setState:function(state) {
		if (state != app.currentState) {
			if (app.currentState != null) {
				app.currentState.onExit();
				TweenMax.to(app.currentState.$el, .4, {css:{autoAlpha:0}});
			}
			app.currentState = state;
			app.currentState.onEnter();

			if (app.currentState != app.mainView.loginView) {  
				//$(".km-navbar").show();
				if (app.currentState != app.mainView.homeView) {
					TweenMax.to($("#tabstrip"), .01, {css:{autoAlpha:1}});
					TweenMax.to($("#header_bar"), .01, {css:{autoAlpha:1}});
				}
				else {
					TweenMax.to($("#tabstrip"), .01, {css:{autoAlpha:0}});
					TweenMax.to($("#header_bar"), .01, {css:{autoAlpha:0}});
				}
			}
			else {
				TweenMax.to($("#tabstrip"), .01, {css:{autoAlpha:0}});
				TweenMax.to($("#header_bar"), .01, {css:{autoAlpha:0}});
			}
		}
	},
	begin:function (callback) {
		this.online = window.navigator.onLine;
        
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			var windowWidth = window.innerWidth;
			var windowHeight = window.innerHeight;
		}
		else {
			var windowWidth = $(window).width();
			var windowHeight = $(window).height();
		}

		if (windowWidth <= 1024) {
			app.currentLayout = "portrait";
		}
		else {
			app.currentLayout = "landscape";
		}
		app.initDatabase();
	},
       
	initDatabase:function(callback) {  
		this.stringsCollection = new StringsCollection();
		this.usersCollection = new UsersCollection();
		this.assetsCollection = new AssetsCollection();
        this.online = true;
		if (this.online) {
			app.stringsCollection.fetch({
				success:function () {
					app.usersCollection.fetch({
						success:function () {
							app.assetsCollection.fetch({
								success:function () {
									// write to local store
									app.ioModel = new IOModel();
									app.ioModel.createLocalStore();
								}, error:function(e) {
									console.log(e);
								}
							});
						}, error:function(e) {
							console.log(e);
						}
					});
				}, error:function(e) {
					console.log(e);
				}
			});
		}
		else {
			app.ioModel = new IOModel();
			app.ioModel.createLocalStore();
		}
	},
    
	onDataReady:function() {
		app.mainView = new MainView({model:app.stringsCollection});
		app.mainView.render();
	}
});

var wh = $(window).height();
var ww = $(window).width();

var db_host = "http://kensonger.com";

$(window).resize(function() {
});