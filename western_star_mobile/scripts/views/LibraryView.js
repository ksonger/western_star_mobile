window.LibraryView = StateView.extend({
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
		this.$el.find("#library").width(app.windowWidth);
		this.$el.find("#library").height(app.windowHeight);
		this.$el.find("#library_logo").css({"top":((this.$el.find("#top_div").height() - this.$el.find("#logo_div").height()) / 2) + "px"});
		this.$el.find("#library_title").css({"top":((this.$el.find("#top_div").height() - this.$el.find("#library_title").height()) / 2) + "px"});
		this.$el.find("#search_div").css({"margin-top":((this.$el.find("#top_div").height() - this.$el.find("#search_div").height()) / 2) + "px", "opacity":"0"});
		this.$el.find("#main_div").css({"top":(this.$el.find("#top_div").height()) + $("#header_bar").height() + "px"});
        this.$el.find("#comp").css({"top":"0px"});
	},
	selectAsset:function(type, id) {
		if (type == "video") {
			$.each(app.assetsCollection.models, function(index, model) {
				if (model.get("id") == id) {
					app.mainView.videoView.showVideo(model);
				}
			});
		}
		if (type == "image") {
			$.each(app.assetsCollection.models, function(index, model) {
				if (model.get("id") == id) {
					app.mainView.imageView.showImage(model);
				}
			});
		}
	},
	render:function() {
		
		this.template = _.template(tpl.get("library"));
		this.$el.html(this.template());
		var lib = this;
		$.each(this.$el.find(".library_asset"), function(index, asset) {
			$(asset).click(function(evt) {
				lib.selectAsset($(asset).find("#asset_type").val(), $(asset).find("#asset_id").val());
			});
		});    
	}
});