exports.AddWindow = function() {
	var db = require('db');
	var self = Ti.UI.createWindow({
		modal: true,
		title: 'Add Item',
		backgroundColor: '#fff'
	});
	var itemField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		top: '20dp',
		hintText: 'New Item',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var btn = Ti.UI.createButton({
		title: 'Add',
		width: '300dp',
		height: '40dp'
	});
	btn.addEventListener('click', function() {
		db.addItem(itemField.value);
		Ti.App.fireEvent('app:updateTables');
		self.close();
	});
	
	self.add(itemField);
	self.add(btn);
	
	return self;
};