window.MenuCollection = Backbone.Collection.extend({
    model:MenuModel,
    url:net_host + "/getMenu/12"
});