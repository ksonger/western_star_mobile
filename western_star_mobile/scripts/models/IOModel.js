window.IOModel = Backbone.Model.extend({
    
    db:null,
    usersReady:false,
    stringsReady:false,
    assetsReady:false,
    
	/**** this will be used to download assets and write to disk, hopefully? ****/
	writeLocalData:function() {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.onFS, this.onFail);
	},
	onFS:function(fileSystem) {
		console.log("onFS");
		fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, this.onFileEntry, this.onFail);
	},
	onFileEntry:function(fileEntry) {
		fileEntry.createWriter(this.onFileWriter, this.onFail);
	},
	onFileWriter:function(writer) {
		writer.onwriteend = function(evt) {
			console.log("contents of file now 'some sample text'");
			writer.truncate(11);  
			writer.onwriteend = function(evt) {
				console.log("contents of file now 'some sample'");
				writer.seek(4);
				writer.write(" different text");
				writer.onwriteend = function(evt) {
					console.log("contents of file now 'some different text'");
				}
			};
		};
		writer.write("some sample text");
	},
	onFail:function(error) {
		console.log(error.code);
	},
    
    
    
    /**** these methods take the remote database results and store them in the local SQLLite database ****/
	createLocalStore:function() {
		try {
			if (!window.openDatabase) {
				alert('Databases are not supported in app browser.');
			}
			else {
				var shortName = 'WESTERN_STAR';
				var version = '1.0';
				var displayName = 'Western Star Database';
				var maxSize = 100000; //  bytes
				this.db = window.openDatabase(shortName, version, displayName, maxSize);
				this.db.transaction(this.createTables, this.onDBError, this.onDBSuccess);
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
        if(app.online)    {
            // always the case, I suppose.
            // evenually this will need to incorporate a diff from the server 
            // and execute only actions against the existing data
            tx.executeSql('DROP TABLE IF EXISTS strings');
            tx.executeSql('DROP TABLE IF EXISTS users');
            tx.executeSql('DROP TABLE IF EXISTS assets');
        }
		tx.executeSql('CREATE TABLE IF NOT EXISTS strings(id INTEGER NOT NULL PRIMARY KEY, name TEXT, en TEXT, fr TEXT, dt TEXT, es TEXT, ko TEXT);');
		tx.executeSql('CREATE TABLE IF NOT EXISTS users(id INTEGER NOT NULL PRIMARY KEY, username TEXT, password TEXT, region TEXT);');
		tx.executeSql('CREATE TABLE IF NOT EXISTS assets(id INTEGER NOT NULL PRIMARY KEY, type TEXT, storage TEXT, local_src TEXT, remote_src TEXT, title TEXT, description TEXT, thumbnail TEXT, category TEXT, subcategory TEXT, metadata TEXT);');
        app.ioModel.db.transaction(app.ioModel.getUsers, app.ioModel.onUsersError, app.ioModel.onUsersSuccess);
        app.ioModel.db.transaction(app.ioModel.getStrings, app.ioModel.onStringsError, app.ioModel.onStringsSuccess);
        app.ioModel.db.transaction(app.ioModel.getAssets, app.ioModel.onAssetsError, app.ioModel.onAssetsSuccess);
	},
    
	getUsers:function(tx) {
        console.log('get users');
		$.each(app.usersCollection.models, function(oind, obj) {
			var keys = [];
			var vals = [];
			$.each(obj.attributes, function(uind, usr) {
				keys.push(uind);
				vals.push(usr);
			});
                    
			tx.executeSql("INSERT INTO users(" + keys + ") VALUES (?, ?, ?, ?)", vals);
		});	
	},
    getStrings:function(tx) {
        console.log('get strings');
		$.each(app.stringsCollection.models, function(oind, obj) {
			var keys = [];
			var vals = [];
			$.each(obj.attributes, function(uind, usr) {
				keys.push(uind);
				vals.push(usr);
			});
                    
			tx.executeSql("INSERT INTO strings(" + keys + ") VALUES (?, ?, ?, ?, ?, ?, ?)", vals);
		});
	},
	getAssets:function(tx) {
        console.log('get assets');
		$.each(app.assetsCollection.models, function(oind, obj) {
			var keys = [];
			var vals = [];
			$.each(obj.attributes, function(uind, usr) {
				keys.push(uind);
				vals.push(usr);
			});
                    
			tx.executeSql("INSERT INTO assets(" + keys + ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", vals);
		});
	},
    
    
    
    
    
    /*****************************
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
    *********************/
    
    
    
    
    /**************************************************/
	onUsersError:function(e) {
		console.log("users error: " + e.message);
	},
	onUsersSuccess:function(e) {
		console.log("users success");
        app.ioModel.usersReady = true;
        if(app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady)    {
            app.onDataReady();
        }
	},
    
    onStringsError:function(e) {
		console.log("strings error: " + e.message);
	},
	onStringsSuccess:function(e) {
		console.log("strings success");
        app.ioModel.stringsReady = true;
        if(app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady)    {
            app.onDataReady();
        }
	},
    
    onAssetsError:function(e) {
		console.log("assets error: " + e.message);
	},
	onAssetsSuccess:function(e) {
		console.log("assets success");
        app.ioModel.assetsReady = true;
        if(app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady)    {
            app.onDataReady();
        }
	},
    
    
	nullDataHandler:function(e) {
		console.log("null data: " + e);
	}
});