window.UsersCollection = Backbone.Collection.extend({
    model:UserModel,
    url:"http://localhost/ws_api/users"
});