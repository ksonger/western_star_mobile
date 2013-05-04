window.IOModel = Backbone.Model.extend({
    
	db:null,
	usersReady:false,
	stringsReady:false,
	assetsReady:false,
    imagesReady:false,
    intCatReady:false,
    intSubCatReady:false,
    intImagesReady:false,
    intNavReady:false,
    
    
	
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
                    
                    app.ioModel.db.transaction(app.ioModel.selectImages, app.ioModel.onImagesError, app.ioModel.onImagesSuccess);
                    app.ioModel.db.transaction(app.ioModel.selectInteriorsCategories, app.ioModel.onInteriorsCategoriesError, app.ioModel.onInteriorsCategoriesSuccess);
                    app.ioModel.db.transaction(app.ioModel.selectInteriorsSubCategories, app.ioModel.onInteriorsSubCategoriesError, app.ioModel.onInteriorsSubCategoriesSuccess);
                    app.ioModel.db.transaction(app.ioModel.selectInteriorsImages, app.ioModel.onInteriorsImagesError, app.ioModel.onInteriorsImagesSuccess);
                    app.ioModel.db.transaction(app.ioModel.selectInteriorsNav, app.ioModel.onInteriorsNavError, app.ioModel.onInteriorsNavSuccess);
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
        tx.executeSql('DROP TABLE IF EXISTS images');
        tx.executeSql('DROP TABLE IF EXISTS interiors_categories');
        tx.executeSql('DROP TABLE IF EXISTS interiors_subcategories');
        tx.executeSql('DROP TABLE IF EXISTS interiors_images');
        tx.executeSql('DROP TABLE IF EXISTS interiors_navigation');
		tx.executeSql('CREATE TABLE IF NOT EXISTS strings(id INTEGER NOT NULL PRIMARY KEY, name TEXT, en TEXT, fr TEXT, dt TEXT, es TEXT, ko TEXT);');
		tx.executeSql('CREATE TABLE IF NOT EXISTS users(id INTEGER NOT NULL PRIMARY KEY, username TEXT, password TEXT, region TEXT);');
		tx.executeSql('CREATE TABLE IF NOT EXISTS assets(id INTEGER NOT NULL PRIMARY KEY, type TEXT, storage TEXT, src TEXT, title TEXT, description TEXT, thumbnail TEXT, category TEXT, subcategory TEXT, metadata TEXT);');
		tx.executeSql('CREATE TABLE IF NOT EXISTS images(key INTEGER NOT NULL PRIMARY KEY, id TEXT, src TEXT);');
        tx.executeSql('CREATE TABLE IF NOT EXISTS interiors_categories(id INTEGER NOT NULL PRIMARY KEY, name TEXT, image TEXT, subcategories TEXT);');
        tx.executeSql('CREATE TABLE IF NOT EXISTS interiors_subcategories(id INTEGER NOT NULL PRIMARY KEY, name TEXT, image TEXT, images TEXT);');
        tx.executeSql('CREATE TABLE IF NOT EXISTS interiors_images(id INTEGER NOT NULL PRIMARY KEY, name TEXT, image TEXT, view TEXT);');
        tx.executeSql('CREATE TABLE IF NOT EXISTS interiors_navigation(id INTEGER NOT NULL PRIMARY KEY, name TEXT, image TEXT, view TEXT);');
        console.log("here??");
        app.ioModel.db.transaction(app.ioModel.getUsers, app.ioModel.onUsersError, app.ioModel.onUsersSuccess);
		app.ioModel.db.transaction(app.ioModel.getStrings, app.ioModel.onStringsError, app.ioModel.onStringsSuccess);
		app.ioModel.db.transaction(app.ioModel.getAssets, app.ioModel.onAssetsError, app.ioModel.onAssetsSuccess);
        
        app.ioModel.db.transaction(app.ioModel.getImages, app.ioModel.onImagesError, app.ioModel.onImagesSuccess);
        app.ioModel.db.transaction(app.ioModel.getInteriorsCategories, app.ioModel.onInteriorsCategoriesError, app.ioModel.onInteriorsCategoriesSuccess);
        app.ioModel.db.transaction(app.ioModel.getInteriorsSubCategories, app.ioModel.onInteriorsSubCategoriesError, app.ioModel.onInteriorsSubCategoriesSuccess);
        app.ioModel.db.transaction(app.ioModel.getInteriorsImages, app.ioModel.onInteriorsImagesError, app.ioModel.onInteriorsImagesSuccess);
        app.ioModel.db.transaction(app.ioModel.getInteriorsNav, app.ioModel.onInteriorsNavError, app.ioModel.onInteriorsNavSuccess);
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
    getImages:function(tx) {
		$.each(app.imagesCollection.models, function(oind, obj) {
			var keys = [];
			var vals = [];
			$.each(obj.attributes, function(uind, usr) {
				keys.push(uind);
				vals.push(usr);
			});
                    
			tx.executeSql("INSERT INTO images(" + keys + ") VALUES (?, ?, ?)", vals);
		});
	},
    getInteriorsCategories:function(tx) {
		$.each(app.interiorsCatCollection.models, function(oind, obj) {
			var keys = [];
			var vals = [];
			$.each(obj.attributes, function(uind, usr) {
				keys.push(uind);
				vals.push(usr);
			});
                    
			tx.executeSql("INSERT INTO images(" + keys + ") VALUES (?, ?, ?, ?)", vals);
		});
	},
    getInteriorsSubCategories:function(tx) {
		$.each(app.interiorsSubCatCollection.models, function(oind, obj) {
			var keys = [];
			var vals = [];
			$.each(obj.attributes, function(uind, usr) {
				keys.push(uind);
				vals.push(usr);
			});
                    
			tx.executeSql("INSERT INTO images(" + keys + ") VALUES (?, ?, ?, ?)", vals);
		});
	},
    getInteriorsImages:function(tx) {
		$.each(app.interiorsSubCatCollection.models, function(oind, obj) {
			var keys = [];
			var vals = [];
			$.each(obj.attributes, function(uind, usr) {
				keys.push(uind);
				vals.push(usr);
			});
                    
			tx.executeSql("INSERT INTO images(" + keys + ") VALUES (?, ?, ?, ?)", vals);
		});
	},
    getInteriorsNav:function(tx) {
		$.each(app.interiorsSubCatCollection.models, function(oind, obj) {
			var keys = [];
			var vals = [];
			$.each(obj.attributes, function(uind, usr) {
				keys.push(uind);
				vals.push(usr);
			});
                    
			tx.executeSql("INSERT INTO images(" + keys + ") VALUES (?, ?, ?, ?)", vals);
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
    selectImages:function(tx) {
		tx.executeSql("SELECT * FROM images;", [], app.ioModel.imagesDataSelectHandler, app.ioModel.onImagesError);
	},
    selectInteriorsCategories:function(tx) {
		tx.executeSql("SELECT * FROM interiors_categories;", [], app.ioModel.interiorsCategoriesDataSelectHandler, app.ioModel.onInteriorsCategoriesError);
	},
    selectInteriorsImages:function(tx) {
		tx.executeSql("SELECT * FROM interiors_images;", [], app.ioModel.interiorsImagesDataSelectHandler, app.ioModel.onInteriorsImagesError);
	},
    selectInteriorsSubCategories:function(tx) {
		tx.executeSql("SELECT * FROM interiors_subcategories;", [], app.ioModel.interiorsSubCategoriesDataSelectHandler, app.ioModel.onInteriorsSubCategoriesError);
	},
    selectAssets:function(tx) {
		tx.executeSql("SELECT * FROM interiors_navigation;", [], app.ioModel.interiorsNavDataSelectHandler, app.ioModel.onInteriorsNavError);
	},
    imagesDataSelectHandler:function(transaction, results) {
		var images_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var images_model = new ImagesModel(row);
			images_models.push(image_model);
		}
		app.imagesCollection = new ImagesCollection(image_models, {model:ImagesModel});
		app.ioModel.imagesReady = true;
		if (app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady && app.ioModel.imagesReady && app.ioModel.intCatReady && app.ioModel.intSubcatReady && app.ioModel.intImagesReady && app.ioModel.intNavReady) {
			app.onDataReady();
		}
	},
    interiorsCategoriesDataSelectHandler:function(transaction, results) {
		var intcat_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var intcat_model = new InteriorsCatModel(row);
			intcat_models.push(intcat_model);
		}
		app.interiorsCatCollection = new InteriorsCatCollection(intcat_models, {model:InteriorsCatModel});
		app.ioModel.intCatReady = true;
		if (app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady && app.ioModel.imagesReady && app.ioModel.intCatReady && app.ioModel.intSubcatReady && app.ioModel.intImagesReady && app.ioModel.intNavReady) {
			app.onDataReady();
		}
	},
    interiorsSubCategoriesDataSelectHandler:function(transaction, results) {
		var intsubcat_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var intsubcat_model = new InteriorsSubCatModel(row);
			intsubcat_models.push(intsubcat_model);
		}
		app.interiorsSubCatCollection = new InteriorsSubCatCollection(intsubcat_models, {model:InteriorsSubCatModel});
		app.ioModel.intSubcatReady = true;
		if (app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady && app.ioModel.imagesReady && app.ioModel.intCatReady && app.ioModel.intSubcatReady && app.ioModel.intImagesReady && app.ioModel.intNavReady) {
			app.onDataReady();
		}
	},
    interiorsImagesDataSelectHandler:function(transaction, results) {
		var intimages_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var intimages_model = new InteriorsImagesModel(row);
			intimages_models.push(intimages_model);
		}
		app.interiorsImagesCollection = new InteriorsImagesCollection(intimages_models, {model:InteriorsImagesModel});
		app.ioModel.intImagesReady = true;
		if (app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady && app.ioModel.imagesReady && app.ioModel.intCatReady && app.ioModel.intSubcatReady && app.ioModel.intImagesReady && app.ioModel.intNavReady) {
			app.onDataReady();
		}
	},
    interiorsNavDataSelectHandler:function(transaction, results) {
		var intnav_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var intnav_model = new InteriorsNavModel(row);
			intnav_models.push(intnav_model);
		}
		app.interiorsNavCollection = new InteriorsNavCollection(intnav_models, {model:InteriorsNavModel});
		app.ioModel.intNavReady = true;
		if (app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady && app.ioModel.imagesReady && app.ioModel.intCatReady && app.ioModel.intSubcatReady && app.ioModel.intImagesReady && app.ioModel.intNavReady) {
			app.onDataReady();
		}
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
    
    onImagesError:function(e) {
		console.log("images error: " + e.message);
	},
	onImagesSuccess:function(e) {
		app.ioModel.imagesReady = true;
		if (app.online && app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady && app.ioModel.imagesReady && app.ioModel.intCatReady && app.ioModel.intSubcatReady && app.ioModel.intImagesReady && app.ioModel.intNavReady) {
			app.onDataReady();
		}
	},
    onInteriorsCategoriesError:function(e) {
		console.log("interiors categories error: " + e.message);
	},
	onInteriorsCategoriesSuccess:function(e) {
		app.ioModel.intCatReady = true;
		if (app.online && app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady && app.ioModel.imagesReady && app.ioModel.intCatReady && app.ioModel.intSubcatReady && app.ioModel.intImagesReady && app.ioModel.intNavReady) {
			app.onDataReady();
		}
	},
    onInteriorsSubCategoriesError:function(e) {
		console.log("interiors subcategories error: " + e.message);
	},
	onInteriorsSubCategoriesSuccess:function(e) {
		app.ioModel.intSubcatReady = true;
		if (app.online && app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady && app.ioModel.imagesReady && app.ioModel.intCatReady && app.ioModel.intSubcatReady && app.ioModel.intImagesReady && app.ioModel.intNavReady) {
			app.onDataReady();
		}
	},
    onInteriorsImagesError:function(e) {
		console.log("interiors images error: " + e.message);
	},
	onInteriorsImagesSuccess:function(e) {
		app.ioModel.intImagesReady = true;
		if (app.online && app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady && app.ioModel.imagesReady && app.ioModel.intCatReady && app.ioModel.intSubcatReady && app.ioModel.intImagesReady && app.ioModel.intNavReady) {
			app.onDataReady();
		}
	},
    onInteriorsNavError:function(e) {
		console.log("interiors nav error: " + e.message);
	},
	onInteriorsNavSuccess:function(e) {
		app.ioModel.intNavReady = true;
		if (app.online && app.ioModel.usersReady && app.ioModel.stringsReady && app.ioModel.assetsReady && app.ioModel.imagesReady && app.ioModel.intCatReady && app.ioModel.intSubcatReady && app.ioModel.intImagesReady && app.ioModel.intNavReady) {
			app.onDataReady();
		}
	},
    
	nullDataHandler:function(e) {
		console.log("null data: " + e);
	}
});