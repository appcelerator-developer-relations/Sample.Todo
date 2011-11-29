var DATABASE_NAME = 'todo';

exports.createDb = function() {
	Ti.Database.install('todo.sqlite', DATABASE_NAME);
};

exports.selectItems = function(_done) {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select ROWID, * from todo where done = ?', _done);
	while (rows.isValidRow()) {
		retData.push({item:rows.fieldByName('item'), id:rows.fieldByName('ROWID')});
		rows.next();
	}
	db.close();
	return retData;
};

exports.updateItem = function(_id, _done) { 
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('update todo set done = ? where ROWID = ?', _done, _id);
	var rows = mydb.execute('select * from todo where done = ?', _done);
	mydb.close();
	return rows;
};

exports.addItem = function(_item) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('insert into todo values (?,?)', _item, 0);
	mydb.close();
};
