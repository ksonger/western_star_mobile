window.AssetsCollection = Backbone.Collection.extend({
    model:AssetsModel,
    url:net_host + "/getData/test"
});