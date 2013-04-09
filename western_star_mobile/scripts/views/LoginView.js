window.LoginView = StateView.extend({
	checkingLogin: false,
	initialize:function (options) {
		if (this.firstLoad) {
			this.onFirstLoad();
		}
	},
	respond:function() {
        
		this.$el.find("#login_legal").css({
			"top":$(window).height() - this.$el.find("#login_legal").height() - 30 + "px",
			"left":$(window).width() - this.$el.find("#login_legal").width() - ($(window).width() * .05) + "px"
		});
        
		this.$el.find("#login_logo").css({
			"top":$(window).height() - this.$el.find("#login_logo").height() - 30 + "px", 
			"left":"30px"
		});
        
		this.$el.find("#login").css({
			"height":$(window).height() + "px", "width":$(window).width() + "px"
		});
		this.$el.find("#background_image").css({
			"width":$(window).width() + "px", "height":$(window).height() + "px"
		});
		this.$el.find("#login_table").css({
			"height":$(window).height() + "px", "margin-left":"5%"
		});
	},
	render:function() {
		this.template = _.template(tpl.get("login"));
		this.$el.html(this.template());
		this.setStrings();
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
		this.$el.find("#login_button").click(function(e) {
			page.checkingLogin = true;
			page.checkLogin();
		});
        
		this.$el.find("#login_english, #login_french, #login_german, #login_spanish, #login_korean").click(function(e) {
			app.lang = $(this).attr("class");
			page.setStrings();
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
		$.each(this.$el.find("img"), function(index) {
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
		this.respond(this.currentLayout);
		app.mainView.onWindowResize();   
	},
	onSwipe:function(evt) {
		console.log("swipe");
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
		page.$el.find(".active").removeClass("active");
		if (app.lang == "en") {
			page.$el.find("#login_english").addClass("active");
		}
		if (app.lang == "fr") {
			page.$el.find("#login_french").addClass("active");
		}
		if (app.lang == "dt") {
			page.$el.find("#login_german").addClass("active");
		}
		if (app.lang == "es") {
			page.$el.find("#login_spanish").addClass("active");
		}
		if (app.lang == "ko") {
			page.$el.find("#login_korean").addClass("active");
		}
		page.respond(this.currentLayout);
	}
});