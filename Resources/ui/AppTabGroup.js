exports.AppTabGroup = function() {
	
	var AddWindow = require('ui/AddWindow').AddWindow;
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
		// clear the action bar menu when switching between tabs for Android
		if (Ti.Platform.name === "android") {
			self.getActivity().invalidateOptionsMenu(); 
		} 
	});

	if (Ti.Platform.name === "android") {
    	self.addEventListener("open", function(e) {
        	var activity = self.getActivity();
        	activity.onCreateOptionsMenu = function(e) {
            	var item, menu;
            	menu = e.menu;
            	menu.clear();
    			// if it is the Todo tab on Android, add menu item to action bar
            	if (!self.activeTab.window.isDone) {
                	item = menu.add({
                    	title : "Add",
                    	icon : "images/images/ic_menu_add.png",
                    	showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
                	});
                	item.addEventListener("click", function(e) {
								new AddWindow().open();
					});
            	} // end check for isDone variable 
    		};	// end createOptionsMenu
    	});
    }

	return self;
};
