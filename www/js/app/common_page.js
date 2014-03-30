(function() {

	$(document).bind("pagebeforechange", function(event, data) {
		
		var newPageData = (data && data.options && data.options.pageData) ? data.options.pageData : null;

		if (newPageData != null && $.mobile.pageData == null) {
			$.mobile.pageData = newPageData;
		}
	});

})();
