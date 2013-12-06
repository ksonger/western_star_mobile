window.LoginView = StateView.extend({
	checkingLogin: false,

	initialize:function () {
		if (this.firstLoad) {
			this.onFirstLoad();
		}
	},

    onEnter:function() {
        app.mainView.setStrings();
		TweenLite.to(this.$el, .7, {css:{autoAlpha:1}, delay:.4});   
	},

	respond:function() {
        
		this.$el.find("#login_legal").css({
			"top":app.windowHeight - this.$el.find("#login_legal").height() - 30 + "px",
			"left":app.windowWidth - this.$el.find("#login_legal").width() - (app.windowWidth * .05) + "px"
		});
        this.$el.find("#login_logo").css({
			"top":app.windowHeight - this.$el.find("#login_logo").height() - 30 + "px", 
			"left":"30px"
		});
        
		this.$el.find("#login").css({
			"height":this.windowHeight + "px", "width":this.windowWidth + "px"
		});
		this.$el.find("#background_image").css({
			"width":$(window).width() + "px", "height":$(window).height() + "px"
		});
		this.$el.find("#login_table").css({
			"height":$(window).height() + "px", "margin-left":"5%"
		});
        this.$el.find("#serious").css({"top":"50px", "left":app.windowWidth - this.$el.find("#serious").width() - 50 + "px"});
	},

	render:function() {
		this.template = _.template(tpl.get("login"));
		this.$el.html(this.template());
		var page = this;
		this.$el.find("#login_username").focus(function() {
			var txt = this;
			$.each(app.stringsCollection.models, function(index, model) {
				if (model.get("name") == "login_username") {
					if (txt.value == model.get(app.lang)) {
						$(txt).val("");
					} 
				}
			});
		});
		this.$el.find("#login_username").blur(function() {
			var txt = this;
			$.each(app.stringsCollection.models, function(index, model) {
				if (model.get("name") == "login_username") {
					if (txt.value == "") {
						$(txt).val(model.get(app.lang));
					} 
				}
			});
		});   
		this.$el.find("#login_password").focus(function() {
			var txt = this;
			$.each(app.stringsCollection.models, function(index, model) {
				if (model.get("name") == "login_password") {
					if (txt.value == model.get(app.lang)) {
						$(txt).val("");
					} 
				}
			});
		});
		this.$el.find("#login_password").blur(function() {
			var txt = this;
			$.each(app.stringsCollection.models, function(index, model) {
				if (model.get("name") == "login_password") {
					if (txt.value == "") {
						$(txt).val(model.get(app.lang));
					} 
				}
			});
		});
		this.$el.find("#login_button").click(function() {
			page.checkingLogin = true;
			page.checkLogin();
		});
        
		this.$el.find("#login_english, #login_french, #login_german, #login_spanish, #login_korean").click(function() {
			app.lang = $(this).attr("class");
			app.mainView.setStrings();
		});
        
		this.$el.keypress(function(e) {
			if (e.which == 13 && !page.checkingLogin) {
				page.checkingLogin = true;
				page.checkLogin();
			}
		});
		this.$el.children().on("swipe", function(e) {
			page.onSwipe(e);
		});
		$.each(this.$el.find("img"), function() {
			$(this).mousedown(function() {
				return false;
			});
			try {
				$(this).on("swipe", function(e) {
					pv.onSwipe(e);
				});
			}
			catch (e) {
			}
		});
		this.respond();
		app.mainView.onWindowResize(); 
	},
	onSwipe:function() {
		//console.log("swipe");
	},
	checkLogin:function() {
		var usr = this.$el.find("#login_username");
		var pwd = this.$el.find("#login_password");
		var validated = false;
		$.each(app.usersCollection.models, function(index, model) {
			if (model.get("username") == usr.val()) {
				if (model.get("password") == CryptoJS.SHA1(pwd.val()).toString(CryptoJS.enc.Base64)) {
					validated = true;
				} 
			}
		});
		if (!validated) {
			$.each(app.stringsCollection.models, function(index, model) {
				if (model.get("name") == "login_error") {
					//alert(model.get(app.lang));
					app.setState(app.mainView.homeView);
				}
			});
		}
		else {
			app.setState(app.mainView.homeView);
		}
		self.setTimeout("app.mainView.loginView.resetCheck()", 600);
	},
	resetCheck:function() {
		app.mainView.loginView.checkingLogin = false;
	}
});