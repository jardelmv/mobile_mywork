var TaskManager = (function() {
	var instance;

	function createInstance() {
		var dbName = "mywork";
		var pouchDB = PouchDB(dbName);

		return {
			allTasks: function(callback) {
				function map(doc) {
					if (doc.type == 'task') {
						emit(doc, null);
					}
				};

				pouchDB.query({map: map}, {reduce: false}, callback);
			},

			getTask: function(taskId, callback) {
				pouchDB.get(taskId, callback);
			},

			updateTask: function(title, desc, taskId, callback) {
				TaskManager.getInstance().getTask(taskId, function(err, task) {
					if (err) {
						callback(err);
					} else {
						task.title = title;
						task.desc = desc;
						pouchDB.put(task, taskId, callback);
					}
				});
			},

			createTask: function(title, desc, callback) {
				var newTask = {
					type: 'task',
					title: title,
					desc: desc
				};

				pouchDB.post(newTask, callback);
			},

			removeTask: function(taskId, callback) {
				TaskManager.getInstance().getTask(taskId, function(err, task) {
					if (err) {
						callback(err);
					} else {
						pouchDB.remove(task);
						callback(null, task);
					}
				});
			},

			removeAllTasks: function(callback) {
				TaskManager.getInstance().allTasks(function(err, tasks) {
					if (err) {
						callback(err);
					} else {
						removeErr = null;

						tasks.rows.forEach(function(task) {
							TaskManager.getInstance().removeTask(task.id, function(err, task) {
								if (err) {
									removeErr = err;
								}
							});
						});

						callback(removeErr);
					}
				});
			},

			showResult: function(err, result) {
				console.log("ERR>> " + JSON.stringify(err));
				console.log("RES>> " + JSON.stringify(result));
			},

			allDocs: function() {
				pouchDB.allDocs({include_docs: true}, function(err, response) {
					console.log('all docs:');
					console.log(JSON.stringify(response));
					console.log(err);
				});
			},

			syncTasks: function(callback) {
				console.log("start sync tasks");

				var remoteDB = "http://192.168.2.2:5984/mywork_dev";

				var pullComplete = function(err, res) {
					console.log("done pull");
					console.log(res);

					if (err) {
						console.log("err");
						console.log(err);
					} else {
						if (callback) {
							callback(null);
						}
					}
				};

				var pushComplete = function(err, res) {
					console.log("done push");
					console.log(res);

					if (err) {
						console.log(err);
					} else {
						pouchDB.replicate.from(remoteDB, {complete: pullComplete});
					}
				};

				pouchDB.replicate.to(remoteDB, {complete: pushComplete});
			}
		}; // return
	}; // createInstance

	return {
		getInstance: function() {
			if (!instance) {
				instance = createInstance();
			}

			return instance;
		}
	};
})();
