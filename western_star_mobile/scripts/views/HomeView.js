window.HomeView = StateView.extend({
	initialize:function (options) {
        if (this.firstLoad) {
			this.onFirstLoad();
		}
	},
	respond:function() {
		this.$el.find("#home").css({"height":$(window).height() + "px", "width":$(window).width() + "px"});
        this.$el.find("#background_image").css({"width":$(window).width()+"px", "height":$(window).height()+"px"});
        this.$el.find("#collage").css({"height":$(window).height()+"px"});
        if(this.$el.find("#collage_image").width() > $(window).width()*.49)    {
            console.log("true");
            this.$el.find("#collage_image").css({"width":$(window).width()*.49+"px", "height":$(window).height()+"px"});
        }

        this.$el.find("#home_nav").css({
            "top":$(window).height() - this.$el.find("#home_nav").height()+"px", 
            "left":this.$el.find("#collage_image").width()+"px",
            "width":$(window).width() - this.$el.find("#collage_image").width()+"px"
        });
        var ypos = (($(window).height() - this.$el.find("#home_nav").height()) - this.$el.find("#home_copy").height() - 30)/1.8;
        this.$el.find("#home_copy").css({
            "top":ypos + "px", 
            "left":this.$el.find("#collage_image").width() + 30 + "px"
        });
        this.$el.find("#home_logo").css({"top":"30px", "left":$(window).width() - this.$el.find("#home_logo").width() - 30 +"px"});   
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
        
	}
});
