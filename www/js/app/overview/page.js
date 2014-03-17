(function() {

	$(document).on("pageinit", "#overview", function(e) {
		console.log("pageinit #overview");
		
		var taskManager = TaskManager.getInstance();

		$("#removeAllTasks").on("tap", function() {
			e.preventDefault();

			taskManager.removeAllTasks(function (err) {
				console.log("ERR>>>" + JSON.stringify(err));
				showTaskList();
			});
		});


		$(document).on("pageshow", "#overview", function(e) {
			e.preventDefault();
			showTaskList();
		});


		function showTaskList() {
			taskManager.allTasks(function(err, tasks) {
				$('#taskListView').empty();

				if (jQuery.isEmptyObject(tasks.rows)) {
					$("<li>No tasks available</li>").appendTo("#taskListView");
				} else {
					tasks.rows.forEach(function(task) {
						/*
						<li>
                        <a href="#task">
                            <h2>Stephen Weber</h2>
                            <p><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
                            <p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
                            <p class="ui-li-aside"><strong>6:24</strong>PM</p>
                        </a>
                    </li>
						*/
						$("<li><a href='#task?taskId=" + task.id + "'>" +  task.key.title + "</a></li>").appendTo("#taskListView");
					});
				}

				$("#taskListView").listview('refresh');
			});
		};
	});
})();
