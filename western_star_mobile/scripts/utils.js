tpl = {

	// Hash of preloaded templates for the app
	templates:{},

	// Recursively pre-load all the templates for the app.
	// This implementation should be changed in a production environment. All the template files should be
	// concatenated in a single file.
	loadTemplates:function (names, callback) {
		var that = this;

		var loadTemplate = function (index) {
			var name = names[index];
			$.ajax({
				url: 'tpl/' + name + '.html',

				beforeSend: function(xhr) {
					xhr.overrideMimeType('text/plain; charset=x-user-defined');
				},
				success: function(data) {
					that.templates[name] = data;
					index++;
					if (index < names.length) {
						loadTemplate(index);
					}
					else {
						callback();
					}
				},
				error: function() {
					if (console && console.log) {
						console.log('Error loading template.');
					}
				}
			});
		}

		loadTemplate(0);
	},

	// Get template by name from hash of preloaded templates
	get:function (name) {
		return this.templates[name];
	}

};