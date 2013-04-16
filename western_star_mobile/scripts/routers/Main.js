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
		this.createjs = createjs || {};
	},
	stringsCollection:null,
	usersCollection:null,
	assetsCollection:null,
	imagesCollection:null,
	ioModel:null,
	mainView:null,
	int:null,
	currentLayout:"landscape",
	lang:"en",
	online:false,
	isIE10Touch:false,
	isTouchDevice:false,
	windowWidth:null,
	windowHeight:null,
    loader:null,
	states:[],
	currentState:null,
	rInt:null,
	online:true,
	imageManifest:[],
    errors:0,
    routes:{
		"":"index"
	},
    
    
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
    
	cjsLoad:function(manifest) {
        console.log(typeof manifest);
		//TODO show a loader
		app.loader = new createjs.PreloadJS(false);
		app.loader.onFileLoad = function(o) {
			if (o.type == "image") {
				app.imageManifest[o.id] = o.result;
			}
		};
		app.loader.onProgress = function(e) {
			var perc = app.loader.progress * 100;
		};
		app.loader.onComplete = function() {
			if (app.errors == 0) {
				console.log("success");
			}
			else {
				if (console && console.log) {
					console.log("errors loading the manifest assets")
				}
			}
		};
		app.loader.onFileProgress = function(e) {
		};
		app.loader.onError = function(e) {
			if (console && console.log) {
				console.log(e);
				console.log(this);
			}
			app.errors++;
		};
		if (manifest.length > 0) {
			app.loader.loadManifest(manifest);
		}
		else {
			console.log("manifest length is zero.");
		}
	},
       
	initDatabase:function(callback) {  
		this.stringsCollection = new StringsCollection();
		this.usersCollection = new UsersCollection();
		this.assetsCollection = new AssetsCollection();
		this.imagesCollection = new ImagesCollection();
		this.online = true;
		if (this.online) {
			app.stringsCollection.fetch({
				success:function () {
					app.usersCollection.fetch({
						success:function () {
							app.assetsCollection.fetch({
								success:function () {
									app.imagesCollection.fetch({
										success:function (result) {
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
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			app.isTouchDevice = true;
		}
		if (navigator.platform.toLowerCase().indexOf("win") !== -1 && navigator.userAgent.toLowerCase().indexOf("touch") !== -1) {
			app.isIE10Touch = true;
		}
		// GET AVAILABLE DIMENSIONS
		if (this.isTouchDevice) {
			app.windowWidth = window.innerWidth;
			app.windowHeight = window.innerHeight;
		}
		else {
			app.windowWidth = $(window).width();
			app.windowHeight = $(window).height();
		}
		if (typeof window.HTMLAudioElement === "undefined") {
			window.HTMLAudioElement = function () {
			};
		}
        var imgArr = [];
		$.each(this.imagesCollection.models, function(index, model)    {
            var iObj = {"id":model.get("id"),"src":model.get("src")}
            imgArr.push(iObj);
        });
        this.cjsLoad(imgArr);
		app.mainView = new MainView({model:app.stringsCollection});
		app.mainView.render();      
	}
});

var db_host = "http://kensonger.com";

$(window).resize(function() {
});