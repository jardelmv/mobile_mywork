var controller = {
	database: null,

	init: function() {
		controller.database = PouchDB('mywork');
	},

	allTasks: function(callback) {
		function map(doc) {
			if (doc.type == 'task') {
				emit(doc, null);
			}
		};

		controller.database.query({map: map}, {reduce: false}, callback);
	},

	getTask: function(taskId, callback) {
		controller.database.get(taskId, callback);
	},

	updateTask: function(task, taskId, callback) {
		controller.database.put(task, taskId, callback);
	},

	createTask: function(task, callback) {
		controller.database.post(task, callback);
	},

	allDocs: function() {
		controller.database.allDocs({include_docs: true}, function(err, response) {
			console.log('all docs:');
			console.log(JSON.stringify(response));
			console.log(err);
		});
	}
};