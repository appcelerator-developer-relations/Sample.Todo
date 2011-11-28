Titanium.UI.setBackgroundColor('#000');

var todo = {};
Ti.include(
	'db.js',
	'ui.js'
);

todo.db.createDb();

var tabGroup = todo.ui.createAppTabGroup();
tabGroup.open();