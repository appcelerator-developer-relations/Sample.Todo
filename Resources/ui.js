var db = require('db');
var doTable, doneTable;

var createAddWindow = function() {
	var win = Ti.UI.createWindow({
		modal:true,
		title:'Add Item',
		backgroundColor:'#fff'
	});
	var itemField = Ti.UI.createTextField({
		width:300,
		height:45,
		top:20,
		hintText:'New Item',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	win.add(itemField);

	var btn = Ti.UI.createButton({
		title:'Add',
		width:300,
		height:40
	});
	btn.addEventListener('click', function() {
		db.addItem(itemField.value);
		doTable.setData(getTableData(0));
		win.close();
	});
	win.add(btn);
	return win;
};

var createConfirmDialog = function(_id, _title) {
	var confirm = Ti.UI.createAlertDialog({
		title:'Mark As Done?',
		message:_title,
		buttonNames:['Umm, No','Ok']
	});
	confirm.addEventListener('click', function(evt) {			
		if (evt.index === 1) {
			db.updateItem(_id, 1);
			doTable.setData(getTableData(0));
			doneTable.setData(getTableData(1));
		}
	});
	return confirm;
};

var getTableData = function(_done) {
	var data = [], row = null;
	var todoItems = db.selectItems(_done);
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

exports.createAppTabGroup = function() {		
	var tabGroup = Titanium.UI.createTabGroup();
	var win1 = Titanium.UI.createWindow({  
	    title:'Todo',
	    backgroundColor:'#fff',
	    navBarHidden: false
	});
	var tab1 = Titanium.UI.createTab({  
	    icon:'KS_nav_views.png',
	    title:'Todo',
	    window:win1
	});

	// Create a native menu option to add a task for Android.
	// Create a navigation bar button to do the same for iOS.
	if (Ti.Platform.osname === 'android') {
		win1.addEventListener('open', function() {
			Ti.Android.currentActivity.onCreateOptionsMenu = function(e) {
			    var menu = e.menu;
			    var menuItem = menu.add({ title: "Add Task" });
			    menuItem.setIcon("ic_menu_add.png");
			    menuItem.addEventListener("click", function(e) {
			        createAddWindow().open();
			    });
			};
		});
	} else {
		var addBtn = Ti.UI.createButton({
			title:'+'
		});
		addBtn.addEventListener('click', function() {
			createAddWindow().open();
		});
		win1.rightNavButton = addBtn;
	}

	doTable = Ti.UI.createTableView();
	doTable.setData(getTableData(0));
	doTable.addEventListener('click', function(e) {
		createConfirmDialog(e.source.id, e.source.title).show();
	});

	win1.add(doTable);

	var win2 = Titanium.UI.createWindow({  
	    title:'Done',
	    backgroundColor:'#fff'
	});
	var tab2 = Titanium.UI.createTab({  
	    icon:'KS_nav_ui.png',
	    title:'Done',
	    window:win2
	});
	doneTable = Ti.UI.createTableView();
	doneTable.setData(getTableData(1));
	win2.add(doneTable);

	tabGroup.addTab(tab1);  
	tabGroup.addTab(tab2);  

	return tabGroup;
};
