'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};


exports.up = function(db) {
  return db.createTable('products', {
    id: {type:'int',primaryKey:true, autoIncrement:true, unsigned: true},
    name:{type: 'string', length:100, notNull:true},
    cost: {type:'int', unsigned: true, notNull:true},
    product_specs: 'text'
  });
};

exports.down = function(db) {
  return db.dropTable("products");
};

exports._meta = {
  "version": 1
};
