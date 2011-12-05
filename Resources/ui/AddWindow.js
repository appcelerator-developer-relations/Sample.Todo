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
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	itemField.addEventListener('return', function(e) {
		addTask(itemField.value, self);
	});
	
	var addButton = Ti.UI.createButton({
		title: 'Add',
		width: '300dp',
		height: '40dp',
		top: '80dp'
	});
	addButton.addEventListener('click', function() {
		addTask(itemField.value, self);
	});
	
	var cancelButton = Ti.UI.createButton({
		title: 'Cancel',
		width: '300dp',
		height: '40dp',
		top: '130dp'
	});
	cancelButton.addEventListener('click', function(e) {
		self.close();
	});
	
	self.add(itemField);
	self.add(addButton);
	self.add(cancelButton);
	
	return self;
};

var addTask = function(value, win) {
	if (value === '') {
		alert('Please enter a task first');
		return;	
	}
	
	require('db').addItem(value);
	Ti.App.fireEvent('app:updateTables');
	win.close();
};