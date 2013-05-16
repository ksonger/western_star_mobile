window.LibraryView = StateView.extend({
	lang_list:null,
	menu_selections:[{"level":1, "el":null, "obj":null},{"level":2, "el":null, "obj":null},{"level":3, "el":null, "obj":null}],
	filters:[],
	nav_width:0,
	currentLevel:1,
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
		this.$el.find("#search_div").css({"margin-top":((this.$el.find("#top_div").height() - this.$el.find("#search_div").height()) / 2) + "px"});
		this.$el.find("#main_div").css({
			"top":(this.$el.find("#top_div").height()) + $("#header_bar").height() + "px",
			"height":app.windowHeight - this.$el.find("#top_div").height() - $(".footer").height() + "px"
		});
		this.$el.find("#serious").css({"top":this.$el.find("#library_logo").offset().top - 10 + "px", "left":app.windowWidth - this.$el.find("#serious").width() - 50 + "px"});
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
		this.buildMenu(1);
	},
	buildMenu:function(lvl) {
		var page = this;
		page.nav_width = this.$el.find("#left_nav").width();
		var level = lvl;
		if (level == 1) {
            var el = page.$el.find("#first_level");
			page.$el.find("#first_level").html("");
			$.each(app.menuCollection.models, function(ind, model) {
				$.each(model.get("primary_nav"), function(ind, pnav) {
					var item_lvl1 = jQuery('<div/>', {
						class:"nav_item",
						id:pnav.value + "_" + pnav.id
					}).appendTo(page.$el.find("#first_level"));
					var item_lvl1_span = jQuery('<span/>', {
						id:"library_menu_" + pnav.value + "_" + + pnav.id
					}).appendTo(item_lvl1);
					var item_lvl1_icon = jQuery('<div/>', {
						id:"icon"
					}).appendTo(item_lvl1);
					item_lvl1.click(function(evt) {
						el.find(".nav_item").removeClass("active");
						el.find("span").removeClass("active");
						el.find("#icon").removeClass("active");
						$(this).addClass("active");
						$(this).find("span").addClass("active");
						$(this).find("#icon").addClass("active");
						page.menu_selections[0].el = $(this);
						var item = $(this);
						$.each(app.menuCollection.models, function(ind1, model1) {
							$.each(model.get("primary_nav"), function(ind1, child) {
								if (child.value + "_" + child.id == item.attr("id")) {
									page.menu_selections[0].obj = child;
									if (pnav.child_id_set != "0") {
										page.buildMenu(2);
                                        page.addFilter(child);
									}
								}
							});
						});
					});
				});
			});
		}
		if (level == 2) {
            var el = page.$el.find("#second_level");
			page.$el.find("#second_level").html("");
			$.each(page.menu_selections[0].obj.child_menus, function(ind, item) {
				var item_lvl2 = jQuery('<div/>', {
					class:"nav_item",
					id:item.value + "_" + item.id
				}).appendTo(page.$el.find("#second_level"));
				var item_lvl2_span = jQuery('<span/>', {
					id:"library_menu_" + item.value + "_" + + item.id
				}).appendTo(item_lvl2);
				var item_lvl2_icon = jQuery('<div/>', {
					id:"icon"
				}).appendTo(item_lvl2);
				item_lvl2.click(function(evt) {
					el.find(".nav_item").removeClass("active");
					el.find("span").removeClass("active");
					el.find("#icon").removeClass("active");
					$(this).addClass("active");
					$(this).find("span").addClass("active");
					$(this).find("#icon").addClass("active");
					page.menu_selections[1].el = $(this);
					var item = $(this);
					$.each(app.menuCollection.models, function(ind1, model1) {
						$.each(model1.get("primary_nav"), function(ind1, pnav1) {
							if (pnav1 == page.menu_selections[0].obj) {
								$.each(pnav1.child_menus, function(ind2, child) {
									if (child.value + "_" + child.id == item.attr("id")) {
										page.menu_selections[1].obj = child;
										if (child.child_id_set != "0") {
											page.buildMenu(3);
                                            page.addFilter(child);
										}
									}
								});
							}
						});
					});
				});
			});
			page.currentLevel = level;
			page.gotoLevel(level);
		}
		if (level == 3) {
            var el = page.$el.find("#third_level");
			page.$el.find("#third_level").html("");
			$.each(page.menu_selections[1].obj.child_menus, function(ind, item) {
				var item_lvl3 = jQuery('<div/>', {
					class:"nav_item",
					id:item.value + "_" + item.id
				}).appendTo(page.$el.find("#third_level"));
				var item_lvl3_span = jQuery('<span/>', {
					id:"library_menu_" + item.value + "_" + + item.id
				}).appendTo(item_lvl3);
				var item_lvl3_icon = jQuery('<div/>', {
					id:"icon"
				}).appendTo(item_lvl3);
				item_lvl3.click(function(evt) {
					el.find(".nav_item").removeClass("active");
					el.find("span").removeClass("active");
					el.find("#icon").removeClass("active");
					$(this).addClass("active");
					$(this).find("span").addClass("active");
					$(this).find("#icon").addClass("active");
					page.menu_selections[2].el = $(this);
					var item = $(this);
					$.each(app.menuCollection.models, function(ind1, model1) {
						$.each(model1.get("primary_nav"), function(ind1, child) {
							if (child.value + "_" + child.id == item.attr("id")) {
								page.menu_selections[2].obj = child;
                                page.addFilter(child);
							}
						});
					});
				});
			});
			page.currentLevel = level;
			page.gotoLevel(level);
		}
		app.mainView.setStrings();
	},
	gotoLevel: function(n) {
		var num = n;
		TweenMax.to(this.$el.find("#nav_levels"), .3, { css:{left: (-(this.nav_width * (n - 1))) + "px" }});
	},
    addFilter:function(obj)    {
        //console.log(obj);
    }
});