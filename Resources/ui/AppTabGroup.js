exports.AppTabGroup = function() {
	var self = Ti.UI.createTabGroup();

	//loop through tab objects and add them to the tab group
	for (var i = 0, l = arguments.length; i < l; i++) {
		var tab = Ti.UI.createTab(arguments[i]);
		//on initialization, we track the current tab as the first one added
		if (i === 0) {
			self.currentTab = tab;
		}
		self.addTab(tab);
	}

	//track the current tab for the tab group
	self.addEventListener('focus', function(e) {
		self.currentTab = e.tab;
	});

	return self;
};