window.CalculatorsView = StateView.extend({
	lang_list:null,
	initialize:function (options) {
		if (this.firstLoad) {   
			this.onFirstLoad();
		}
	},
	respond:function() {
		this.$el.find("#calculators").width(app.windowWidth);
		this.$el.find("#calculators").height(app.windowHeight);
		this.$el.find("#calculators_logo").css({"left":((this.$el.find("#logo_div").width() - this.$el.find("#calculators_logo").width()) / 2) + "px", "top":((this.$el.find("#top_div").height() - this.$el.find("#logo_div").height()) / 2) + "px"});
		this.$el.find("#calculators_title").css({"top":((this.$el.find("#top_div").height() - this.$el.find("#calculators_title").height()) / 2) + "px"});
		this.$el.find("#main_div").css({
            "top":(this.$el.find("#top_div").height()) + $("#header_bar").height() + "px",
            "height":app.windowHeight - this.$el.find("#top_div").height() - $(".footer").height() + "px"
        });
        this.$el.find("#bottom_image").css({"top":app.windowHeight - this.$el.find("#bottom_image").height() - $(".footer").height() - this.$el.find("#main_div").offset().top + "px"});
	},
	render:function() {
		this.template = _.template(tpl.get("calculators"));
		this.$el.html(this.template());
        var page = this;
        $.each(page.$el.find("#nav_item"), function(index, item)    {
             $(item).click(function(evt)    {
                    if(!$(this).hasClass("active"))    {
                        page.$el.find("#nav_item").removeClass("active");
                        page.$el.find("span").removeClass("active");
                        page.$el.find("#icon").removeClass("active");
                        $(this).addClass("active");
                        $(this).find("span").addClass("active");
                        $(this).find("#icon").addClass("active");
                    } 
             });
        });
	},
    navSelect:function()    {
        
    }
});