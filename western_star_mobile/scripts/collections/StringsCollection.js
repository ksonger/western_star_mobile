window.StringsCollection = Backbone.Collection.extend({
    model:StringsModel,
    url:db_host + "/ws_api/strings"
});