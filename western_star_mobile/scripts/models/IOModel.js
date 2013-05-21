window.IOModel = Backbone.Model.extend({
    
	db:null,
	usersReady:false,
	stringsReady:false,
	assetsReady:false,
	imagesReady:false,
	menusReady:true,
	intCatReady:false,
	intSubCatReady:false,
	intImagesReady:false,
	intNavReady:false,
	currentDownload:null,
	firstLoad:false,
	assetsToLoad:0,
	assetsLoaded:0,
	assetLoadErrors:0,
	localAssetsArray:[],
	localThumbnailsArray:[],
	localCollection:null,
    	
	downloadAllFiles:function() {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.fileSystemSuccess, this.fileSystemFail);
	},
	fileSystemSuccess:function(fileSystem) {
		fileSystem.root.getFile("dummy.html", {create: true, exclusive: false}, app.ioModel.fileEntrySuccess, app.ioModel.fileEntryFail);
	},
	fileSystemFail:function(err) {
		//alert("filesystem: " + err);
		app.onDataReady();
	},
    
	fileEntrySuccess:function(fileEntry) {
		var sPath = fileEntry.fullPath.replace("dummy.html", "");
		var fileTransfer = new FileTransfer();
		fileEntry.remove();
		var fileArr = app.ioModel.currentDownload.get("src").split("/");
		fileTransfer.download(
			app.assets_server + app.ioModel.currentDownload.get("src"),
			sPath + fileArr[fileArr.length - 1],
			function(theFile) {
				//alert("download complete: " + theFile.toURI());
				// are we downloading the whole bulk set?
				if (app.ioModel.firstLoad) {
					app.ioModel.assetsLoaded++; 
					if (app.ioModel.localCollection == app.assetsCollection) {
						var vals = [
							app.ioModel.currentDownload.get("id"), 
							app.ioModel.currentDownload.get("type"), 
							theFile.toURI(), 
							app.ioModel.currentDownload.get("title"), 
							app.ioModel.currentDownload.get("description"), 
							app.ioModel.currentDownload.get("thumbnail"), 
							app.ioModel.currentDownload.get("metadata")
						]
						var aObj = {"id":vals[0], "type":vals[1], "src":vals[2], "title":vals[3], "description":vals[4], "thumbnail":vals[5], "metadata":vals[6]};
						app.ioModel.localAssetsArray.push(aObj);
					}
					if (app.ioModel.localCollection == app.thumbnailsCollection) {
						var vals = [
							app.ioModel.currentDownload.get("id"),  
							theFile.toURI()
						]
						var tObj = {"id":vals[0], "src":vals[1]};
						app.ioModel.localThumbnailsArray.push(tObj);
					}
					
					if (app.ioModel.assetsLoaded < app.ioModel.assetsToLoad) {
						app.ioModel.currentDownload = app.ioModel.localCollection.models[app.ioModel.assetsLoaded];
						app.ioModel.downloadAllFiles();
					}
					else {
						if (app.ioModel.localCollection == app.assetsCollection) {
							app.localAssetsCollection.models = app.ioModel.localAssetsArray;
							app.ioModel.populateLocalAssetsTable();
						}
						if (app.ioModel.localCollection == app.thumbnailsCollection) {
							app.localThumbnailsCollection.models = app.ioModel.localThumbnailsArray;
							app.ioModel.populateLocalThumbnailsTable();
						}
					}
				}
			},
			function(error) {
				alert("download error source " + error.source);
				alert("download error target " + error.target);
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
					// For debug in in simulator fallback to native SQL Lite
					this.db = window.openDatabase(shortName, version, displayName, maxSize);
				}	
				if (app.online) {
					this.db.transaction(this.createTables, this.onDBError, this.onDBSuccess);
				}
				else {
					app.ioModel.db.transaction(app.ioModel.selectUsers, app.ioModel.onUsersError, app.ioModel.onUsersSuccess);
					app.ioModel.db.transaction(app.ioModel.selectStrings, app.ioModel.onStringsError, app.ioModel.onStringsSuccess);
					app.ioModel.db.transaction(app.ioModel.selectAssets, app.ioModel.onAssetsError, app.ioModel.onAssetsSuccess); 
					app.ioModel.db.transaction(app.ioModel.selectLocalAssets, app.ioModel.onLocalAssetsError, app.ioModel.onLocalAssetsSuccess); 
					app.ioModel.db.transaction(app.ioModel.selectLocalThumbnails, app.ioModel.onLocalThumbnailsError, app.ioModel.onLocalThumbnailsSuccess); 
					app.ioModel.db.transaction(app.ioModel.selectImages, app.ioModel.onImagesError, app.ioModel.onImagesSuccess);
					app.ioModel.db.transaction(app.ioModel.selectMenus, app.ioModel.onMenusError, app.ioModel.onMenusSuccess);
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
		// FOR TESTING ONLY
		//tx.executeSql('DROP TABLE IF EXISTS local_assets');
		tx.executeSql('DROP TABLE IF EXISTS strings');
		tx.executeSql('DROP TABLE IF EXISTS users');
		tx.executeSql('DROP TABLE IF EXISTS assets');
		tx.executeSql('DROP TABLE IF EXISTS thumbnails');
		tx.executeSql('DROP TABLE IF EXISTS images');
		tx.executeSql('DROP TABLE IF EXISTS library_menu');
		tx.executeSql('DROP TABLE IF EXISTS interiors_categories');
		tx.executeSql('DROP TABLE IF EXISTS interiors_subcategories');
		tx.executeSql('DROP TABLE IF EXISTS interiors_images');
		tx.executeSql('DROP TABLE IF EXISTS interiors_navigation');
        
		tx.executeSql('CREATE TABLE strings(id INTEGER NOT NULL PRIMARY KEY, name TEXT, en TEXT, fr TEXT, dt TEXT, es TEXT, ko TEXT);');
		tx.executeSql('CREATE TABLE users(id INTEGER NOT NULL PRIMARY KEY, username TEXT, password TEXT, region TEXT);');
		tx.executeSql('CREATE TABLE assets(id INTEGER NOT NULL PRIMARY KEY, type TEXT, src TEXT, title TEXT, description TEXT, thumbnail TEXT, metadata TEXT);');
		tx.executeSql('CREATE TABLE thumbnails(id INTEGER NOT NULL PRIMARY KEY, src TEXT);');
		tx.executeSql('CREATE TABLE images(key INTEGER NOT NULL PRIMARY KEY, id TEXT, src TEXT);');
		tx.executeSql('CREATE TABLE library_menu(id INTEGER NOT NULL PRIMARY KEY, text TEXT, value TEXT, position INTEGER, child_id_set TEXT);');
		tx.executeSql('CREATE TABLE interiors_categories(id INTEGER NOT NULL PRIMARY KEY, name TEXT, image TEXT, title TEXT, subcategories TEXT);');
		tx.executeSql('CREATE TABLE interiors_subcategories(id INTEGER NOT NULL PRIMARY KEY, name TEXT, image TEXT, images TEXT, swatch TEXT, nav_ids TEXT);');
		tx.executeSql('CREATE TABLE interiors_images(id INTEGER NOT NULL PRIMARY KEY, name TEXT, image TEXT, view TEXT);');
		tx.executeSql('CREATE TABLE interiors_navigation(id INTEGER NOT NULL PRIMARY KEY, name TEXT, image TEXT, view TEXT);');
        
		// AN INDICATOR IF THIS IS FIRST RUN
		tx.executeSql('CREATE TABLE IF NOT EXISTS local_assets(id INTEGER NOT NULL PRIMARY KEY, type TEXT, src TEXT, title TEXT, description TEXT, thumbnail TEXT, metadata TEXT);');
        
		tx.executeSql('CREATE TABLE IF NOT EXISTS local_thumbnails(id INTEGER NOT NULL PRIMARY KEY, src TEXT);');

		app.ioModel.db.transaction(app.ioModel.getUsers, app.ioModel.onUsersError, app.ioModel.onUsersSuccess);
		app.ioModel.db.transaction(app.ioModel.getStrings, app.ioModel.onStringsError, app.ioModel.onStringsSuccess);
		app.ioModel.db.transaction(app.ioModel.getAssets, app.ioModel.onAssetsError, app.ioModel.onAssetsSuccess);
		app.ioModel.db.transaction(app.ioModel.getThumbnails, app.ioModel.onThumbnailsError, app.ioModel.onThumbnailsSuccess);
		app.ioModel.db.transaction(app.ioModel.getImages, app.ioModel.onImagesError, app.ioModel.onImagesSuccess);
		app.ioModel.db.transaction(app.ioModel.getMenus, app.ioModel.onMenusError, app.ioModel.onMenusSuccess);
		app.ioModel.db.transaction(app.ioModel.getInteriorsCategories, app.ioModel.onInteriorsCategoriesError, app.ioModel.onInteriorsCategoriesSuccess);
		app.ioModel.db.transaction(app.ioModel.getInteriorsSubCategories, app.ioModel.onInteriorsSubCategoriesError, app.ioModel.onInteriorsSubCategoriesSuccess);
		app.ioModel.db.transaction(app.ioModel.getInteriorsImages, app.ioModel.onInteriorsImagesError, app.ioModel.onInteriorsImagesSuccess);
		app.ioModel.db.transaction(app.ioModel.getInteriorsNav, app.ioModel.onInteriorsNavError, app.ioModel.onInteriorsNavSuccess);
        
		// CHECK TO SEE IF local_assets RETURNS ANY ROWS.  THIS SHOULD INDICATE FIRST TIME CREATION.
		app.ioModel.db.transaction(app.ioModel.checkLocalAssetsLength, app.ioModel.checkError, app.ioModel.checkSuccess);
	},
    
	checkError:function(err) {
		alert("check error: " + err.message);
	},
	checkSuccess:function() {
		//alert("check success");  
	},   
    
	checkLocalAssetsLength:function(tx) {       
		tx.executeSql("SELECT * FROM local_assets;", [], app.ioModel.checkLocalAssetsLengthSuccess, app.ioModel.checkLocalAssetsLengthError);	
	},
	checkLocalAssetsLengthError:function(err) {
		//alert("error trying to determine the length of local_assets table");
	},
	checkLocalAssetsLengthSuccess:function(transaction, results) {
		if (results == undefined || results.rows.length == 0) {
			//alert("no results from local_assets, trying to load all assets");
			if (!app.online) {
				//alert("the application must be run online when launching for the first time");
			}
			else {
				app.ioModel.assetsLoaded = 0;
				app.ioModel.assetsToLoad = app.assetsCollection.models.length;
				//alert("there are " + app.ioModel.assetsToLoad + " total assets.");
				app.ioModel.firstLoad = true;
				//alert("app.ioModel.firstLoad has been set to: " + app.ioModel.firstLoad);
				// Set current download to the first model in the collection.
				// We will increment this number and loop until assetsLoaded == assetsToLoad
				app.ioModel.currentDownload = app.assetsCollection.models[app.ioModel.assetsLoaded];
				// Okay, kick of the looping process
				app.ioModel.localCollection = app.assetsCollection;
				app.ioModel.downloadAllFiles();
			}
		}
		else {
			//alert("This is not the first time the app has loaded, there are: " + results.rows.length + " local assets.");
			app.ioModel.db.transaction(app.ioModel.selectLocalAssets, app.ioModel.onLocalAssetsError, app.ioModel.onLocalAssetsSuccess); 
		}
	},
	checkAssetsChanged:function() {
		if (app.online) {
			//alert("checking for changed assets");
			//app.onDataReady();
		}
		// CHECK TO SEE IF local_thumbnails RETURNS ANY ROWS. 
		app.ioModel.db.transaction(app.ioModel.checkLocalThumbnailsLength, app.ioModel.checkError, app.ioModel.checkSuccess);
	},
    
	populateLocalAssetsTable:function() {
		app.ioModel.db.transaction(app.ioModel.getLocalAssets, app.ioModel.onLocalAssetsError, app.ioModel.onLocalAssetsSuccess);
	},

    
	getLocalAssets:function(tx) {
		$.each(app.localAssetsCollection.models, function(oind, obj) {
			var keys = ['id', 'type', 'src', 'title', 'description', 'thumbnail', 'metadata'];
			var vals = [parseInt(obj.id), String(obj.type), String(obj.src), String(obj.title), String(obj.description), String(obj.thumbnail), String(obj.metadata)];
			tx.executeSql("INSERT INTO local_assets(" + keys + ") VALUES (?, ?, ?, ?, ?, ?, ?)", vals);
		});	
	},
    
    
    
    
    
    
	checkLocalThumbnailsLength:function(tx) {       
		tx.executeSql("SELECT * FROM local_thumbnails;", [], app.ioModel.checkLocalThumbnailsLengthSuccess, app.ioModel.checkLocalThumbnailsLengthError);	
	},
	checkLocalThumbnailsLengthError:function(err) {
		//alert("error trying to determine the length of local_thumbnails table");
	},
	checkLocalThumbnailsLengthSuccess:function(transaction, results) {
		if (results == undefined || results.rows.length == 0) {
			alert("no results from local_thumbnails, trying to load all thumbnails");
			if (!app.online) {
				alert("the application must be run online when launching for the first time");
			}
			else {
				app.ioModel.assetsLoaded = 0;
				app.ioModel.assetsToLoad = app.thumbnailsCollection.models.length;
				alert("there are " + app.ioModel.assetsToLoad + " total thumbnails.");
				app.ioModel.firstLoad = true;
				//alert("app.ioModel.firstLoad has been set to: " + app.ioModel.firstLoad);
				// Set current download to the first model in the collection.
				// We will increment this number and loop until assetsLoaded == assetsToLoad
				app.ioModel.localCollection = app.thumbnailsCollection;
				app.ioModel.currentDownload = app.thumbnailsCollection.models[app.ioModel.assetsLoaded];
				// Okay, kick of the looping process
				app.ioModel.downloadAllFiles();
			}
		}
		else {
			//alert("This is not the first time the app has loaded, there are: " + results.rows.length + " local thumbnails.");
			app.ioModel.db.transaction(app.ioModel.selectLocalThumbnails, app.ioModel.onLocalThumbnailsError, app.ioModel.onLocalThumbnailsSuccess); 
		}
	},
	checkThumbnailsChanged:function() {
		if (app.online) {
			//alert("checking for changed thumbnails");
			app.onDataReady();
		}
		else {
			app.onDataReady();
		}		
	},
    
	populateLocalThumbnailsTable:function() {
		app.ioModel.db.transaction(app.ioModel.getLocalThumbnails, app.ioModel.onLocalThumbnailsError, app.ioModel.onLocalThumbnailsSuccess);
	},

    
	getLocalThumbnails:function(tx) {

			$.each(app.localThumbnailsCollection.models, function(oind, obj) {
				var keys = ['id', 'src'];
				var vals = [parseInt(obj.id), String(obj.src)];
				tx.executeSql("INSERT INTO local_thumbnails(" + keys + ") VALUES (?, ?)", vals);
			});	

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
                    
			tx.executeSql("INSERT INTO assets(" + keys + ") VALUES (?, ?, ?, ?, ?, ?, ?)", vals);
		});
	},
	getThumbnails:function(tx) {
		$.each(app.thumbnailsCollection.models, function(oind, obj) {
			var keys = [];
			var vals = [];
			$.each(obj.attributes, function(uind, usr) {
				keys.push(uind);
				vals.push(usr);
			});
                    
			tx.executeSql("INSERT INTO thumbnails(" + keys + ") VALUES (?, ?)", vals);
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
    
	getMenus:function(tx) {
		var dupe = false;
		var ids = [];
		var t_ids = [];
		$.each(app.menuCollection.models, function(oind, obj) {
			$.each(obj.get("primary_nav"), function(ind, pmenu) {
				var p_list = [parseInt(pmenu.id), pmenu.text, pmenu.value, parseInt(pmenu.position), pmenu.child_id_set];
				tx.executeSql("INSERT INTO library_menu( id, text, value, position, child_id_set) VALUES (?, ?, ?, ?, ?)", p_list);
				$.each(pmenu.child_menus, function(sind, smenu) {
					dupe = false;
					$.each(ids, function(dind, del) {
						if (del == parseInt(smenu.id)) {
							dupe = true;
						}
					});
					if (!dupe) {
						ids.push(parseInt(smenu.id));
						var s_list = [parseInt(smenu.id), String(smenu.text), String(smenu.value), parseInt(smenu.position), String(smenu.child_id_set)];
						tx.executeSql("INSERT INTO library_menu( id, text, value, position, child_id_set) VALUES (?, ?, ?, ?, ?)", s_list);
						$.each(smenu.child_menus, function(tind, tmenu) {
							dupe = false;
							$.each(t_ids, function(tind, tel) {
								if (tel == parseInt(tmenu.id)) {
									dupe = true;
								}
							});
							if (!dupe) {
								t_ids.push(parseInt(tmenu.id));
								var t_list = [parseInt(tmenu.id), String(tmenu.text), String(tmenu.value), parseInt(tmenu.position), String(tmenu.child_id_set)];
								tx.executeSql("INSERT INTO library_menu( id, text, value, position, child_id_set) VALUES (?, ?, ?, ?, ?)", t_list);
							}
						});
					}
				});
			});
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
                    
			tx.executeSql("INSERT INTO interiors_categories(" + keys + ") VALUES (?, ?, ?, ?, ?)", vals);
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
                    
			tx.executeSql("INSERT INTO interiors_subcategories(" + keys + ") VALUES (?, ?, ?, ?, ?, ?)", vals);
		});
	},
	getInteriorsImages:function(tx) {
		$.each(app.interiorsImagesCollection.models, function(oind, obj) {
			var keys = [];
			var vals = [];
			$.each(obj.attributes, function(uind, usr) {
				keys.push(uind);
				vals.push(usr);
			});
                    
			tx.executeSql("INSERT INTO interiors_images(" + keys + ") VALUES (?, ?, ?, ?)", vals);
		});
	},
	getInteriorsNav:function(tx) {
		$.each(app.interiorsNavCollection.models, function(oind, obj) {
			var keys = [];
			var vals = [];
			$.each(obj.attributes, function(uind, usr) {
				keys.push(uind);
				vals.push(usr);
			});
                    
			tx.executeSql("INSERT INTO interiors_navigation(" + keys + ") VALUES (?, ?, ?, ?)", vals);
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
	selectLocalAssets:function(tx) {
		tx.executeSql("SELECT * FROM local_assets;", [], app.ioModel.localAssetsDataSelectHandler, app.ioModel.onLocalAssetsError);
	},
	selectLocalThumbnails:function(tx) {
		tx.executeSql("SELECT * FROM local_thumbnails;", [], app.ioModel.localThumbnailsDataSelectHandler, app.ioModel.onLocalThumbnailsError);
	},
	selectImages:function(tx) {
		tx.executeSql("SELECT * FROM images;", [], app.ioModel.imagesDataSelectHandler, app.ioModel.onImagesError);
	},
	selectMenus:function(tx) {
		tx.executeSql("SELECT * FROM library_menu;", [], app.ioModel.menusDataSelectHandler, app.ioModel.onMenusError);
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
	selectInteriorsNav:function(tx) {
		tx.executeSql("SELECT * FROM interiors_navigation;", [], app.ioModel.interiorsNavDataSelectHandler, app.ioModel.onInteriorsNavError);
	},
	imagesDataSelectHandler:function(transaction, results) {
		var images_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var image_model = new ImagesModel(row);
			images_models.push(image_model);
		}
		app.imagesCollection = new ImagesCollection(images_models, {model:ImagesModel});
	},
	menusDataSelectHandler:function(transaction, results) {
		var menuObj = {};
		menuObj.primary_nav = [];
        
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var menu_model = new MenuModel(row);
			menuObj.primary_nav.push(menu_model);
		}
		$.each(menuObj.primary_nav, function(ind, el) {
			el.child_menus = [];
			app.ioModel.db.transaction(function(tx) {
				var stmt = "SELECT * FROM library_menu WHERE id IN(" + el.get("child_id_set") + ");";
				tx.executeSql(stmt, [], function(trans, re) { 
					for (var i = 0; i < re.rows.length; i++) {
						var row = re.rows.item(i);
						el.child_menus.push(row); 
						var stmt2 = "SELECT * FROM library_menu WHERE id IN(" + row.child_id_set + ");";
						tx.executeSql(stmt2, [], function(trans2, re2) { 
							el.child_menus[el.child_menus.length - 1].child_menus = [];
							for (var j = 0; j < re2.rows.length; j++) {
								var row2 = re2.rows.item(j);
								el.child_menus[el.child_menus.length - 1].child_menus.push(row2);
							}
						}, function(e) {
							console.log(e);
						});
					}
				}, function(e) {
					console.log(e);
				});
			}, function(e) {
				console.log(e);
			}, function() {
				//console.log("success");
			});
		});
	},
	interiorsCategoriesDataSelectHandler:function(transaction, results) {
		var intcat_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var intcat_model = new InteriorsCatModel(row);
			intcat_models.push(intcat_model);
		}
		app.interiorsCatCollection = new InteriorsCatCollection(intcat_models, {model:InteriorsCatModel});
	},
	interiorsSubCategoriesDataSelectHandler:function(transaction, results) {
		var intsubcat_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var intsubcat_model = new InteriorsSubCatModel(row);
			intsubcat_models.push(intsubcat_model);
		}
		app.interiorsSubCatCollection = new InteriorsSubCatCollection(intsubcat_models, {model:InteriorsSubCatModel});
	},
	interiorsImagesDataSelectHandler:function(transaction, results) {
		var intimages_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var intimages_model = new InteriorsImagesModel(row);
			intimages_models.push(intimages_model);
		}
		app.interiorsImagesCollection = new InteriorsImagesCollection(intimages_models, {model:InteriorsImagesModel});
	},
	interiorsNavDataSelectHandler:function(transaction, results) {
		var intnav_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var intnav_model = new InteriorsNavModel(row);
			intnav_models.push(intnav_model);
		}
		app.interiorsNavCollection = new InteriorsNavCollection(intnav_models, {model:InteriorsNavModel});
	},
	assetDataSelectHandler:function(transaction, results) {
		var asset_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var asset_model = new AssetsModel(row);
			asset_models.push(asset_model);
		}
		app.assetsCollection = new AssetsCollection(asset_models, {model:AssetsModel});
	},
	localAssetsDataSelectHandler:function(transaction, results) {
		//alert('localAssetsDataSelectHandler');
		var local_asset_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var local_asset_model = new LocalAssetsModel(row);
			local_asset_models.push(local_asset_model);
		}
		app.localAssetsCollection = new LocalAssetsCollection(local_asset_models, {model:LocalAssetsModel});
		app.ioModel.checkAssetsChanged();
	},
	localThumbnailsDataSelectHandler:function(transaction, results) {
		var local_thumbnail_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var local_thumbnail_model = new LocalThumbnailsModel(row);
			local_thumbnail_models.push(local_thumbnail_model);
		}
		app.localThumbnailsCollection = new LocalThumbnailsCollection(local_thumbnail_models, {model:LocalThumbnailsModel}); 
		app.ioModel.checkThumbnailsChanged();
	},
	stringDataSelectHandler:function(transaction, results) {
		var str_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var str_model = new StringsModel(row);
			str_models.push(str_model);
		}
		app.stringsCollection = new StringsCollection(str_models, {model:StringsModel});
	},
	userDataSelectHandler:function(transaction, results) {
		var usr_models = [];
		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows.item(i);
			var usr_model = new UserModel(row);
			usr_models.push(usr_model);
		}
		app.usersCollection = new UsersCollection(usr_models, {model:UserModel});
	},
 
	onUsersError:function(e) {
		console.log("users error: " + e.message);
	},
	onUsersSuccess:function() {
		app.ioModel.usersReady = true;
	},
    
	onStringsError:function(e) {
		console.log("strings error: " + e.code);
	},
	onStringsSuccess:function() {
		app.ioModel.stringsReady = true;
	},
    
	onAssetsError:function(e) {
		console.log("assets error: " + e.message);
	},
	onAssetsSuccess:function() {
		app.ioModel.assetsReady = true;
	},
    
	onThumbnailsError:function(e) {
		console.log("thumbnails error: " + e.message);
	},
	onThumbnailsSuccess:function() {
		app.ioModel.thumbnailsReady = true;
	},
    
	onLocalAssetsError:function(e) {
		alert("local local thumbnails error: " + e.message);
	},
	onLocalAssetsSuccess:function() {
		app.ioModel.localAssetsReady = true;
	},
	onLocalAssetsSelectedSuccess:function() {
		//alert("onLocalAssetsSelectedSuccess");
	},
    
	onLocalThumbnailsError:function(e) {
		alert("local thumbnails error: " + e.message);
	},
	onLocalAssetsSuccess:function() {
		app.ioModel.localThumbnailsReady = true;
	},
    
	onImagesError:function(e) {
		console.log("images error: " + e.message);
	},
	onImagesSuccess:function() {
		app.ioModel.imagesReady = true;
	},
    
	onMenusError:function(e) {
		console.log("menus error: " + e.message);
	},
	onMenusSuccess:function() {
		app.ioModel.menusReady = true;
	},
    
	onInteriorsCategoriesError:function(e) {
		console.log("interiors categories error: " + e.message);
	},
	onInteriorsCategoriesSuccess:function() {
		app.ioModel.intCatReady = true;
	},
	onInteriorsSubCategoriesError:function(e) {
		console.log("interiors subcategories error: " + e.message);
	},
	onInteriorsSubCategoriesSuccess:function() {
		app.ioModel.intSubCatReady = true;
	},
	onInteriorsImagesError:function(e) {
		console.log("interiors images error: " + e.message);
	},
	onInteriorsImagesSuccess:function() {
		app.ioModel.intImagesReady = true;
	},
	onInteriorsNavError:function(e) {
		console.log("interiors nav error: " + e.message);
	},
	onInteriorsNavSuccess:function() {
		app.ioModel.intNavReady = true;
	},
    
	checkLibraryAssets:function() {
		console.log("here?");
		app.onDataReady();
	},
    
    
	nullDataHandler:function(e) {
		console.log("null data: " + e);
	},
	modelsReady:function() {
		if (
			app.ioModel.menusReady && 
			app.ioModel.usersReady && 
			app.ioModel.stringsReady && 
			app.ioModel.assetsReady && 
			app.ioModel.imagesReady && 
			app.ioModel.intCatReady && 
			app.ioModel.intSubCatReady && 
			app.ioModel.intImagesReady && 
			app.ioModel.intNavReady) {
			return true;
		}
		else {
			return false;
		}
	}
});