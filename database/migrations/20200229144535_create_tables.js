
exports.up = function(knex) {
  return knex.schema.creatTable('jobsite', tbl => {
    tbl.increments();
    tbl.string('name');
    tbl.string('address');
    tbl.jsonb('contact');
    tbl.string('notes');
    tbl.boolean('complete');
  })

  .creatTable('building', tbl => {
    tbl.increments();
    tbl.integer('jobsite_id').references('jobsite.id');
    tbl.string('name');
    tbl.integer('floor');
    tbl.integer('unit_count');
    tbl.integer('outlet_count');
    tbl.boolean('complete'); 
  })

  .createTable("idf_rooms", tbl => {
    tbl.increments();
    tbl.integer('building_id').references('building.id');
    tbl.string('images');
    tbl.boolean('complete');
  })
};

exports.down = function(knex) {
  
};

return knex.schema
		.createTable("couples", table => {
			table.increments();
			table.string("spouse_one_name").notNullable();
			table.string("spouse_two_name").notNullable();
			table
				.string("email")
				.notNullable()
				.unique();
			table.string("password").notNullable();
			table.string("jwt", 512);
		})