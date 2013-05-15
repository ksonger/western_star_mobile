window.MenuCollection = Backbone.Collection.extend({
    model:MenuModel,
    url:db_host + "/ws_api/menu"
});