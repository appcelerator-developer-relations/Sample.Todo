var db = require('db');
var doTable, doneTable;

exports.createAddWindow = function() {
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
		doTable.setData(exports.getTableData(0));
		win.close();
	});
	win.add(btn);
	return win;
};

exports.createConfirmDialog = function(_id, _title) {
	var confirm = Ti.UI.createAlertDialog({
		title:'Mark As Done?',
		message:_title,
		buttonNames:['Umm, No','Ok']
	});
	confirm.addEventListener('click', function(evt) {			
		if (evt.index === 1) {
			db.updateItem(_id, 1);
			doTable.setData(exports.getTableData(0));
			doneTable.setData(exports.getTableData(1));
		}
	});
	return confirm;
};

exports.getTableData = function(_done) {
	var data = [], row = null;
	var todoItems = db.selectItems(_done);
	for (var i = 0; i < todoItems.length; i++) {
		row = Ti.UI.createTableViewRow({
			id: todoItems[i].id,
			title: todoItems[i].item
		});
		data.push(row);
	}
	return data;
};

exports.createAppTabGroup = function() {		
	var tabGroup = Titanium.UI.createTabGroup();
	var win1 = Titanium.UI.createWindow({  
	    title:'Todo',
	    backgroundColor:'#fff'
	});
	var tab1 = Titanium.UI.createTab({  
	    icon:'KS_nav_views.png',
	    title:'Todo',
	    window:win1
	});

	var addBtn = Ti.UI.createButton({
		title:'+'
	});
	addBtn.addEventListener('click', function() {
		var addWin = exports.createAddWindow();
		addWin.open();
	});
	win1.rightNavButton = addBtn;

	doTable = Ti.UI.createTableView();
	doTable.setData(exports.getTableData(0));
	doTable.addEventListener('click', function(e) {
		var confirm = exports.createConfirmDialog(e.source.id, e.source.title);
		confirm.show();
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
	doneTable.setData(exports.getTableData(1));
	win2.add(doneTable);

	tabGroup.addTab(tab1);  
	tabGroup.addTab(tab2);  

	return tabGroup;
};
