window.WSView = StateView.extend({
	lang_list:null,
	initialize:function (options) {
		if (this.firstLoad) {
			this.onFirstLoad();
		}
	},
    onEnter:function() {
        app.mainView.setStrings();
		TweenLite.to(this.$el, .7, {css:{autoAlpha:1}, delay:.4});   
	},
	respond:function() {
		this.$el.find("#ws, #background_image").height(app.windowHeight);
		this.$el.find("#ws, #background_image").width(app.windowWidth);
	},
	render:function() {
		this.template = _.template(tpl.get("ws"));
		this.$el.html(this.template());
		this.$el.addClass("state"); 
	}
});