(function() {
	todo.ui = {};

	todo.ui.createAddWindow = function() {
		var win = Ti.UI.createWindow({
			modal:true,
			title:'Add Item',
			backgroundColor:'#fff'
		});
		var itemField = Ti.UI.createTextField({
			width:300,
			height:45,
			top:20,
			hintText:'New Item'
		});
		win.add(itemField);

		var btn = Ti.UI.createButton({
			title:'Add',
			width:300,
			height:40
		});
		btn.addEventListener('click', function() {
			todo.db.addItem(itemField.value);
			todo.ui.doTable.setData(todo.ui.getTableData(0));
			win.close();
		});
		win.add(btn);
		return win;
	};

	todo.ui.createConfirmDialog = function(_id, _title) {
		var confirm = Ti.UI.createAlertDialog({
			title:'Mark As Done?',
			message:_title,
			buttonNames:['Umm, No','Ok']
		});
		confirm.addEventListener('click', function(evt) {			
			if (evt.index === 1) {
				todo.db.updateItem(_id, 1);
				todo.ui.doTable.setData(todo.ui.getTableData(0));
				todo.ui.doneTable.setData(todo.ui.getTableData(1));
			}
		});
		return confirm;
	};

	todo.ui.getTableData = function(_done) {
		Ti.API.info('creating list');
		var data = [], row = null;
		var todoItems = todo.db.getItems(_done);
		Ti.API.info(todoItems);
		for (var i = 0; i < todoItems.length; i++) {
			row = Ti.UI.createTableViewRow({
				id: todoItems[i].id,
				title: todoItems[i].item
			});
			data.push(row);
		}
		return data;
	};

	todo.ui.createAppTabGroup = function() {		
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
			var addWin = todo.ui.createAddWindow();
			addWin.open();
		});
		win1.rightNavButton = addBtn;

		todo.ui.doTable = Ti.UI.createTableView();
		todo.ui.doTable.setData(todo.ui.getTableData(0));
		todo.ui.doTable.addEventListener('click', function(e) {
			var confirm = todo.ui.createConfirmDialog(e.source.id, e.source.title);
			confirm.show();
		});

		win1.add(todo.ui.doTable);

		var win2 = Titanium.UI.createWindow({  
		    title:'Todone',
		    backgroundColor:'#fff'
		});
		var tab2 = Titanium.UI.createTab({  
		    icon:'KS_nav_ui.png',
		    title:'Todone',
		    window:win2
		});
		todo.ui.doneTable = Ti.UI.createTableView();
		todo.ui.doneTable.setData(todo.ui.getTableData(1));
		win2.add(todo.ui.doneTable);

		tabGroup.addTab(tab1);  
		tabGroup.addTab(tab2);  

		return tabGroup;
	};

})();
