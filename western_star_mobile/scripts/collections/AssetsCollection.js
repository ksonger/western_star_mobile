window.AssetsCollection = Backbone.Collection.extend({
    model:AssetsModel,
    url:"http://localhost/ws_api/assets"
});