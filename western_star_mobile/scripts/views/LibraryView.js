window.LibraryView = StateView.extend({
	lang_list:null,
	initialize:function (options) {
		if (this.firstLoad) {
			this.onFirstLoad();
		}
	},
	respond:function() {
        this.$el.find("#library").width(app.windowWidth);
        this.$el.find("#library").height(app.windowHeight);
		this.$el.find("#library_logo").css({"left":((this.$el.find("#logo_div").width() - this.$el.find("#library_logo").width()) / 2) + "px", "top":((this.$el.find("#top_div").height() - this.$el.find("#logo_div").height()) / 2) + "px"});
		this.$el.find("#library_title").css({"top":((this.$el.find("#top_div").height() - this.$el.find("#library_title").height()) / 2) + "px"});
		this.$el.find("#search_div").css({"margin-top":((this.$el.find("#top_div").height() - this.$el.find("#search_div").height()) / 2) + "px"});
		this.$el.find("#main_div").css({"top":(this.$el.find("#top_div").height()) + $("#header_bar").height() + "px"});
	},
	selectAsset:function(type, id) {
        if(type == "video")    {
            $.each(app.assetsCollection.models, function(index, model)    {
                if(model.get("id") == id)    {
                    app.mainView.videoView.showVideo(model);
                }
            });
        }
	},
	render:function() {
		this.template = _.template(tpl.get("library"));
		this.$el.html(this.template());
		this.$el.addClass("state");
        var lib = this;
		$.each(this.$el.find(".library_asset"), function(index, asset) {
			$(asset).click(function(evt) {
                lib.selectAsset($(asset).find("#asset_type").val(), $(asset).find("#asset_id").val());
			});
		});
        
	}
});