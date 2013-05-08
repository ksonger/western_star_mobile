window.InteriorsView = StateView.extend({
	lang_list:null,
	swiping:false,
	currentImage:1,
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
		var sc_swatches = jQuery('<div/>', {
			id:"interiors_swatches",
		}).appendTo(pg.$el.find("#int_subcategories"));
		var swatches = jQuery('<table/>', {
			id:"table_swatches",
			align:"center"
		}).appendTo(pg.$el.find("#interiors_swatches"));
		$.each(subcatArr, function(ind, sc) {
			var scobj = app.interiorsSubCatCollection.findWhere({"id":sc});
			var scat = jQuery('<div/>', {
				class:"interiors_subcategory",
				id:scobj.attributes.id
			}).appendTo(pg.$el.find("#int_subcategories"));
			var scat_img = jQuery('<img/>', {
				src:scobj.attributes.image,
				class:"scatimg"
			}).appendTo(scat);
            
			var td = jQuery('<td/>', {
				class:"swatch",
				id:"sw_" + scobj.attributes.id
			}).appendTo(pg.$el.find("#table_swatches"));
			td.css({"background":scobj.attributes.swatch});
			td.click(function() {
				pg.onSwatchSelect(this);
			});
			scat.click(function() {
				pg.onSubCategorySelect(this);
			});
		});
		TweenMax.to(pg.$el.find("#int_subcategories"), .4, {css:{autoAlpha:1}});
	},
	onSwatchSelect:function(sw) {
		var swa = sw;
		$.each(this.$el.find(".interiors_subcategory"), function(index, sc) {
			if ($(swa).attr("id").substr(3) == $(sc).attr("id")) {
				TweenMax.to($(sc), .01, {css:{autoAlpha:1}});
			}
			else {
				TweenMax.to($(sc), .01, {css:{autoAlpha:0}});
			}
		});
	},
	onSubCategorySelect:function(scat) {
		TweenMax.to(this.$el.find("#int_subcategories"), .3, {css:{autoAlpha:0}, onComplete:this.createImages, onCompleteParams:[$(scat).attr("id"), this]});
	},
	createImages:function(n, page) {
		var pg = page;
		var scat = app.interiorsSubCatCollection.findWhere({"id":n});
		var imgArr = scat.attributes.images.split(",");
		pg.numImages = imgArr.length;
		var gallery = jQuery('<div/>', {
			id:"images_gallery",
		}).appendTo(pg.$el.find("#int_images"));
        
		var indices = jQuery('<div/>', {
			id:"images_index",
		}).appendTo(pg.$el.find("#int_images"));
        indices.css({"top": app.windowHeight - 145 + "px"});
		var indices_list = jQuery('<ol/>', {
			id:"images_index_list",
		}).appendTo(pg.$el.find("#images_index"));
		for (var i = 0;i < imgArr.length;i++) {
			var el = jQuery('<li/>', {
			}).appendTo(pg.$el.find("#images_index_list"));
            if(i == 0)    {
                el.addClass("current");
            }
		}
        indices_list.css({"left":((app.windowWidth - indices_list.width())/2) + "px", "margin-left":"-40px"});
        
		var xpos = (app.windowWidth - 560) / 2;
		$.each(imgArr, function(ind, img) {
			var imgobj = app.interiorsImagesCollection.findWhere({"id":img});
			var imgtd = jQuery('<div/>', {
				class:"interiors_image",
				id:imgobj.attributes.id
			}).appendTo(pg.$el.find("#images_gallery"));
            
			imgtd.css({"text-align":"center", "width":app.windowWidth + "px"});
            var h = app.windowHeight * .4;
            var w = (h/3)*4;
			var int_img = jQuery('<img/>', {
				src:imgobj.attributes.image,
				class:"intimg",
				width:w + "px",
				height:h + "px"
			}).appendTo(imgtd);
		});
		var cltd = jQuery('<div/>', {}).appendTo(pg.$el.find("#images_gallery"));
		cltd.css({"clear":"left"});

		pg.$el.find("#images_gallery").mousedown(function() {
			return false;
		});
		try {
			pg.$el.find("#images_gallery").on("swipe", function(e) {
				pg.onSwipe(e);
			});
		}
		catch (e) {
		}

		TweenMax.to(pg.$el.find("#int_images"), .4, {css:{autoAlpha:1}});
	},
	onSwipe:function (e) {
		if (!this.swiping) {
			this.swiping = true;
			var page = this;
			self.setTimeout("app.mainView.interiorsView.resetSwiping()", 500);
			if (e.direction == "left") {
				this.next();
			}
			if (e.direction == "right") {
				this.prev();
			}
		}
	},

	resetSwiping:function() {
		app.mainView.interiorsView.swiping = false;
	},
    
	next:function () {
		if (this.currentImage < this.numImages) {
			this.gotoImage(this.currentImage + 1);
		}
	},

	prev:function () {
		if (this.currentImage > 1) {
			this.gotoImage(this.currentImage - 1);
		}
	},
    
	gotoImage: function(n) {
        var num = n;
		TweenMax.to(this.$el.find("#images_gallery"), .5, { css:{left: (-(app.windowWidth * (n - 1))) + "px" }, ease:Back.easeOut});
        $.each(this.$el.find("#images_index_list").find("li"), function(ind, el)    {
            if(ind == num-1)    {
                $(el).addClass("current");
            }    else{
                $(el).removeClass("current");
            }
        });
		this.currentImage = parseInt(n);
	},
    
	onImageSelect:function(img) {
		console.log("image selected");
	}
});