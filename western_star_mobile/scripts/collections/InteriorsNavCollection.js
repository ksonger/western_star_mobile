window.InteriorsNavCollection = Backbone.Collection.extend({
    model:InteriorsNavModel,
    url:db_host + "/ws_api/interiors_nav"
});