var dbid;

exports.createDb = function() {
	var mydb = Ti.Database.open('mydb');
	mydb.execute('create table if not exists todo (id integer, item text, done integer)');
	mydb.execute('delete from todo');
	mydb.execute('insert into todo (id,item,done) values (?,?,?)',0,'Pick Up Laundry',0);
	mydb.execute('insert into todo (id,item,done) values (?,?,?)',1,'Go Food Shopping',0);
	mydb.execute('insert into todo (id,item,done) values (?,?,?)',2,'Call Mom',0);
	mydb.execute('insert into todo (id,item,done) values (?,?,?)',3,'Sleep',1);
	dbid = mydb.lastInsertRowId;
	mydb.close();
};

exports.selectItems = function(_done) {
	var retData = [];
	var db = Ti.Database.open('mydb');
	var rows = db.execute('select * from todo where done = ?', _done);
	while (rows.isValidRow()) {
		retData.push({item:rows.fieldByName('item'), id:rows.fieldByName('id')});
		rows.next();
	}
	db.close();
	return retData;
};

exports.updateItem = function(_id, _done) { 
	var mydb = Ti.Database.open('mydb');
	mydb.execute('update todo set done = ? where id = ?', _done, _id);
	var rows = mydb.execute('select * from todo where done = ?', _done);
	mydb.close();
	return rows;
};

exports.addItem = function(_item) {
	var mydb = Ti.Database.open('mydb');
	mydb.execute('insert into todo values (?,?,?)', dbid++, _item, 0);
	mydb.close();
};
