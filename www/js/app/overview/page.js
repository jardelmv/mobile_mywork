(function() {

	$(document).on("pageinit", "#overview", function(e) {
		console.log("pageinit #overview");
		$("removeAllTasks").button();

		var taskManager = TaskManager.getInstance();

		function showTaskList() {
			taskManager.allTasks(function(err, tasks) {
				$('#taskListView').empty();

				if (jQuery.isEmptyObject(tasks.rows)) {
					$("<li>No tasks available</li>").appendTo("#taskListView");
				} else {
					tasks.rows.forEach(function(task) {
						$("<li><a href='#task?taskId=" + task.id + "'>" +  task.key.title + "</a></li>").appendTo("#taskListView");
					});
				}

				$("#taskListView").listview('refresh');
			});
		};

		$("#remove_all_tasks_btn").on("click", function(e) {
			console.log("remove all task clicked");
			e.preventDefault();
			e.stopPropagation();

			taskManager.removeAllTasks(function (err) {
				console.log("ERR>>>" + JSON.stringify(err));
				showTaskList();
			});
		});

		$("#new_task_btn").on("click", function(e) {
			console.log("new task button clicked.");
			e.preventDefault();
			e.stopPropagation();

			$.mobile.changePage("#task");
		});

		$("#sync_btn").off("click").on("click", function(e) {
			console.log("sync button clicked.");
			e.preventDefault();
			e.stopPropagation();

			taskManager.syncTasks(function() {
				showTaskList();
			});
		});

		$(document).on("pageshow", "#overview", function(e) {
			console.log("show page #overview");
			e.preventDefault();
			//e.stopPropagation();
			$.mobile.pageData = null;
			showTaskList();
		});


	});
})();
