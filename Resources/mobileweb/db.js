/* 
 * Database is currently not available on Mobile Web.
 * Use Ti.App.Properties for lightweight key/value store.
 */

var DATABASE_NAME = 'todo';

exports.createDb = function() {
	var list = {
		todoList: ['Pick up groceries', 'Sleep', 'Take out the garbage', 'Make dinner'],
		doneList: ['Create a Titanium app']
	}
	Ti.App.Properties.setString(DATABASE_NAME, JSON.stringify(list));
};

exports.selectItems = function(_done) {
	var retData = [];
	var allData = JSON.parse(Ti.App.Properties.getString(DATABASE_NAME));
	var rows = [];
	
	if (_done === 0) {
		rows = allData.todoList;
	}
	else {
		rows = allData.doneList;
	}
	
	for (var i=0; i<rows.length; i++) {
		retData.push({item:rows[i], id:i});
	}
	return retData;
};

exports.updateItem = function(_id, _done) { 
	var allData = JSON.parse(Ti.App.Properties.getString(DATABASE_NAME));
	var todoList = allData.todoList;
	var doneList = allData.doneList;
	var rows = [];
	if (_done == 1) {
		var item = todoList[_id];
		doneList.push(item);
		todoList.splice(_id, 1);
		rows = doneList;
	}
	else {
		var item = doneList[_id];
		todoList.push(item);
		doneList.splice(_id, 1);
		rows = todoList;
	}
	Ti.App.Properties.setString(DATABASE_NAME, JSON.stringify(allData));
	return rows;
};

exports.addItem = function(_item) {
	var allData = JSON.parse(Ti.App.Properties.getString(DATABASE_NAME));
	var todoList = allData.todoList;
	todoList.push(_item);
	Ti.App.Properties.setString(DATABASE_NAME, JSON.stringify(allData));
};

exports.deleteItem = function(_id, _done) {
	var allData = JSON.parse(Ti.App.Properties.getString(DATABASE_NAME));
	if (_done == 0) {
		allData.todoList.splice(_id, 1);
	}
	else {
		allData.doneList.splice(_id, 1);
	}
	Ti.App.Properties.setString(DATABASE_NAME, JSON.stringify(allData));
};