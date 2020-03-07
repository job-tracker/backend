
exports.up = function(knex) {
  return knex.schema.createTable('jobsite', tbl => {
    tbl.increments();
    tbl.integer('tracking_number').notNullable().unique();
    tbl.string('name');
    tbl.string('address');
    tbl.jsonb('contact');
    tbl.string('notes');
    tbl.boolean('complete');
  })

  .createTable('building', tbl => {
    tbl.increments();
    tbl.integer('jobsite_id').references('jobsite.id');
    tbl.string('name');
    tbl.integer('floor_count');
    tbl.integer('unit_count');
    tbl.integer('outlet_count');
    tbl.string('notes');
    tbl.boolean('complete'); 
  })

  .createTable("floor", tbl => {
    tbl.increments();
    tbl.integer('building_id').references('building.id');
    tbl.string('name');
    tbl.integer('unit_count');
    tbl.integer('outlet_count');
    tbl.string('notes');
    tbl.boolean('complete');
  })
  
  .createTable("idf_room", tbl => {
    tbl.increments();
    tbl.integer('building_id').references('building.id');
    tbl.integer('floor_id').references('floor.id');
    tbl.string('location');
    tbl.string('images');
    tbl.string('notes')
    tbl.boolean('complete');
  })

  .createTable("unit", tbl => {
    tbl.increments();
    tbl.integer('building_id').references('building.id');
    tbl.integer('floor_id').references('floor.id');
    tbl.string('name');
    tbl.integer('outlet_count');
    tbl.string('notes');
    tbl.boolean('complete');
  })
};

exports.down = function(knex) {
  return knex.schema
		.dropTableIfExists("unit")
		.dropTableIfExists("idf_room")
		.dropTableIfExists("floor")
		.dropTableIfExists("building")
		.dropTableIfExists("jobsite")
};

