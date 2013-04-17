window.MainView = Backbone.View.extend({

	initialize:function () {
	},
	initialized:false,
	loginView:null,
	homeView:null,
	interiorsView:null,
	libraryView:null,
	calculatorsView:null,
	tabstripView:null,
	headerView:null,
	videoView:null,
    imageView:null,
	wsView:null,
	states:[],
	k_app:null,
	lang_list:null,
	render:function () {
		this.$el = $("#main");	
		// if this is a touch-enabled device, set zoom levels
		if (app.isTouchDevice) {
			var viewportmeta = document.querySelector('meta[name="viewport"]');
			if (viewportmeta) {
				viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
				document.body.addEventListener('gesturestart', function () {
					viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
				}, false);
			}
		}
		var mainView = this;
		$(window).resize(function () {
			mainView.onWindowResize();
		});
        
		TweenLite.to(this.$el, .01, {css:{autoAlpha:0}});
		self.setTimeout("app.mainView.showMain()", 500);
		self.setInterval("app.mainView.onWindowResize()", 200);
		return this;
	},

	showMain:function () {
		if (!this.initialized) {
			app.mainView = this;
			this.initLogin();
			this.initHome(); 
			this.initLibrary();
			this.initWS();
			this.initInteriors();
			this.initCalculators();
			this.initTabstrip();
			this.initHeader();
			this.initVideo();
            this.initImage();
			this.initialized = true;
		}
	},

	initLogin:function () {
		this.loginView = new LoginView();
		this.states.push(this.loginView);
		TweenMax.to(this.$el, .7, {css:{autoAlpha:1}, delay:.4});
		app.setState(this.loginView);
	},

	initHome:function () {
		this.homeView = new HomeView();
		this.states.push(this.homeView);
	},
	initWS:function () {
		this.wsView = new WSView();
		this.states.push(this.wsView);
	},
	initInteriors:function () {
		this.interiorsView = new InteriorsView();
		this.states.push(this.interiorsView);
	},

	initLibrary:function () {
		this.libraryView = new LibraryView();
		this.states.push(this.libraryView);
	},
    
	initCalculators:function () {
		this.calculatorsView = new CalculatorsView();
		this.states.push(this.calculatorsView);
	}, 
	initTabstrip:function() {
		this.tabstripView = new TabstripView();
	},
	initHeader:function() {
		this.headerView = new HeaderView();
	},
	initVideo:function() {
		this.videoView = new VideoView();
	},
    initImage:function() {
		this.imageView = new ImageView();
	},
	onLanguageSelect:function(lang) {
		app.lang = lang;
		this.setStrings();
	},
	setStrings:function() {
		var page = this;
		$.each(app.stringsCollection.models, function(index, model) {
			if (model.get("name")) {
				if (page.$el.find("#" + model.get("name")).is("div") || page.$el.find("#" + model.get("name")).is("span")) {
					page.$el.find("#" + model.get("name")).html(model.get(app.lang))
				}
				if (page.$el.find("#" + model.get("name")).is("input")) {
					page.$el.find("#" + model.get("name")).val(model.get(app.lang))
				}
			}
		});
	},
	onWindowResize:function () {
		if (app.windowWidth < 1024) {
			app.currentLayout = "portrait";
		}
		else {
			app.currentLayout = "landscape";
		}
		try {
			$("#main").width(app.windowWidth);
			$("#main").height(app.windowHeight);
			if ($("#tabstrip").css("opacity") != "0") {
				$("#tabstrip").css({"top":app.windowHeight - $("#tabstrip").height() - $("#home_header").height() + "px"});
			}
			if ($("#header_bar").css("opacity") != "0") {
				$("#lang_button").css({"left":app.windowWidth - $("#lang_button").width() - 15 + "px", "top":(($("#header_bar").height() - $("#lang_button").height()) / 2) + "px"});
				$("#header_title").css({"width":app.windowWidth + "px"});
			}
			if ($("#videos").css("opacity") != "0") {
                app.mainView.videoView.respond();
			}
			app.currentState.respond();
			app.mainView.headerView.respond();
		}
		catch (e) {
		}
	}
});