window.HeaderView = Backbone.View.extend({
    lang_open:false,
	initialize:function (options) {
        this.render();
	},
	respond:function() {
        this.$el.find("#lang_menu_table").css({"left":app.windowWidth - $("#lang_menu_table").width() - 15 + "px"});
	},
	render:function() {
		this.template = _.template(tpl.get("header"));
		this.$el = $("#header_bar");
		this.$el.html(this.template());
        this.$el.find("#lang_menu_topmiddle").css({"width":$("#lang_menu_table").width() - 116 + "px"});
        this.$el.find("#lang_menu_bottommiddle").css({"width":$("#lang_menu_table").width() - 30 + "px"});
        TweenLite.to(this.$el.find("#lang_menu_table"), .01, {css:{autoAlpha:0}});
		TweenLite.to(this.$el, .01, {css:{autoAlpha:0}});
		var hdr = this;
        this.$el.find("#lang_button").click(function(evt)    {
            if(!hdr.lang_open)    {
                TweenLite.to(hdr.$el.find("#lang_menu_table"), .3, {css:{autoAlpha:1}});
            }    else    {
                TweenLite.to(hdr.$el.find("#lang_menu_table"), .01, {css:{autoAlpha:0}});
            }
            hdr.lang_open = !hdr.lang_open;
        });
        $.each(this.$el.find(".lang_item"), function(index, item)    {
            $(item).click(function(evt)    {
                hdr.$el.find(".lang_check").removeClass("active");
                $(item).closest("td").next().addClass("active");
                app.mainView.onLanguageSelect($(item).attr("id"));
                hdr.$el.find("#lang_button").click();
            });     
        });
	}
});
