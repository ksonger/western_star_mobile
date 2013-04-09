window.MainView = Backbone.View.extend({

	initialize:function () {
		this.render();
	},
	initialized:false,
	loginView:null,
	homeView:null,
	interiorsView:null,
	libraryView:null,
	calculatorsView:null,
    tabstripView:null,
    headerView:null,
	wsView:null,
	isTouchDevice: 0,
	isIE10Touch: 0,
	states:[],
    k_app:null,
    lang_list:null,
	render:function () {
		this.$el = $("#main");
        TweenLite.to(this.$el, .01, {css:{autoAlpha:0}});
        var mv = this;
        var tabs = ["#home","#ws","#library","#interiors","#calculators"];
        $.each($(".km-tabstrip").find("a"), function(index, tab)    {
            $(tab).click(function()    {
               app.setState(mv.states[index+1]); 
            });
        });
        

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			this.isTouchDevice = 1;
		}
		if (navigator.platform.toLowerCase().indexOf("win") !== -1 && navigator.userAgent.toLowerCase().indexOf("touch") !== -1) {
			this.isIE10Touch = 1;
		}
		// if this is a touch-enabled device, set zoom levels
		if (this.isTouchDevice) {
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
		this.showMain();
		return this;
	},

	showMain:function () {
		if (!this.initialized) {
			app.mainView = this;
			this.initLogin();
			this.initHome();
            this.initWS();
            this.initDocLibrary();
			this.initInteriors();
			this.initCalculators();
            this.initTabstrip();
            this.initHeader();
			this.initialized = true;
            self.setInterval("app.mainView.onWindowResize()", 100);
		}
	},

	initLogin:function () {
		this.loginView = new LoginView();
		this.states.push(this.loginView);
		app.setState(this.loginView);
        TweenLite.to(this.$el, .7, {css:{autoAlpha:1}, delay:.4});
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

	initDocLibrary:function () {
		this.libraryView = new LibraryView();
		this.states.push(this.libraryView);
	},
    
	initCalculators:function () {
		this.calculatorsView = new CalculatorsView();
		this.states.push(this.calculatorsView);
	}, 
    initTabstrip:function()    {
        this.tabstripView = new TabstripView();
    },
    initHeader:function()    {
        this.headerView = new HeaderView();
    },
    
    onLanguageSelect:function(lang)    {
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
        var windowWidth = $(window).width();
        if (windowWidth < 1024) {
            app.currentLayout = "portrait";
        } else {
            app.currentLayout = "landscape";
        }
		try {
            $("#main").width($(window).width());
            $("#main").css({"height":$(window).height() + "px"})
            if($("#tabstrip").css("opacity") != "0")    {
                $("#tabstrip").css({"top":$(window).height() - $("#tabstrip").height()-$("#home_header").height()+"px"});
            }
            if($("#header_bar").css("opacity") != "0")    {
                $("#lang_button").css({"left":$(window).width() - $("#lang_button").width()-15+"px", "top":(($("#header_bar").height() - $("#lang_button").height())/2)+"px"});
                $("#header_title").css({"width":$(window).width()+"px"});
            }
			app.currentState.respond();
            app.mainView.headerView.respond();
		}
		catch (e) {
		}
	}
});