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
	begin:function (callback) {
		this.online = window.navigator.onLine;
		//this.online = false;
		var windowWidth;
		var windowHeight;
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			windowWidth = window.innerWidth;
			windowHeight = window.innerHeight;
		}
		else {
			windowWidth = $(window).width();
			windowHeight = $(window).height();
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
			var perc = app.loader.progress * 100;
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

	initDatabase:function(callback) {
		this.stringsCollection = new StringsCollection();
		this.usersCollection = new UsersCollection();
		this.menuCollection = new MenuCollection();
		this.assetsCollection = new AssetsCollection();
		this.thumbnailsCollection = new ThumbnailCollection();
		this.localAssetsCollection = new LocalAssetsCollection();
		this.localThumbnailsCollection = new LocalThumbnailsCollection();
		this.imagesCollection = new ImagesCollection();
		this.interiorsCatCollection = new InteriorsCatCollection();
		this.interiorsSubCatCollection = new InteriorsSubCatCollection();
		this.interiorsImagesCollection = new InteriorsImagesCollection();
		this.interiorsNavCollection = new InteriorsNavCollection();

		if (this.online) {
            /*
            TODO: Sort out the services side to prevent the need for this crazy chain of calls,
            or add a helper method to pass each collection to and return success/fail.
            Should just make one trip over the wire and respond with a single JSON object, though.
             */
			app.stringsCollection.fetch({
				success:function () {
					app.usersCollection.fetch({
						success:function () {
							app.menuCollection.fetch({
								success:function () {
                                    var menu_json = app.menuCollection.models[0].attributes.GetMenuResult;
									menu_json = menu_json.replace(/\'/g, '"');
									app.menuCollection.models[0] = JSON.parse(menu_json);
									app.assetsCollection.fetch({
										success:function (result) {
											var asset_json = app.assetsCollection.models[0].attributes.GetDataResult;
											asset_json = asset_json.replace(/\'/g, '"');
											app.assetsCollection.models[0] = JSON.parse(asset_json);
											app.thumbnailsCollection.fetch({
												success:function () {
													app.imagesCollection.fetch({
														success:function () {
															app.interiorsCatCollection.fetch({
																success:function () {
																	app.interiorsSubCatCollection.fetch({
																		success:function () {
																			app.interiorsImagesCollection.fetch({
																				success:function () {
																					app.interiorsNavCollection.fetch({
																						success:function () {
																							// write to local store
																							app.ioModel = new IOModel();
																							app.ioModel.createLocalStore();
																						}, error:function(e) {
																							console.log("interiors nav error: " + e);
																						}
																					});
																				}, error:function(e) {
																					console.log("interiors images error: " + e);
																				}
																			});
																		}, error:function(e) {
																			console.log("interiors subcat error: " + e);
																		}
																	});
																}, error:function(e) {
																	console.log("interiors cat error: " + e);
																}
															});
														}, error:function(e) {
															console.log("images error: " + e);
														}
													});
												}, error:function(e) {
													console.log("assets error: " + e);
												}
											});

										}, error:function(e) {
											console.log("thumbnails error: " + e);
										}
									});
								}, error:function(e) {
									console.log("menu error: " + e);
								}
							});
						}, error:function(e) {
							console.log("users error: " + e);
						}
					});
				}, error:function(e) {
					console.log("strings error: " + e);
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
		/* Future functionality to load interface elements dynamically from the assets server
		var imgArr = [];
		$.each(this.imagesCollection.models, function(index, model) {
		var iObj = {"id":model.get("id"),"src":model.get("src")}
		imgArr.push(iObj);
		});
		this.cjsLoad(imgArr);
		*/
		app.mainView = new MainView({model:app.stringsCollection});
		app.mainView.render();
	}
});

$(window).resize(function() {
});