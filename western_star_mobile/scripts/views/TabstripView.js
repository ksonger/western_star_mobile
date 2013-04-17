window.TabstripView = Backbone.View.extend({
	initialize:function (options) {
		this.render()
	},
	respond:function() {
	},
	render:function() {
		this.template = _.template(tpl.get("tabstrip"));
		this.$el = $("#tabstrip");
		this.$el.html(this.template());
		TweenLite.to(this.$el, .01, {css:{autoAlpha:0}});
		var strip = this;
		$.each(this.$el.find(".tab"), function(index, tab) {
			$(tab).click(function(evt) {
                if($("#videos").css("opacity") != 0)    {
                    app.mainView.videoView.hideVideo();
                }
				if (index == 0) {
					app.setState(app.mainView.homeView);
				}
				if (index == 1) {
					app.setState(app.mainView.wsView);
				}
				if (index == 2) {
					app.setState(app.mainView.libraryView);
				}
				if (index == 3) {
					app.setState(app.mainView.interiorsView);
				}
				if (index == 4) {
					app.setState(app.mainView.calculatorsView);
				}
				$.each(strip.$el.find(".tab"), function(index, t) {
					$(t).removeClass("active");
					var str = $(t).find("img").attr("src");
					str = str.replace("_on", "_off");
					$(t).find("img").attr({"src":str});
				});
				$(tab).addClass("active");
				var str_active = $(tab).find("img").attr("src");
				str_active = str_active.replace("_off", "_on");
				$(tab).find("img").attr({"src":str_active});
			});
		});
	},
	selectTab:function(num) {
		$.each(this.$el.find(".tab"), function(index, tab) {
            if(index == num)    {
                $(tab).click();
            }
		});
	}
});