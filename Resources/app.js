Titanium.UI.setBackgroundColor('#000');

var db = require('db');
var ui = require('ui');

db.createDb();
Ti.API.info(db);
Ti.API.info(db.createDb);
Ti.API.info(ui);
Ti.API.info(ui.createAddWindow);
var tabGroup = ui.createAppTabGroup();
tabGroup.open();

// if (Ti.Platform.osname === 'android') {
		// alert('in android');
		// Ti.Android.currentActivity.onCreateOptionsMenu = function(e) {
			// alert('creating menu');
		    // var menu = e.menu;
		    // var menuItem = menu.add({ title: "Add Task" });
		    // menuItem.setIcon("KS_nav_ui.png");
		    // menuItem.addEventListener("click", function(e) {
		        // alert("I was clicked");
		    // });
		// };
	// }
