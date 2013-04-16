window.ImagesCollection = Backbone.Collection.extend({
    model:ImagesModel,
    url:db_host + "/ws_api/images"
});