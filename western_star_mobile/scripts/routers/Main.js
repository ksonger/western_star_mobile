Backbone.View.prototype.close = function () {
	console.log('Closing view ' + app);
	if (app.beforeClose) {
		app.beforeClose();
	}
	app.remove();
	app.unbind();
};

var app;

var AppRouter = Backbone.Router.extend({

	initialize:function () {
	},
	stringsCollection:null,
	usersCollection:null,
	mainView:null,
	int:null,
	currentLayout:"landscape",
	lang:"en",
    online:false,
	routes:{
		"":"index"
	},
	states:[],
	currentState:null,
	rInt:null,
	db:null,
	index:function () {
		app.begin();
	},
	setState:function(state) {
		if (state != app.currentState) {
			if (app.currentState != null) {
				app.currentState.onExit();
				TweenLite.to(app.currentState.$el, .4, {css:{autoAlpha:0}});
			}
			app.currentState = state;
			app.currentState.onEnter();

			if (app.currentState != app.mainView.loginView) {  
				//$(".km-navbar").show();
				if (app.currentState != app.mainView.homeView) {
					TweenLite.to($("#tabstrip"), .01, {css:{autoAlpha:1}});
                    TweenLite.to($("#header_bar"), .01, {css:{autoAlpha:1}});
                    
				}
				else {
					TweenLite.to($("#tabstrip"), .01, {css:{autoAlpha:0}});
                    TweenLite.to($("#header_bar"), .01, {css:{autoAlpha:0}});
				}
			}
			else {
				TweenLite.to($("#tabstrip"), .01, {css:{autoAlpha:0}});
                TweenLite.to($("#header_bar"), .01, {css:{autoAlpha:0}});
			}
		}
	},

	begin:function (callback) {
        this.online = window.navigator.onLine;
        
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			var windowWidth = window.innerWidth;
			var windowHeight = window.innerHeight;
		}
		else {
			var windowWidth = $(window).width();
			var windowHeight = $(window).height();
		}

		if (windowWidth <= 1024) {
			app.currentLayout = "portrait";
		}
		else {
			app.currentLayout = "landscape";
		}
		app.initDatabase();
	},
	initDatabase:function() {
		try {
			if (!window.openDatabase) {
				alert('Databases are not supported in app browser.');
			}
			else {
				var shortName = 'WESTERN_STAR';
				var version = '1.0';
				var displayName = 'Western Star Database';
				var maxSize = 100000; //  bytes
				app.db = window.openDatabase(shortName, version, displayName, maxSize);
				app.db.transaction(app.createTables, app.onDBError, app.onDBSuccess);
			}
		}
		catch (e) {
			if (e == 2) {
				// Version number mismatch.
				console.log("Invalid database version.");
			}
			else {
				console.log("Unknown error " + e + ".");
			}
			return;
		}
	},
	createTables:function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS strings');
        tx.executeSql('DROP TABLE IF EXISTS users');
        tx.executeSql('DROP TABLE IF EXISTS assets');
		tx.executeSql('CREATE TABLE IF NOT EXISTS strings(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, en TEXT NOT NULL, fr TEXT NOT NULL, dt TEXT NOT NULL, es TEXT NOT NULL, ko TEXT NOT NULL);');
		tx.executeSql('CREATE TABLE IF NOT EXISTS users(id INTEGER NOT NULL PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL);');
        tx.executeSql('CREATE TABLE IF NOT EXISTS assets(id INTEGER NOT NULL PRIMARY KEY, type TEXT NOT NULL, storage TEXT NOT NULL, src TEXT NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, thumbnail TEXT NOT NULL);');
		app.db.transaction(app.getUsers, app.onDBError, app.onDBSuccess);
	},
	getUsers:function(tx) {
		$.ajax({
			url: "data/users.json",
			async:false,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			beforeSend: function(xhr) {
				xhr.overrideMimeType('text/plain; charset=utf-8');
			},
			success: function(data) {
				json_data = JSON.parse(data);

				$.each(json_data.users, function(oind, obj) {
					var keys = [];
					var vals = [];
					$.each(obj, function(uind, usr) {
						keys.push(uind);
						vals.push(usr);
					});
                    
					tx.executeSql("INSERT INTO users(" + keys + ") VALUES (?, ?, ?)", vals);
				});	
				app.db.transaction(app.selectUsers, app.onDBError, app.onDBSuccess);
			},
			error: function() {
				if (console && console.log) {
					console.log('Error loading users.');
				}
			}
		});
	},
	getStrings:function(tx) {
		var json_data;
		$.ajax({
			url: "data/strings.json",
			async:false,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			beforeSend: function(xhr) {
				xhr.overrideMimeType('text/plain; charset=utf-8');
			},
			success: function(data) {
				json_data = JSON.parse(data);
				$.each(json_data.strings, function(oind, obj) {
					var keys = [];
					var vals = [];
					$.each(obj, function(sind, str) {
						keys.push(sind);
						vals.push(str);
					});
					tx.executeSql("INSERT INTO strings(" + keys + ") VALUES (?, ?, ?, ?, ?, ?, ?)", vals);
				});	
				app.db.transaction(app.selectStrings, app.onDBError, app.onDBSuccess);
			},
			error: function() {
				if (console && console.log) {
					console.log('Error loading localized strings.');
				}
			}
		});
	},
    getAssets:function(tx) {
		$.ajax({
			url: "data/assets.json",
			async:false,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			beforeSend: function(xhr) {
				xhr.overrideMimeType('text/plain; charset=utf-8');
			},
			success: function(data) {
				json_data = JSON.parse(data);

				$.each(json_data.assets, function(oind, obj) {
					var keys = [];
					var vals = [];
					$.each(obj, function(uind, usr) {
						keys.push(uind);
						vals.push(usr);
					});
                    
					tx.executeSql("INSERT INTO assets(" + keys + ") VALUES (?, ?, ?, ?)", vals);
				});	
				app.db.transaction(app.selectAssets, app.onDBError, app.onDBSuccess);
			},
			error: function() {
				if (console && console.log) {
					console.log('Error loading assets.');
				}
			}
		});
	},
	selectUsers:function(tx) {
		tx.executeSql("SELECT * FROM users;", [], app.userDataSelectHandler, app.errorHandler);
	},
	selectStrings:function(tx) {
		tx.executeSql("SELECT * FROM strings;", [], app.stringDataSelectHandler, app.errorHandler);
	},
    selectAssets:function(tx) {
		tx.executeSql("SELECT * FROM assets;", [], app.assetDataSelectHandler, app.errorHandler);
	},
    assetDataSelectHandler:function(transaction, results) {
		var asset_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var asset_model = new AssetsModel(row);
			asset_models.push(asset_model);
		}
		app.assetsCollection = new AssetsCollection(asset_models, {model:AssetsModel});
		app.mainView = new MainView({model:app.stringsCollection});
		app.mainView.render();
	},
	stringDataSelectHandler:function(transaction, results) {
		var str_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var str_model = new StringsModel(row);
			str_models.push(str_model);
		}
		app.stringsCollection = new StringsCollection(str_models, {model:StringsModel});
        app.db.transaction(app.getAssets, app.onDBError, app.onDBSuccess);
		//app.mainView = new MainView({model:app.stringsCollection});
		//app.mainView.render();
	},
	userDataSelectHandler:function(transaction, results) {
		var usr_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var usr_model = new UserModel(row);
			usr_models.push(usr_model);
		}
		app.usersCollection = new UsersCollection(usr_models, {model:UserModel});
		app.db.transaction(app.getStrings, app.onDBError, app.onDBSuccess);
	},
	onDBError:function(e) {
		console.log("database error: " + e.message);
	},
	onDBSuccess:function(e) {
		//console.log("success");
	},
	nullDataHandler:function(e) {
		console.log("null data: " + e);
	}
});

var wh = $(window).height();
var ww = $(window).width();

$(window).resize(function() {
});