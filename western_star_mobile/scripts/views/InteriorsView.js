window.InteriorsView = StateView.extend({
	lang_list:null,
	initialize:function (options) {
		if (this.firstLoad) {
			this.onFirstLoad();
		}
	},
	onEnter:function() {
		app.mainView.setStrings();
		TweenLite.to(this.$el, .7, {css:{autoAlpha:1}, delay:.4}); 
		this.$el.find("#int_categories").getNiceScroll().show();
	},
	respond:function() {
		this.$el.find("#interiors").css({"height":app.windowHeight + "px", "width":app.windowWidth + "px"});
		this.$el.find("#background_image").css({"width":app.windowWidth + "px", "height":app.windowHeight + "px"});
		this.$el.find("#int_categories").css({"top":$("#header_bar").height() + "px"});
		this.$el.find("#int_categories").height(app.windowHeight - $("#header_bar").height() - $("#tabstrip").height());
	},
	render:function() {
		this.template = _.template(tpl.get("interiors"));
		this.$el.html(this.template());
		this.$el.addClass("state"); 
		this.createCategories();
		this.$el.find("#int_categories").niceScroll({cursorcolor: "#666666", cursorborder: "1px solid #666666", cursorwidth: "10px", cursoropacitymax: .8, cursorborderradius: "6px"});
		this.$el.find("#int_categories").getNiceScroll().hide();
	},
	createCategories:function() {
		var page = this;
		$.each(app.interiorsCatCollection.models, function(ind, cmodel) {
			var cat = jQuery('<div/>', {
				class:"interiors_category",
				id:cmodel.attributes.id
			}).appendTo(page.$el.find("#int_categories_buttons"));
			if (ind == 0) {
				cat.addClass("first");
			}
			var cat_img = jQuery('<img/>', {
				src:cmodel.attributes.image,
				class:"catimg"
			}).appendTo(cat);
			cat.click(function() {
				page.onCategorySelect(this)
			});
		});
        TweenMax.to(page.$el.find("#int_subcategories"), .01, {css:{autoAlpha:0}});
        TweenMax.to(page.$el.find("#int_images"), .01, {css:{autoAlpha:0}});
	},
	onCategorySelect:function(cat) {
		console.log(cat);
		this.$el.find("#int_categories").getNiceScroll().hide();
		TweenMax.to(this.$el.find("#int_categories"), .3, {css:{autoAlpha:0}, onComplete:this.createSubCategories, onCompleteParams:[$(cat).attr("id"), this]});
	},
	createSubCategories:function(n, page) {
        var pg = page;
        var cat = app.interiorsCatCollection.findWhere({"id":n});
        var subcatArr = cat.attributes.subcategories.split(",");
        $.each(subcatArr, function(ind, sc)    {
            var scobj = app.interiorsSubCatCollection.findWhere({"id":sc});
            var scat = jQuery('<div/>', {
				class:"interiors_subcategory",
				id:scobj.attributes.id
			}).appendTo(pg.$el.find("#int_subcategories"));
			if (ind == 0) {
				scat.addClass("first");
			}
			var scat_img = jQuery('<img/>', {
				src:scobj.attributes.image,
				class:"scatimg"
			}).appendTo(scat);
            scat.click(function() {
				pg.onSubCategorySelect(this)
			});
        });
		TweenMax.to(pg.$el.find("#int_subcategories"), .4, {css:{autoAlpha:1}});
	},
    onSubCategorySelect:function(scat) {
		TweenMax.to(this.$el.find("#int_subcategories"), .3, {css:{autoAlpha:0}, onComplete:this.createImages, onCompleteParams:[$(scat).attr("id"), this]});
	},
    createImages:function(n, page) {
        var pg = page;
        var scat = app.interiorsSubCatCollection.findWhere({"id":n});
        var imgArr = cat.attributes.subcategories.split(",");
        $.each(imgArr, function(ind, img)    {
            var imgobj = app.interiorsImagesCollection.findWhere({"id":img});
            var imgdiv = jQuery('<div/>', {
				class:"interiors_image",
				id:imgobj.attributes.id
			}).appendTo(pg.$el.find("#int_images"));
			if (ind == 0) {
				imgdiv.addClass("first");
			}
			var int_img = jQuery('<img/>', {
				src:imgobj.attributes.image,
				class:"intimg"
			}).appendTo(imgdiv);
            imgdiv.click(function() {
				pg.onImageSelect(this)
			});
        });
		TweenMax.to(pg.$el.find("#int_images"), .4, {css:{autoAlpha:1}});

	},
    onImageSelect:function(img)    {
        console.log("image selected");
    }
});
/*
serializeInteriors:function()    {
var intObj = {};
$.each(app.interiorsCatCollection.models, function(i1, cmodel)    {
            

});
}
*/
