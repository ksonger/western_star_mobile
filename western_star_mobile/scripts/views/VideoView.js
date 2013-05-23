window.VideoView = Backbone.View.extend({
	lang_list:null,
	selectedVideo:null,
	appended:false,
	initialize:function (options) {
		this.render();
	},
	respond:function() {
        $("#videos, #shadowbox_video").css({
			"height":app.windowHeight + "px", "width":app.windowWidth + "px"
		});
        this.$el.find("#video_div").css({
			"top":((app.windowHeight - this.$el.find("#video_div").height())/2) + "px", 
            "left":((app.windowWidth - this.$el.find("#video_div").width())/2) + "px"
		});
	},
	showVideo:function(obj) {
        this.template = _.template(tpl.get("video"));
		this.$el.html(this.template({video:obj, server:app.assets_server}));
        this.respond();
        this.$el.find("#shadowbox_video").click(function()    {
            app.mainView.videoView.hideVideo();
        });
        TweenLite.to(app.mainView.videoView.$el, .3, {css:{autoAlpha:1}});
	},
    hideVideo:function(){
        try{
            app.mainView.videoView.$el.find("video").get(0).pause();
        }    catch(err)    {
            
        }  
        TweenLite.to(app.mainView.videoView.$el, .01, {css:{autoAlpha:0}});
    },
	render:function() {
		jQuery('<div/>', {
			id:"videos"
		}).appendTo("#main");
        this.$el = $("#videos");
        TweenLite.to(this.$el, .01, {css:{autoAlpha:0}});
	}
});

