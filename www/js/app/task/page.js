$(document).on('pagebeforeshow', '#task', function() {
	console.log("event page before show 'task");
});

(function() {

	$(document).on("pageinit", "#task", function(e) {
		console.log("pageinit #task");
		
		var taskManager = TaskManager.getInstance();
	});
})();
