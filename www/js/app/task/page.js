(function() {
	$(document).on("pageinit", "#task", function(e) {
		var taskManager = TaskManager.getInstance();

		$("#save_btn").off("click").on("click", function(e) {
			console.log("save button clicked");
			e.preventDefault();
			e.stopPropagation();

			var taskId = $("#taskId").val();
			var taskTitle = $("#taskTitle").val();
			var taskDesc = $("#taskDesc").val();

			var callback = function(error, response) {
				console.log("update task");
				console.log(error);
				console.log(response);

				$.mobile.changePage("#overview");
			};

			if (taskId) {
				taskManager.updateTask(taskTitle, taskDesc, taskId, callback);
			} else {
				taskManager.createTask(taskTitle, taskDesc, callback);
			}
		});

		$("#close_btn").off("click").on("click", function(e) {
			console.log("close button clicked");
			e.preventDefault();
			e.stopPropagation();

			var taskId = $("#taskId").val();

			if (taskId) {
				taskManager.removeTask(taskId, function(err, response) {
					console.log("remove task");
					console.log(error);
					console.log("response");

					$.mobile.changePage("#overview");
				});
			} else {
				console.log("change page to overview");
				$.mobile.changePage("#overview");
			}

		});

		$(document).on("pageshow", "#task", function(e) {
			console.log("page show #task");
			e.preventDefault();

			var taskManager = TaskManager.getInstance();

			// - get data from link
			var taskId = ($.mobile.pageData && $.mobile.pageData.taskId) ? $.mobile.pageData.taskId : null;
			console.log('taskId:"' + taskId + '"');

			if (taskId) {
				taskManager.getTask(taskId, function(err, task) {
					$("#taskId").val(task._id);
					$("#taskTitle").val(task.title);
					$("#taskDesc").val(task.desc);
				});	
			} else {
				$("#taskId").val("");
				$("#taskTitle").val("");
				$("#taskDesc").val("");
			}
		});

	});


})();
