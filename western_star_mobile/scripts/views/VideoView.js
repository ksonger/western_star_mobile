window.VideoView = Backbone.View.extend({
	lang_list:null,
	selectedVideo:null,
	appended:false,
	initialize:function (options) {
		this.render();
	},
	respond:function() {
        this.$el.css({
			"height":$(window).height() + "px", "width":$(window).width() + "px"
		});
	},
	showVideo:function(obj) {
		console.log(obj);
        this.respond();
        this.template = _.template(tpl.get("video"));
		this.$el.html(this.template({video:obj}));
	},
	render:function() {
		jQuery('<div/>', {
			id:"videos"
		}).appendTo("#main");
        this.$el = $("#videos");	
	}
});
