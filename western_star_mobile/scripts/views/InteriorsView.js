window.InteriorsView = StateView.extend({
    lang_list:null,
	initialize:function (options) {
        if (this.firstLoad) {
			this.onFirstLoad();
		}
	},
	respond:function() {
        this.$el.find("#interiors").css({"height":$(window).height() + "px", "width":$(window).width() + "px"});
        this.$el.find("#background_image").css({"width":$(window).width()+"px", "height":$(window).height()+"px"});
	},
	render:function() {
		this.template = _.template(tpl.get("interiors"));
		this.$el.html(this.template());
		this.$el.addClass("state"); 
	}
});
