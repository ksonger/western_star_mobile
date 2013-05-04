window.InteriorsSubCatCollection = Backbone.Collection.extend({
    model:InteriorsSubCatModel,
    url:db_host + "/ws_api/interiors_subcategories"
});