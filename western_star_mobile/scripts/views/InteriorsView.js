window.InteriorsView = StateView.extend({
    lang_list:null,
	initialize:function (options) {
        if (this.firstLoad) {
			this.onFirstLoad();
		}
	},
	respond:function() {
        this.$el.find("#interiors").css({"height":app.windowHeight + "px", "width":app.windowWidth + "px"});
        this.$el.find("#background_image").css({"width":app.windowWidth+"px", "height":app.windowHeight+"px"});
	},
	render:function() {
		this.template = _.template(tpl.get("interiors"));
		this.$el.html(this.template());
		this.$el.addClass("state"); 
	}
});
