window.ThumbnailCollection = Backbone.Collection.extend({
    model:ThumbnailModel,
    url:db_host + "/ws_api/thumbnails"
});