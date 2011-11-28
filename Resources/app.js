Titanium.UI.setBackgroundColor('#000');

var db = require('db');
var ui = require('ui');

db.createDb();
var tabGroup = ui.createAppTabGroup();
tabGroup.open();

