window.IOModel = Backbone.Model.extend({
    
	db:null,
	usersReady:false,
	stringsReady:false,
	assetsReady:false,
    
	/**** this will be used to download assets and write to disk, hopefully? ****/
	downloadFile:function() {
		window.requestFileSystem(
			LocalFileSystem.PERSISTENT, 0, 
			function onFileSystemSuccess(fileSystem) {
				fileSystem.root.getFile(
					"dummy.html", {create: true, exclusive: false}, 
					function gotFileEntry(fileEntry) {
						var sPath = fileEntry.fullPath.replace("dummy.html", "");
						var fileTransfer = new FileTransfer();
						fileEntry.remove();

						fileTransfer.download(
							"http://www.w3.org/2011/web-apps-ws/papers/Nitobi.pdf",
							sPath + "theFile.pdf",
							function(theFile) {
								console.log("download complete: " + theFile.toURI());
								showLink(theFile.toURI());
							},
							function(error) {
								console.log("download error source " + error.source);
								console.log("download error target " + error.target);
								console.log("upload error code: " + error.code);
							}
							);
					}, 
					fail);
			},
			fail);
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
				var maxSize = 1024 * 1024; //  bytes
                
				if (window.sqlitePlugin !== undefined) {
					this.db = window.sqlitePlugin.openDatabase(shortName);
				}
				else {
					// For debugin in simulator fallback to native SQL Lite
					this.db = window.openDatabase(shortName, version, displayName, maxSize);
				}	
				if (app.online) {
					this.db.transaction(this.createTables, this.onDBError, this.onDBSuccess);
				}
				else {
					app.ioModel.db.transaction(app.ioModel.selectUsers, app.ioModel.onUsersError, app.ioModel.onUsersSuccess);
					app.ioModel.db.transaction(app.ioModel.selectStrings, app.ioModel.onStringsError, app.ioModel.onStringsSuccess);
					app.ioModel.db.transaction(app.ioModel.selectAssets, app.ioModel.onAssetsError, app.ioModel.onAssetsSuccess);
				}
			}
		}
		catch (e) {
			if (e == 2) {
				// Version number mismatch.
				alert("Invalid database version.");
			}
			else {
				alert("Unknown error " + e + ".");
			}
			return;
		}
	},
	createTables:function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS strings');
		tx.executeSql('DROP TABLE IF EXISTS users');
		tx.executeSql('DROP TABLE IF EXISTS assets');
		tx.executeSql('CREATE TABLE IF NOT EXISTS strings(id INTEGER NOT NULL PRIMARY KEY, name TEXT, en TEXT, fr TEXT, dt TEXT, es TEXT, ko TEXT);');
		tx.executeSql('CREATE TABLE IF NOT EXISTS users(id INTEGER NOT NULL PRIMARY KEY, username TEXT, password TEXT, region TEXT);');
		tx.executeSql('CREATE TABLE IF NOT EXISTS assets(id INTEGER NOT NULL PRIMARY KEY, type TEXT, storage TEXT, src TEXT, title TEXT, description TEXT, thumbnail TEXT, category TEXT, subcategory TEXT, metadata TEXT);');
		app.ioModel.db.transaction(app.ioModel.getUsers, app.ioModel.onUsersError, app.ioModel.onUsersSuccess);
		app.ioModel.db.transaction(app.ioModel.getStrings, app.ioModel.onStringsError, app.ioModel.onStringsSuccess);
		app.ioModel.db.transaction(app.ioModel.getAssets, app.ioModel.onAssetsError, app.ioModel.onAssetsSuccess);
	},
    
	getUsers:function(tx) {
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
		$.each(app.assetsCollection.models, function(oind, obj) {
			var keys = [];
			var vals = [];
			$.each(obj.attributes, function(uind, usr) {
				keys.push(uind);
				vals.push(usr);
			});
                    
			tx.executeSql("INSERT INTO assets(" + keys + ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", vals);
		});
	},
    
    
    
	
	selectUsers:function(tx) {
		tx.executeSql("SELECT * FROM users;", [], app.ioModel.userDataSelectHandler, app.ioModel.onUsersError);
	},
	selectStrings:function(tx) {
		tx.executeSql("SELECT * FROM strings;", [], app.ioModel.stringDataSelectHandler, app.ioModel.onStringsError);
	},
	selectAssets:function(tx) {
		tx.executeSql("SELECT * FROM assets;", [], app.ioModel.assetDataSelectHandler, app.ioModel.onAssetsError);
	},
	assetDataSelectHandler:function(transaction, results) {
		var asset_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var asset_model = new AssetsModel(row);
			asset_models.push(asset_model);
		}
		app.assetsCollection = new AssetsCollection(asset_models, {model:AssetsModel});
		app.ioModel.assetsReady = true;
		if (app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady) {
			app.onDataReady();
		}
	},
	stringDataSelectHandler:function(transaction, results) {
		var str_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var str_model = new StringsModel(row);
			str_models.push(str_model);
		}
		app.stringsCollection = new StringsCollection(str_models, {model:StringsModel});
		app.ioModel.stringsReady = true;
		if (app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady) {
			app.onDataReady();
		}
	},
	userDataSelectHandler:function(transaction, results) {
		var usr_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var usr_model = new UserModel(row);
			usr_models.push(usr_model);
		}
		app.usersCollection = new UsersCollection(usr_models, {model:UserModel});
		app.ioModel.usersReady = true;
		if (app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady) {
			app.onDataReady();
		}
	},
 
	onUsersError:function(e) {
		console.log("users error: " + e.message);
	},
	onUsersSuccess:function(e) {
		app.ioModel.usersReady = true;
		if (app.online && app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady) {
			app.onDataReady();
		}
	},
    
	onStringsError:function(e) {
		console.log("strings error: " + e.code);
	},
	onStringsSuccess:function(e) {
		app.ioModel.stringsReady = true;
		if (app.online && app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady) {
			app.onDataReady();
		}
	},
    
	onAssetsError:function(e) {
		console.log("assets error: " + e.message);
	},
	onAssetsSuccess:function(e) {
		app.ioModel.assetsReady = true;
		if (app.online && app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady) {
			app.onDataReady();
		}
	},
    
	nullDataHandler:function(e) {
		console.log("null data: " + e);
	}
});