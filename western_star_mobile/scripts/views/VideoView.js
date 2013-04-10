window.VideoView = Backbone.View.extend({
    lang_list:null,
    selectedVideo:null,
	initialize:function (options) {
        this.render();
	},
	respond:function() {
        
	},
    showVideo:function(obj)    {
        
    },
	render:function() {
		this.template = _.template(tpl.get("video"));
	}
});
