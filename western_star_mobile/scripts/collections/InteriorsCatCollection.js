window.InteriorsCatCollection = Backbone.Collection.extend({
    model:InteriorsCatModel,
    url:db_host + "/ws_api/interiors_categories"
});