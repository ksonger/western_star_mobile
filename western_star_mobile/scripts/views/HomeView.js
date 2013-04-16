window.HomeView = StateView.extend({
	initialize:function (options) {
        if (this.firstLoad) {
			this.onFirstLoad();
		}
	},
	respond:function() {
        
        this.$el.find("#home, #background_image, collage").height(app.windowHeight);
        this.$el.find("#home, #background_image").width(app.windowWidth);
        
        if(this.$el.find("#collage_image").width() > app.windowWidth*.49)    {
            this.$el.find("#collage_image").width(app.windowWidth*.49);
            this.$el.find("#collage_image").height(app.windowHeight);
        }
        this.$el.find("#home_nav").offset({"top":app.windowHeight - this.$el.find("#home_nav").height(), "left":this.$el.find("#collage_image").width()});
        this.$el.find("#home_nav").width(app.windowWidth - this.$el.find("#collage_image").width());

        var ypos = ((app.windowHeight - this.$el.find("#home_nav").height()) - this.$el.find("#home_copy").height() - 30)/1.8;
        this.$el.find("#home_copy").offset({"top":ypos, "left":this.$el.find("#collage_image").width() + 30});
        this.$el.find("#home_logo").offset({"top":30, "left":app.windowWidth - this.$el.find("#home_logo").width() - 30});   
	},
	render:function() {
		this.template = _.template(tpl.get("home"));
		this.$el.html(this.template());
		this.$el.addClass("state");
		app.mainView.setStrings();
        $.each(this.$el.find(".home_button"), function(index, btn)    {
            $(btn).click(function(evt)    {
                if($(this).find("div").attr("id") == "home_btn1")    {
                    app.setState(app.mainView.wsView);
                    app.mainView.tabstripView.selectTab(1);
                }
                if($(this).find("div").attr("id") == "home_btn2")    {
                    app.setState(app.mainView.libraryView);
                    app.mainView.tabstripView.selectTab(2);
                }
                if($(this).find("div").attr("id") == "home_btn3")    {
                    app.setState(app.mainView.interiorsView);
                    app.mainView.tabstripView.selectTab(3);
                }
                if($(this).find("div").attr("id") == "home_btn4")    {
                    app.setState(app.mainView.calculatorsView);
                    app.mainView.tabstripView.selectTab(4);
                }
            });
        });
        this.respond();
	}
});

