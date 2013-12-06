window.LibraryItemView = Backbone.View.extend({

	initialize:function () {
		this.render();
	},
	respond:function() {
	},

	render:function() {
		this.template = _.template(tpl.get("library_item"));
		this.$el.addClass("library_item");
		var thumb = '';
		var item = this;
		
		$.each(app.localAssetsCollection.models, function(index, model) {
			if (model.attributes.id == item.model.attributes.thumbnailID) {
				thumb = model;
			}
		});
		/*  
		$.each(app.assetsCollection.models[0].assetManifest[0].assets, function(index, model) {
		if (model.id == item.model.thumbnailID) {
		thumb = model;
		console.log(thumb);
		}
		});
		*/
		this.$el.html(this.template({"model":this.model, "thumbnail":thumb}));
	}
});