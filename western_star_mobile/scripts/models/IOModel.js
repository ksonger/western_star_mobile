window.IOModel = Backbone.Model.extend({
    
	db:null,
	usersReady:false,
	stringsReady:false,
	assetsReady:false,
    
	
	downloadFile:function() {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.fileSystemSuccess, this.fileSystemFail);
	},
	fileSystemSuccess:function(fileSystem) {
		fileSystem.root.getFile("dummy.html", {create: true, exclusive: false}, app.ioModel.fileEntrySuccess, app.ioModel.fileEntryFail);
	},
	fileSystemFail:function(err) {
		alert("filesystem: " + err);
	},
	fileEntrySuccess:function(fileEntry) {
		var sPath = fileEntry.fullPath.replace("dummy.html", "");
		var fileTransfer = new FileTransfer();
		fileEntry.remove();
		fileTransfer.download(
			"http://www.w3.org/2011/web-apps-ws/papers/Nitobi.pdf",
			sPath + "Nitobi.pdf",
			function(theFile) {
				alert("download complete: " + theFile.toURI());
				showLink(theFile.toURI());
			},
			function(error) {
				alert("download error source " + error.source);
				alert("download error target " + error.target);
				alert("upload error code: " + error.code);
			}
			);
	},
	fileEntryFail:function(err) {
		alert("fileentry: " + err);
	},
    
    
	//Writing operations
    
	createFile: function(fileSystem, fileName, text, onSuccess, onError) { 
		var mdl = this;
		var options = {
			create: true, 
			exclusive: false
		};

		fileSystem.root.getFile(fileName, options,
								function(fileEntry) {
									mdl.createFileWriter.call(mdl, fileEntry, text, onSuccess, onError);
								},
								function (error) {
									error.message = "Failed creating file.";
									onError.call(mdl, error);
								});
	},
    
	createFileWriter: function(fileEntry, text, onSuccess, onError) {
		var mdl = this;
		fileEntry.createWriter(function(fileWriter) {
			var len = fileWriter.length;
			fileWriter.seek(len);
			fileWriter.write(text + '\n');
			var message = "Wrote: " + text;
			onSuccess.call(mdl, message);
		},
							   function(error) {
								   error.message = "Unable to create file writer.";
								   onError.call(mdl, error);
							   });
	},
    
	writeToFile: function(fileName, text, onSuccess, onError) {
		var mdl = this;
		var grantedBytes = 0;

		window.requestFileSystem(LocalFileSystem.PERSISTENT, grantedBytes,
								 function(fileSystem) {
									 mdl.createFile.call(mdl, fileSystem, fileName, text, onSuccess, onError);
								 },
								 function(error) {
									 error.message = "Request file system failed.";
									 onError.call(mdl, error);
								 });
	},
    
	//Reading operations
	readFromFile : function(fileName, onSuccess, onError) {
		var mdl = this;
        
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
								 function(fileSystem) {
									 mdl.getFileEntry.call(mdl, fileSystem, fileName, onSuccess, onError);
								 },
								 function(error) {
									 error.message = "Unable to request file system.";
									 onError.call(mdl, error);
								 });
	},
    
	getFileEntry: function(fileSystem, fileName, onSuccess, onError) {
		var mdl = this;
		// Get existing file, don't create a new one.
		fileSystem.root.getFile(fileName, null,
								function(fileEntry) {
									mdl.getFile.call(mdl, fileEntry, onSuccess, onError);
								}, 
								function(error) {
									error.message = "Unable to get file entry for reading.";
									onError.call(mdl, error);
								});
	},

	getFile: function(fileEntry, onSuccess, onError) { 
		var mdl = this; 
		fileEntry.file(
			function(file) { 
				mdl.getFileReader.call(mdl, file, onSuccess);
			},
			function(error) {
				error.message = "Unable to get file for reading.";
				onError.call(mdl, error);
			});
	},

	getFileReader: function(file, onSuccess) {
		var mdl = this;
		var reader = new FileReader();
		reader.onloadend = function(evt) { 
			var textToWrite = evt.target.result;
			onSuccess.call(mdl, textToWrite);
		};
        
		reader.readAsText(file);
	},
   
	//Deleting
    
	deleteFile: function(fileName, onSuccess, onError) {
		var mdl = this;
       
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
								 function(fileSystem) {
									 mdl.getFileEntryForDelete.call(mdl, fileSystem, fileName, onSuccess, onError);
								 }, function(error) {
									 error.message = "Unable to retrieve file system.";
									 onError.call(mdl, error);
								 });
	}, 
    
	getFileEntryForDelete: function(fileSystem, fileName, onSuccess, onError) { 
		var mdl = this;
		fileSystem.root.getFile(fileName, 
								null, 
								function (fileEntry) {
									mdl.removeFile.call(mdl, fileEntry, onSuccess, onError);
								},
								function(error) {
									error.message = "Unable to find the file.";
									onError.call(mdl, error)
								});
	},
    
	removeFile : function(fileEntry, onSuccess, onError) {
		var mdl = this;
		fileEntry.remove(function (entry) {
			var message = "File removed.";
			onSuccess.call(mdl, message);
		}, function (error) {
			error.message = "Unable to remove the file.";
			onError.call(mdl, error)
		});
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