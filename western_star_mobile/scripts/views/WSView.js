window.WSView = StateView.extend({

    swiping:false,
	currentPage:null,
    numPages:null,
    
	initialize:function () {
		if (this.firstLoad) {
			this.onFirstLoad();
		}
	},

    onEnter:function() {
        
		TweenLite.to(this.$el, .7, {css:{autoAlpha:1}, delay:.4});  
        this.render();
        app.mainView.setStrings();
	},

	respond:function() {

        var tabstrip = $("#tabstrip");

		this.$el.find("#ws, #background_image").height(app.windowHeight);
		this.$el.find("#ws, #background_image").width(app.windowWidth);
        this.$el.find("#ws_logo").css({"left":((this.$el.find("#logo_div").width() - this.$el.find("#ws_logo").width()) / 2) + 20 + "px", "top":((this.$el.find("#top_div").height() - this.$el.find("#logo_div").height()) / 2) + "px"});
		this.$el.find("#ws_title").css({"top":((this.$el.find("#top_div").height() - this.$el.find("#ws_title").height()) / 2) + "px"});
		this.$el.find("#torn_edge").css({"top":(this.$el.find("#top_div").height() + $("#header_bar").height()) - 6 + "px", "width":app.windowWidth + "px"});
        this.$el.find("#main").css({"top":app.windowHeight - this.$el.find("#main").height() - tabstrip.height() + 20 + "px"});
        this.$el.find("#pages_index_list").css({"left":((app.windowWidth - this.$el.find("#pages_index_list").width()) / 2) + "px", "margin-left":"-40px"});
        this.$el.find("#lower_gradient").css({"top":app.windowHeight - tabstrip.height() - this.$el.find("#lower_gradient").height() + "px"});
	},

	render:function() {
        this.$el.html("");
        this.currentPage = 1;
        this.numPages = 11;
		this.template = _.template(tpl.get("ws"));
		this.$el.html(this.template());
		this.$el.addClass("state"); 
        var pg = this;
        var indices = jQuery('<div/>', {
			id:"pages_index"
		}).appendTo(pg.$el.find("#ws"));
		indices.css({"top": app.windowHeight - 145 + "px"});
		var indices_list = jQuery('<ol/>', {
			id:"pages_index_list"
		}).appendTo(pg.$el.find("#pages_index"));
		for (var i = 0;i < 11;i++) {
			var el = jQuery('<li/>', {
			}).appendTo(pg.$el.find("#pages_index_list"));
			if (i == 0) {
				el.addClass("current");
			}
		}
		indices_list.css({"left":((app.windowWidth - indices_list.width()) / 2) + "px", "margin-left":"-40px"});
        
        try {
			pg.$el.find("#main, #lower_gradient").on("swipe", function(e) {
				pg.onSwipe(e);
			});
		}
		catch (e) {
		}
	},

    onSwipe:function (e) {
		if (!this.swiping) {
			this.swiping = true;

			self.setTimeout("app.mainView.wsView.resetSwiping()", 500);
			if (e.direction == "left") {
				this.next();
			}
			if (e.direction == "right") {
				this.prev();
			}
		}
	},

	resetSwiping:function() {
		app.mainView.wsView.swiping = false;
	},
    
	next:function () {
		if (this.currentPage < this.numPages) {
			this.gotoPage(this.currentPage + 1);
		}
	},

	prev:function () {
		if (this.currentPage > 1) {
			this.gotoPage(this.currentPage - 1);
		}
	},
    
	gotoPage: function(n) {
		var num = n;
		TweenMax.to(this.$el.find("#main"), .5, { css:{left: (-(app.windowWidth * (n - 1))) + "px" }, ease:Back.easeOut});
		$.each(this.$el.find("#pages_index_list").find("li"), function(ind, el) {
			if (ind == num - 1) {
				$(el).addClass("current");
			}
			else {
				$(el).removeClass("current");
			}
		});
		this.currentPage = parseInt(n);
	}
});