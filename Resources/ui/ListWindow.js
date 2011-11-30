//A window object which will be associated with the stack of windows
exports.ListWindow = function(args) {
	var AddWindow = require('ui/AddWindow').AddWindow;
	var self = Ti.UI.createWindow(args);
	var isDone = args.isDone;
	var tableview = Ti.UI.createTableView();
	
	tableview.setData(getTableData(isDone));
	self.add(tableview);
	
	if (!isDone) {
		if (Ti.Platform.osname === 'android') {
			self.addEventListener('open', function() {
				Ti.Android.currentActivity.onCreateOptionsMenu = function(e) {
				    var menu = e.menu;
				    var menuItem = menu.add({ title: "Add Task" });
				    menuItem.setIcon("images/ic_menu_add.png");
				    menuItem.addEventListener("click", function(e) {
				        new AddWindow().open();
				    });
				};
			});
		} else {
			var addBtn = Ti.UI.createButton({
				title:'+'
			});
			addBtn.addEventListener('click', function() {
				new AddWindow().open();
			});
			self.rightNavButton = addBtn;
		}
		tableview.addEventListener('click', function(e) {
			createConfirmDialog(e.source.id, e.source.title).show();
		});
	}
	
	Ti.App.addEventListener('app:updateTables', function() {
		tableview.setData(getTableData(isDone));
	});
	
	return self;
};

var getTableData = function(done) {
	var db = require('db');
	var data = [];
	var row = null;
	var todoItems = db.selectItems(done);
	
	for (var i = 0; i < todoItems.length; i++) {
		row = Ti.UI.createTableViewRow({
			id: todoItems[i].id,
			title: todoItems[i].item,
			color: '#000',
			font: {
				fontWeight: 'bold'	
			}
		});
		data.push(row);
	}
	return data;
};

var createConfirmDialog = function(id, title) {
	var db = require('db');
	var confirm = Ti.UI.createAlertDialog({
		title: 'Mark As Done?',
		message: title,
		buttonNames: ['Umm, No','Ok']
	});
	confirm.addEventListener('click', function(evt) {			
		if (evt.index === 1) {
			db.updateItem(id, 1);
			Ti.App.fireEvent('app:updateTables');
		}
	});
	return confirm;
};