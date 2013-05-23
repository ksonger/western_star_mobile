window.LibraryView = StateView.extend({
	lang_list:null,
	menu_selections:[{"level":1, "el":null, "obj":null},{"level":2, "el":null, "obj":null},{"level":3, "el":null, "obj":null}],
	menu_filters:[],
	nav_width:0,
	currentLevel:1,
	assets:[],
	initialize:function (options) {
		if (this.firstLoad) {   
			this.onFirstLoad();
		}
	},
    
    
    
	onEnter:function() {
		app.mainView.setStrings();
		TweenLite.to(this.$el, .7, {css:{autoAlpha:1}, delay:.4});  
		TweenLite.to(app.mainView.headerView.$el.find("#back_button"), .01, {css:{autoAlpha:0}});
	},
	respond:function() {
		this.$el.find("#library").width(app.windowWidth);
		this.$el.find("#library").height(app.windowHeight);
		this.$el.find("#library_logo").css({"top":((this.$el.find("#top_div").height() - this.$el.find("#logo_div").height()) / 2) + "px"});
		this.$el.find("#library_title").css({"top":((this.$el.find("#top_div").height() - this.$el.find("#library_title").height()) / 2) + "px"});
		this.$el.find("#search_div").css({"margin-top":(this.$el.find("#top_div").height() - this.$el.find("#search_div").height()) / 2 + "px"});
		this.$el.find("#main_div").css({
			"top":(this.$el.find("#top_div").height()) + $("#header_bar").height() + "px",
			"height":app.windowHeight - this.$el.find("#top_div").height() - $(".footer").height() + "px"
		});
		this.$el.find("#doc_type_filters").css({
			"left":this.$el.find("#left_nav").width() + "px",
			"height":"52px"
		});
		this.$el.find("#filters_title").css({
			"left":this.$el.find("#left_nav").width() + "px",
		});
		this.$el.find("#library_content").css({"height":app.windowHeight - $("#header_bar").height() - this.$el.find("#top_div").height() - $(".footer").height() - 53 + "px","width":app.windowWidth - this.$el.find("#left_nav").width() + "px", "left":this.$el.find("#left_nav").width() + "px", "margin-top":"53px"});
	},
	selectAsset:function(type, id) {
        
		if (type.toLowerCase() == "video") {
			$.each(app.localAssetsCollection.models, function(index, model) {
				if (model.get("id") == id) {
					app.mainView.videoView.showVideo(model);
				}
			});
		}
		if (type.toLowerCase() == "image" || type.toLowerCase() == "photo") {   
			$.each(app.localAssetsCollection.models, function(index, model) {
				if (model.get("id") == id) {
					app.mainView.imageView.showImage(model);
				}
			});
		}
		if (type.toLowerCase() == "brochure" || type.toLowerCase() == "document") {
			$.each(app.localAssetsCollection.models, function(index, model) {
				if (model.get("id") == id) {
					//window.open(model.attributes.src);
					var ref = window.open(model.attributes.filename, '_blank', 'location=no');
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
		this.buildAssets();
		this.$el.find("#library_content").niceScroll({cursorcolor: "#c1c1c1", cursorborder: "1px solid #c1c1c1", cursorwidth: "10px", cursoropacitymax: .8, cursorborderradius: "6px"});
        
		this.$el.find('input:checkbox').screwDefaultButtons({
			image: 'url("images/checkboxes.png")',
			width: 20,
			height: 20
		});
        
		$.each(lib.$el.find(".doc_type_filter"), function(index, ans) {
			$(ans).click(function(e) {
				if (e.target.tagName.toUpperCase() !== 'INPUT') {
					lib.filterDocType($(ans)); 
				}
			});
		});
	},
	buildMenu:function(lvl) {
		var page = this;
		page.nav_width = this.$el.find("#left_nav").width();
		var level = lvl;
		if (level == 1) {
			var el = page.$el.find("#first_level");
			page.$el.find("#first_level").html("");
			$.each(app.menuCollection.models, function(ind, model) {
				$.each(model.primary_nav, function(ind, pnav) {
					var item_lvl1 = jQuery('<div/>', {
						class:"nav_item",
						id:pnav.value + "_" + pnav.id
					}).appendTo(page.$el.find("#first_level"));
					var item_lvl1_span = jQuery('<span/>', {
						id:"library_menu_" + pnav.value + "_" + + pnav.id
					}).appendTo(item_lvl1);
					item_lvl1_span.html(pnav.text);
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
							$.each(model.primary_nav, function(ind1, child) {
								if (child.value + "_" + child.id == item.attr("id")) {
									page.menu_selections[0].obj = child;
									if (pnav.child_id_set != "0") {
										page.buildMenu(2);
									}
									page.addFilter(child);
								}
							});
						});
						TweenLite.to(app.mainView.headerView.$el.find("#back_button"), .01, {css:{autoAlpha:1}});
					});
				});
			});
		}
		if (level == 2) {
			var el = page.$el.find("#second_level");
			page.$el.find("#second_level").html("");
			if (page.menu_selections[0].obj.child_menus != undefined && page.menu_selections[0].obj.child_menus != null) {
				$.each(page.menu_selections[0].obj.child_menus, function(ind, item) {
					var item_lvl2 = jQuery('<div/>', {
						class:"nav_item",
						id:item.value + "_" + item.id
					}).appendTo(page.$el.find("#second_level"));
					var item_lvl2_span = jQuery('<span/>', {
						id:"library_menu_" + item.value + "_" + + item.id
					}).appendTo(item_lvl2);
					item_lvl2_span.html(item.text);
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
							$.each(model1.primary_nav, function(ind1, pnav1) {
								if (pnav1 == page.menu_selections[0].obj) {
									$.each(pnav1.child_menus, function(ind2, child) {
										if (child.value + "_" + child.id == item.attr("id")) {
											page.menu_selections[1].obj = child;
											if (child.child_id_set != "0") {
												page.buildMenu(3);
											}
											page.addFilter(child);
										}
									});
								}
							});
						});
						TweenLite.to(app.mainView.headerView.$el.find("#back_button"), .01, {css:{autoAlpha:1}});
					});
				});
			}
			page.currentLevel = level;
			page.gotoLevel(level);
		}
		if (level == 3) {
			var el = page.$el.find("#third_level");
			page.$el.find("#third_level").html("");
			if (page.menu_selections[1].obj.child_menus != undefined && page.menu_selections[1].obj.child_menus != null) {
				$.each(page.menu_selections[1].obj.child_menus, function(ind, item) {
					var item_lvl3 = jQuery('<div/>', {
						class:"nav_item",
						id:item.value + "_" + item.id
					}).appendTo(page.$el.find("#third_level"));
					var item_lvl3_span = jQuery('<span/>', {
						id:"library_menu_" + item.value + "_" + + item.id
					}).appendTo(item_lvl3);
					item_lvl3_span.html(item.text);
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
							$.each(model1.primary_nav, function(ind1, pnav1) {
								$.each(pnav1.child_menus, function(ind2, pnav2) {
									$.each(pnav2.child_menus, function(ind3, pnav3) {
										if (pnav3.value + "_" + pnav3.id == item.attr("id")) {
											page.menu_selections[2].obj = pnav3;
											page.addFilter(pnav3);
										}
									});
								});
							});
						});
					});
				});
			}
			page.currentLevel = level;
			page.gotoLevel(level);
		}
		app.mainView.setStrings();
	},
	gotoLevel:function(n) {
		var num = n;
		TweenMax.to(this.$el.find("#nav_levels"), .3, { css:{left: (-(this.nav_width * (n - 1))) + "px" }});
	},
	buildAssets:function() {
		try {
			var page = this;
			$.each(app.localAssetsCollection.models, function(aind, amodel) {
				if (amodel.attributes.assetType != "THUMBNAIL") {
					var asset = new LibraryItemView({model:amodel});
					asset.$el.appendTo(page.$el.find("#library_list"));
					page.assets.push(asset);
				}
			});
			
			/*
			$.each(app.assetsCollection.models[0].assetManifest[0].assets, function(aind, amodel) { 
			var asset = new LibraryItemView({model:amodel});
			asset.$el.appendTo(page.$el.find("#library_list"));
			page.assets.push(asset);
			});
			*/
			$.each(page.assets, function(ind, asset) {
				asset.$el.click(function(evt) {
					app.mainView.libraryView.selectAsset($(this).find("#asset_type").val(), $(this).find("#asset_id").val());
				});
			});
		}
		catch (e ) {
			alert(e);
		}
	},
	filterDocType:function(ans) {
		console.log(ans);
	},
	addFilter:function(obj) {
		this.menu_filters.push(obj);
		this.filterAssets();
	},
	filterAssets:function() {
		var lib = this;
		if (lib.menu_filters.length == 0) {
			$.each(lib.$el.find(".library_item"), function(aind, item) {
				$(item).css({"display":"inline-block"});
			});
		}
		else {
			$.each(lib.menu_filters, function(ind, filt) {
				if (filt.value != null) {
					$.each(lib.$el.find(".library_item"), function(aind, item) {
						var match = false;
						var item_tags = $(item).find("#asset_menutag").val().split(":");
						$.each(item_tags, function(tind, tag) {
							if (tag.toLowerCase() == filt.value.toLowerCase()) {
								match = true;
							}
						});
						if (!match) {
							$(item).css({"display":"none"});
						}
						else {
							alert("match");
							$(item).css({"display":"inline-block"});
						}
					});
				}
			});
		}
	}
});