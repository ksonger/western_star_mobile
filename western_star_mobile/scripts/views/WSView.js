window.WSView = StateView.extend({
    lang_list:null,
	initialize:function (options) {
        if (this.firstLoad) {
			this.onFirstLoad();
		}
	},
	respond:function() {
        this.$el.find("#ws, #background_image").height(app.windowHeight);
        this.$el.find("#ws, #background_image").width(app.windowWidth);
	},
	render:function() {
		try{
            this.template = _.template(tpl.get("ws"));
        }    catch(err)    {
            alert(err);
        }
		this.$el.html(this.template());
		this.$el.addClass("state"); 
        
	}
});
