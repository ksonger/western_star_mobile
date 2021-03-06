window.HeaderView = Backbone.View.extend({
    lang_open:false,
	initialize:function () {
        this.render();
	},

	respond:function() {
        this.$el.find("#lang_menu_table").css({"left":app.windowWidth - $("#lang_menu_table").width() - 15 + "px"});
	},

    hideBack:function()    {
        TweenLite.to(this.$el.find("#back_button"), .01, {css:{autoAlpha:0}});
    },

    showBack:function()    {
        TweenLite.to(this.$el.find("#back_button"), .01, {css:{autoAlpha:1}});
    },

	render:function() {
        var lang_table = $("#lang_menu_table"),
            hdr = this;

		this.template = _.template(tpl.get("header"));
		this.$el = $("#header_bar");
		this.$el.html(this.template());

        this.$el.find("#lang_menu_topmiddle").css({"width":lang_table.width() - 116 + "px"});
        this.$el.find("#lang_menu_bottommiddle").css({"width":lang_table.width() - 30 + "px"});
        TweenLite.to(this.$el.find("#lang_menu_table"), .01, {css:{autoAlpha:0}});
		TweenLite.to(this.$el, .01, {css:{autoAlpha:0}});

        this.$el.find("#lang_button").click(function()    {
            if(!hdr.lang_open)    {
                TweenLite.to(hdr.$el.find("#lang_menu_table"), .3, {css:{autoAlpha:1}});
            }    else    {
                TweenLite.to(hdr.$el.find("#lang_menu_table"), .01, {css:{autoAlpha:0}});
            }
            hdr.lang_open = !hdr.lang_open;
        });

        $.each(this.$el.find(".lang_item"), function(index, item)    {
            $(item).click(function()    {
                hdr.$el.find(".lang_check").removeClass("active");
                $(item).closest("td").next().addClass("active");
                app.mainView.onLanguageSelect($(item).attr("id"));
                hdr.$el.find("#lang_button").click();
            });     
        });

        this.$el.find("#back_button").click(function()    {
            if(app.currentState == app.mainView.interiorsView)    {

                if(app.currentState.currentView == "subcategories")    {
                    app.currentState.$el.find("#int_subcategories").html("");
                    app.currentState.createCategories();
                }

                if(app.currentState.currentView == "images")    {
                    app.currentState.$el.find("#int_images").html("");
                    app.currentState.createSubCategories(app.currentState.currentCategory, app.currentState);
                }
            }
            if(app.currentState == app.mainView.libraryView)    {

                if(app.mainView.libraryView.currentLevel > 1)    {
                    app.mainView.libraryView.currentLevel--;
                    app.mainView.libraryView.gotoLevel(app.mainView.libraryView.currentLevel);
                }

                app.mainView.libraryView.menu_filters.pop();
                app.mainView.libraryView.filterAssets();

                if(app.mainView.libraryView.currentLevel == 1)    {
                    TweenLite.to($(this), .01, {css:{autoAlpha:0}});
                }    else    {
                    TweenLite.to($(this), .01, {css:{autoAlpha:1}});
                }
            }
        });
	}
});
