window.LibraryItemView = Backbone.View.extend({

	initialize:function (options) {
		this.render();
	},
	respond:function() {
	},

	render:function() {
		this.template = _.template(tpl.get("library_item"));
		this.$el.addClass("library_item");
		var thumb;
		var item = this;
                /*
		$.each(app.localThumbnailsCollection.models, function(index, model) {
			if (model.get("id") == item.model.get("id")) {
				thumb = model;
			}
		});
        */
        $.each(app.thumbnailsCollection.models, function(index, model) {
			if (model.get("id") == item.model.get("id")) {
				thumb = model;
			}
		});

		this.$el.html(this.template({"model":this.model, "thumbnail":thumb.attributes}));
	}
});