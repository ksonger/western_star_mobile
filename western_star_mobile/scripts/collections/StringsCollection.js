window.StringsCollection = Backbone.Collection.extend({
    model:StringsModel,
    url:"http://localhost/ws_api/strings"
});