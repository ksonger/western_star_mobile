window.UsersCollection = Backbone.Collection.extend({
    model:UserModel,
    url:db_host + "/ws_api/users"
});