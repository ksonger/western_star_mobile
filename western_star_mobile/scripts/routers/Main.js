/* global
cjsLoad:false
*/

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
	menuCollection:null,
	assetsCollection:null,
	thumbnailsCollection:null,
	localAssetsCollection:null,
	localThumbnailsCollection:null,
	imagesCollection:null,
    currentCollection:0,
    collections:[],
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
	imageManifest:[],
	assets_server:"http://kensonger.com/",
    dynamicAssets:false,
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
	begin:function () {
		this.online = window.navigator.onLine;

		var windowWidth;

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			windowWidth = window.innerWidth;
		}
		else {
			windowWidth = $(window).width();
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
		//TODO show a loader
		app.loader = new createjs.PreloadJS(false);
		app.loader.onFileLoad = function(o) {
			if (o.type == "image") {
				app.imageManifest[o.id] = o.result;
			}
		};
		app.loader.onProgress = function(e) {
			//var perc = app.loader.progress * 100;
		};
		app.loader.onComplete = function() {
			if (app.errors == 0) {
				//console.log("success");
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

    fetchCollections:function(index)    {
        app.collections[index].fetch({
            success:function()  {
                if(app.collections[index] === app.menuCollection)   {
                    var menu_json = app.menuCollection.models[0].attributes.GetMenuResult;
                    menu_json = menu_json.replace(/\'/g, '"');
                    app.menuCollection.models[0] = JSON.parse(menu_json);
                }
                if(app.collections[index] === app.assetsCollection)   {
                    var asset_json = app.assetsCollection.models[0].attributes.GetDataResult;
                    asset_json = asset_json.replace(/\'/g, '"');
                    app.assetsCollection.models[0] = JSON.parse(asset_json);
                }
                if(app.currentCollection < (app.collections.length-1))  {
                    app.currentCollection++;
                    app.fetchCollections(app.currentCollection);
                }   else    {
                    /*
                    all collections are loaded,
                    write to local store
                    */
                    app.ioModel = new IOModel();
                    app.ioModel.createLocalStore();
                }
            },
            fail:function() {
                console.log('Failed to load data: ', app.collections[index]);
            }
        })
    },

	initDatabase:function() {

        app.stringsCollection = new StringsCollection();
        app.usersCollection = new UsersCollection();
        app.menuCollection = new MenuCollection();
        app.assetsCollection = new AssetsCollection();
        app.thumbnailsCollection = new ThumbnailCollection();
        app.localAssetsCollection = new LocalAssetsCollection();
        app.localThumbnailsCollection = new LocalThumbnailsCollection();
        app.imagesCollection = new ImagesCollection();
        app.interiorsCatCollection = new InteriorsCatCollection();
        app.interiorsSubCatCollection = new InteriorsSubCatCollection();
        app.interiorsImagesCollection = new InteriorsImagesCollection();
        app.interiorsNavCollection = new InteriorsNavCollection();

		if (this.online) {

            app.collections = [
                app.stringsCollection,
                app.usersCollection,
                app.menuCollection,
                app.assetsCollection,
                app.thumbnailsCollection,
                app.imagesCollection,
                app.interiorsCatCollection,
                app.interiorsSubCatCollection,
                app.interiorsImagesCollection,
                app.interiorsNavCollection
            ];

            app.fetchCollections(app.currentCollection);

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
		if(app.dynamicAssets)   {
            var imgArr = [];
            $.each(this.imagesCollection.models, function(index, model) {
                var iObj = {"id":model.get("id"),"src":model.get("src")};
                imgArr.push(iObj);
            });
            this.cjsLoad(imgArr);
        }

		app.mainView = new MainView({model:app.stringsCollection});
		app.mainView.render();
	}
});
