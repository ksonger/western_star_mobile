window.ImageView = Backbone.View.extend({
	lang_list:null,
	selectedImage:null,
	appended:false,
	initialize:function () {
		this.render();
	},
	respond:function() {
        $("#images, #shadowbox_image").css({
			"height":app.windowHeight + "px", "width":app.windowWidth + "px"
		});
        this.$el.find("#image_div").css({
			"top":((app.windowHeight - this.$el.find("#image_div").height())/2) + "px", "left":((app.windowWidth - this.$el.find("#image_div").width())/2) + "px"
		});
	},
	showImage:function(obj) {
        this.template = _.template(tpl.get("image"));
		this.$el.html(this.template({image:obj, server:app.assets_server}));
        this.respond();
        this.$el.find("#shadowbox_image").click(function()    {
            app.mainView.imageView.hideImage();
        });
        TweenLite.to(app.mainView.imageView.$el, .3, {css:{autoAlpha:1}});
	},
    hideImage:function(){ 
        TweenLite.to(app.mainView.imageView.$el, .01, {css:{autoAlpha:0}});
    },
	render:function() {
		jQuery('<div/>', {
			id:"images"
		}).appendTo("#main");
        this.$el = $("#images");
        TweenLite.to(this.$el, .01, {css:{autoAlpha:0}});
	}
});


