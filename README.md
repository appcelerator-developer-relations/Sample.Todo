# Sample.Todo

This is a Titanium Mobile sample app that creates a basic todo list. With this app you can maintain a listing of tasks to be completed, add to that list, and mark tasks as **done**. 

** Topics Covered
- Local storage with SQLite via `Titanium.Database`
- Modular Javascript with CommonJS
- Native UI features
  - Android menus
  - iOS navigation bar buttons
- Cross-platform design

** SQL for pre-populated todo.sqlite file
  create table if not exists todo (item text, done integer);
  insert into todo (item,done) values ('Pick Up Laundry',0);
  insert into todo (item,done) values ('Go Food Shopping',0);
  insert into todo (item,done) values ('Call Mom',0);
  insert into todo (item,done) values ('Sleep',1);