window.LibraryView = StateView.extend({
    lang_list:null,
	initialize:function (options) {
        if (this.firstLoad) {
			this.onFirstLoad();
		}
	},
	respond:function() {
        this.$el.find("#library").css({"height":$(window).height() + "px", "width":$(window).width() + "px"});
        this.$el.find("#library_logo").css({"left":((this.$el.find("#logo_div").width() - this.$el.find("#library_logo").width())/2) + "px", "top":((this.$el.find("#top_div").height() - this.$el.find("#logo_div").height())/2) + "px"});
        this.$el.find("#library_title").css({"top":((this.$el.find("#top_div").height() - this.$el.find("#library_title").height())/2) + "px"});
        this.$el.find("#search_div").css({"margin-top":((this.$el.find("#top_div").height() - this.$el.find("#search_div").height())/2) + "px"});
	},
    selectAsset:function(id)    {
        
    },
	render:function() {
		this.template = _.template(tpl.get("library"));
		this.$el.html(this.template());
		this.$el.addClass("state"); 
	}
});
