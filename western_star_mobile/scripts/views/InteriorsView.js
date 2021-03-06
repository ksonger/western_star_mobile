window.InteriorsView = StateView.extend({

    swiping: false,
    currentCategory: 0,
    currentSubcategory: 0,
    currentImage: 1,
    numImages: null,
    currentView: "categories",
    viewAnchors: [],
    applied_views: [],

    initialize: function () {
        if (this.firstLoad) {
            this.onFirstLoad();
        }
    },

    onEnter: function () {
        app.mainView.setStrings();
        if (this.currentView == "categories") {
            try {
                app.mainView.headerView.hideBack();
            }
            catch (err) {
            }
        }
        TweenLite.to(this.$el, .7, {css: {autoAlpha: 1}, delay: .4});
    },

    respond: function () {
        var header_bar = $("#header_bar"),
            tabstrip = $("#tabstrip");

        this.$el.find("#interiors").css({"height": app.windowHeight + "px", "width": app.windowWidth + "px"});
        this.$el.find("#background_image").css({"width": app.windowWidth + "px", "height": app.windowHeight + "px"});
        this.$el.find("#interiors_logo").css({"top": ((this.$el.find("#top_div").height() - this.$el.find("#logo_div").height()) / 2) + "px"});
        this.$el.find("#interiors_title").css({"top": ((this.$el.find("#top_div").height() - this.$el.find("#interiors_title").height()) / 2) + "px"});
        this.$el.find("#int_categories").css({"top": header_bar.height() + this.$el.find("#top_div").height() + (((app.windowHeight - header_bar.height() - this.$el.find("#top_div").height() - tabstrip.height()) - (app.windowHeight * .45) - 80) / 2) + "px", "left": (app.windowWidth - this.$el.find("#int_categories").width()) / 2 + "px"});
        this.$el.find("#int_categories").height(app.windowHeight - header_bar.height() - tabstrip.height());

        $.each(this.$el.find(".interiors_category"), function (ind, cat) {
            try {
                $(cat).find(".cat_text").css({"top": (app.windowHeight * .45) - $(cat).find(".cat_text").height() + 55 + "px"});
            }
            catch (err) {
            }
        });
    },

    render: function () {

        this.template = _.template(tpl.get("interiors"));
        this.$el.html(this.template());
        this.$el.addClass("state");
        this.createCategories();
    },

    createCategories: function () {

        var page = this;
        var cat_text;
        var h;

        page.$el.find("#int_categories").html("<div id='interiors_cab_configurations'></div><div id='interiors_choose_configurations'></div>");
        $.each(app.interiorsCatCollection.models, function (ind, cmodel) {

            var cat = jQuery('<div/>', {
                class: "interiors_category",
                id: cmodel.attributes.id
            }).appendTo(page.$el.find("#int_categories"));
            h = app.windowHeight * .45;
            var w = h * .867;

            jQuery('<img/>', {
                src: cmodel.attributes.image,
                class: "catimg",
                width: w + "px",
                height: h + "px"
            }).appendTo(cat);

            cat_text = jQuery('<div/>', {
                class: "cat_text",
                id: cmodel.attributes.title
            }).appendTo(cat);

            cat_text.css({"width": (w - 10) + "px"});
            cat.css({"height": h + "px"});
            cat.click(function () {
                page.onCategorySelect(this);
            });
        });

        app.mainView.setStrings();
        TweenMax.to(page.$el.find("#int_subcategories"), .01, {css: {autoAlpha: 0}});
        TweenMax.to(page.$el.find("#int_images"), .01, {css: {autoAlpha: 0}});

        try {
            app.mainView.headerView.hideBack();
        }
        catch (err) {
        }

        TweenMax.to(page.$el.find("#int_categories"), .4, {css: {autoAlpha: 1}});
        page.currentView = "categories";
    },

    onCategorySelect: function (cat) {
        this.currentCategory = $(cat).attr("id");
        TweenMax.to(this.$el.find("#int_categories"), .3, {css: {autoAlpha: 0}, onComplete: this.createSubCategories, onCompleteParams: [$(cat).attr("id"), this]});
    },

    createSubCategories: function (n, page) {
        var pg = page,
            cat,
            subcatArr = [];

        pg.$el.find("#int_subcategories").html("");

        $.each(app.interiorsCatCollection.models, function (ind, model) {
            if (model.attributes.id == n) {
                cat = model;
                subcatArr = cat.attributes.subcategories.split(",");
            }
        });

        jQuery('<div/>', {
            id: "interiors_swatches"
        }).appendTo(pg.$el.find("#int_subcategories"));

        jQuery('<table/>', {
            id: "table_swatches",
            align: "center"
        }).appendTo(pg.$el.find("#interiors_swatches"));

        $.each(subcatArr, function (ind, sc) {
            var scobj = {};
            $.each(app.interiorsSubCatCollection.models, function (ind, model) {
                if (model.attributes.id == sc) {
                    scobj = model;
                }
            });

            var h = app.windowHeight * .4,
                w = h * (586 / 320),
                scat = jQuery('<div/>', {
                    class: "interiors_subcategory",
                    id: scobj.attributes.id
                }).appendTo(pg.$el.find("#int_subcategories"));

            scat.css({"height": h + "px"});

            jQuery('<img/>', {
                src: scobj.attributes.image,
                class: "scatimg",
                width: w + "px",
                height: h + "px"
            }).appendTo(scat);

            if (ind > 0) {
                TweenMax.to(scat, .5, { css: {autoAlpha: 0}});
            }

            var td = jQuery('<td/>', {
                class: "swatch",
                id: "sw_" + scobj.attributes.id
            }).appendTo(pg.$el.find("#table_swatches"));

            if (ind == 0) {
                td.addClass("active");
            }

            td.css({"background": "url(" + scobj.attributes.swatch + ") no-repeat"});
            td.click(function () {
                pg.onSwatchSelect(this);
            });

            scat.click(function () {
                pg.onSubCategorySelect(this);
            });
        });

        var header_bar = $("#header_bar");

        var sum_a = ((app.windowHeight - (pg.$el.find("#interiors_swatches").height() + $(pg.$el.find(".interiors_subcategory")[0]).height() + 40)) / 2) + ((header_bar.height() + pg.$el.find("#top_div").height() - $("#tabstrip").height()) / 2);

        pg.$el.find(".interiors_subcategory").css({"top": (sum_a) + header_bar.height() + pg.$el.find("#top_div").height() + "px"});
        pg.$el.find("#interiors_swatches").css({"top": $(pg.$el.find(".interiors_subcategory")[0]).offset().top - pg.$el.find("#interiors_swatches").height() - 40 + "px"});

        app.mainView.headerView.showBack();

        TweenMax.to(page.$el.find("#int_categories"), .01, {css: {autoAlpha: 0}});
        TweenMax.to(page.$el.find("#int_images"), .01, {css: {autoAlpha: 0}});
        TweenMax.to(pg.$el.find("#int_subcategories"), .4, {css: {autoAlpha: 1}});

        page.currentView = "subcategories";
    },

    onSwatchSelect: function (sw) {
        var swa = sw;

        $.each(this.$el.find(".interiors_subcategory"), function (index, sc) {
            if ($(swa).attr("id").substr(3) == $(sc).attr("id")) {
                TweenMax.to($(sc), .01, {css: {autoAlpha: 1}});
            }
            else {
                TweenMax.to($(sc), .01, {css: {autoAlpha: 0}});
            }
        });
        $.each(this.$el.find(".swatch"), function (index, swatch) {
            if (swatch == swa) {
                $(swatch).addClass("active");
            }
            else {
                $(swatch).removeClass("active");
            }
        });
    },
    onSubCategorySelect: function (scat) {
        TweenMax.to(this.$el.find("#int_subcategories"), .3, {css: {autoAlpha: 0}, onComplete: this.createImages, onCompleteParams: [$(scat).attr("id"), this]});
    },
    createImages: function (n, page) {
        var pg = page;
        pg.$el.find("#int_images").html("");
        var scat = [];
        var viewsArr = [];

        $.each(app.interiorsSubCatCollection.models, function (ind, model) {
            if (model.attributes.id == n) {
                scat = model;
                viewsArr = scat.attributes.nav_ids.split(",");
            }
        });

        var imgArr = scat.attributes.images.split(",");
        pg.numImages = imgArr.length;

        jQuery('<div/>', {
            id: "images_gallery"
        }).appendTo(pg.$el.find("#int_images"));

        var indices = jQuery('<div/>', {
            id: "images_index"
        }).appendTo(pg.$el.find("#int_images"));

        indices.css({"top": app.windowHeight - 145 + "px"});

        var indices_list = jQuery('<ol/>', {
            id: "images_index_list"
        }).appendTo(pg.$el.find("#images_index"));

        for (var i = 0; i < imgArr.length; i++) {
            var el = jQuery('<li/>', {
            }).appendTo(pg.$el.find("#images_index_list"));
            if (i == 0) {
                el.addClass("current");
            }
        }

        indices_list.css({"left": ((app.windowWidth - indices_list.width()) / 2) + "px", "margin-left": "-40px"});

        this.applied_views = [];

        while (pg.viewAnchors.length > 0) {
            pg.viewAnchors.pop();
        }

        $.each(imgArr, function (ind, img) {
            var imgobj = '';

            $.each(app.interiorsImagesCollection.models, function (ind, model) {
                if (model.attributes.id == img) {
                    imgobj = model;
                }
            });

            var imgtd = jQuery('<div/>', {
                class: "interiors_image",
                id: imgobj.attributes.id
            }).appendTo(pg.$el.find("#images_gallery"));

            var dupe = false;

            for (var i = 0; i < pg.applied_views.length; i++) {
                if (imgobj.attributes.view == pg.applied_views[i]) {
                    dupe = true;
                    break;
                }
            }

            if (!dupe) {
                pg.applied_views.push(imgobj.attributes.view);
            }

            pg.viewAnchors.push(imgobj.attributes.view);

            imgtd.css({"text-align": "center", "width": app.windowWidth + "px"});

            var h = app.windowHeight * .4,
                w = (h / 3) * 4,
                int_img = jQuery('<img/>', {
                    src: imgobj.attributes.image,
                    class: "intimg",
                    width: w + "px",
                    height: h + "px"
                }).appendTo(imgtd);

            int_img.click(function () {
                pg.onImageSelect(this);
            });
        });

        var cltd = jQuery('<div/>', {}).appendTo(pg.$el.find("#images_gallery"));
        cltd.css({"clear": "left"});

        jQuery('<div/>', {
            id: "interiors_views"
        }).appendTo(pg.$el.find("#int_images"));

        jQuery('<table/>', {
            id: "table_views",
            align: "center"
        }).appendTo(pg.$el.find("#interiors_views"));

        $.each(viewsArr, function (ind, view) {
            var navobj = {};

            $.each(app.interiorsNavCollection.models, function (ind, model) {
                if (model.attributes.id == view) {
                    navobj = model;
                }
            });

            for (var i = 0; i < pg.applied_views.length; i++) {
                if (navobj.attributes.view == pg.applied_views[i]) {

                    var td = jQuery('<td/>', {
                        class: "interiors_nav_view" + " " + navobj.attributes.view,
                        id: "v_" + navobj.attributes.id
                    }).appendTo(pg.$el.find("#table_views"));

                    if (ind == 0) {
                        td.addClass("active");
                    }

                    td.css({"background": "url(" + navobj.attributes.image + ") no-repeat"});
                    td.click(function () {
                        pg.onViewSelect(this, pg);
                    });
                }
            }
        });

        pg.$el.find("#images_gallery, img").mousedown(function () {
            return false;
        });

        try {
            pg.$el.find("#images_gallery, img").on("swipe", function (e) {
                pg.onSwipe(e);
            });
        }
        catch (e) {
        }

        app.mainView.headerView.showBack();

        var header_bar = $("#header_bar");

        var sum_a = ((app.windowHeight - (pg.$el.find("#interiors_views").height() + pg.$el.find("#images_gallery").height() + 100)) / 2) + ((header_bar.height() + pg.$el.find("#top_div").height() - $("#tabstrip").height()) / 2);

        pg.$el.find("#images_gallery").css({"top": (sum_a) + header_bar.height() + pg.$el.find("#top_div").height() + "px"});
        pg.$el.find("#interiors_views").css({"top": pg.$el.find("#images_gallery").offset().top - pg.$el.find("#interiors_views").height() - 40 + "px"});

        TweenMax.to(page.$el.find("#int_categories"), .01, {css: {autoAlpha: 0}});
        TweenMax.to(page.$el.find("#int_subcategories"), .01, {css: {autoAlpha: 0}});
        TweenMax.to(pg.$el.find("#int_images"), .4, {css: {autoAlpha: 1}});

        page.currentView = "images";
    },
    onViewSelect: function (el, page) {
        $.each(this.$el.find(".interiors_nav_view"), function (ind, el) {
            $(el).removeClass("active");
        });

        var selectedView;
        $.each(page.applied_views, function (ind, av) {
            if ($(el).hasClass(av)) {
                $(el).addClass("active");
                selectedView = av;
            }
        });

        for (var i = 0; i < page.viewAnchors.length; i++) {
            if (selectedView == page.viewAnchors[i]) {
                page.gotoImage(i + 1);
                break;
            }
        }
    },
    onSwipe: function () {
        if (!this.swiping) {
            this.swiping = true;

            self.setTimeout("app.mainView.interiorsView.resetSwiping()", 500);

            if (e.direction == "left") {
                this.next();
            }
            if (e.direction == "right") {
                this.prev();
            }
        }
    },

    resetSwiping: function () {
        app.mainView.interiorsView.swiping = false;
    },

    next: function () {
        if (this.currentImage < this.numImages) {
            this.gotoImage(this.currentImage + 1);
        }
    },

    prev: function () {
        if (this.currentImage > 1) {
            this.gotoImage(this.currentImage - 1);
        }
    },

    gotoImage: function (n) {
        var num = n;

        TweenMax.to(this.$el.find("#images_gallery"), .5, { css: {left: (-(app.windowWidth * (n - 1))) + "px" }, ease: Back.easeOut});

        $.each(this.$el.find("#images_index_list").find("li"), function (ind, el) {
            if (ind == num - 1) {
                $(el).addClass("current");
            }
            else {
                $(el).removeClass("current");
            }
        });

        var page = this;

        $.each(this.$el.find(".interiors_nav_view"), function (ind, el) {
            if ($(el).hasClass(page.viewAnchors[num - 1])) {
                $(el).addClass("active");
            }
            else {
                $(el).removeClass("active");
            }
        });
        this.currentImage = parseInt(n);
    },

    onImageSelect: function (img) {
        var iObj = {
            "attributes": {
                "src": $(img).attr("src")
            }
        };
        app.mainView.imageView.showImage(iObj);
    }
});