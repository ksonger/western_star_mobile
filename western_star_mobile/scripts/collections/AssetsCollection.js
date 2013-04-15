window.AssetsCollection = Backbone.Collection.extend({
    model:AssetsModel,
    url:db_host + "/ws_api/assets"
});