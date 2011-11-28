(function() {
	todo.db = {};
	todo.db.createDb = function() {
		Ti.API.info('creating db');
		var db = Ti.Database.open('mydb');
		db.execute('create table if not exists todo (id integer, item text, done integer)');
		db.execute('delete from todo');

		db.execute('insert into todo (id,item,done) values (?,?,?)',0,'Pick Up Laundry',0);
		db.execute('insert into todo (id,item,done) values (?,?,?)',1,'Go Food Shopping',0);
		db.execute('insert into todo (id,item,done) values (?,?,?)',2,'Call Mom',0);
		db.execute('insert into todo (id,item,done) values (?,?,?)',3,'Sleep',1);

		todo.db.id = db.lastInsertRowId;

		db.close();
	};

	todo.db.getItems = function(_done) {
		Ti.API.info('GETTING ITEMS');
		var retData = [];
		var db = Ti.Database.open('mydb');
		var rows = db.execute('select * from todo where done = ?', _done);
		while (rows.isValidRow()) {
			Ti.API.info('item: '+rows.fieldByName('item'));
			retData.push({item:rows.fieldByName('item'), id:rows.fieldByName('id')});
			rows.next();
		}
		db.close();
		return retData;
	};

	todo.db.updateItem = function(_id, _done) {
		Ti.API.info('Updating '+_id.toString() + ' ' + _done); 
		var db = Ti.Database.open('mydb');
		db.execute('update todo set done = ? where id = ?', _done, _id);
		var rows = db.execute('select * from todo where done = ?', _done);
		db.close();
		return rows;
	};

	todo.db.addItem = function(_item) {
		var db = Ti.Database.open('mydb');
		db.execute('insert into todo values (?,?,?)',todo.db.id++,_item,0);
		db.close();
	};
})();