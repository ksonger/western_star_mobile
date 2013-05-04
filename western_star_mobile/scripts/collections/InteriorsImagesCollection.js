window.InteriorsImagesCollection = Backbone.Collection.extend({
    model:InteriorsImagesModel,
    url:db_host + "/ws_api/interiors_images"
});