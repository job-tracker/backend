exports.up = function (knex) {
  return knex.schema
    .createTable('jobsites', (tbl) => {
      tbl.increments();
      tbl.integer('tracking_number').notNullable().unique();
      tbl.string('name');
      tbl.string('address').notNullable();
      tbl.boolean('complete');
    })

    .createTable('contacts', (tbl) => {
      tbl.increments();
      tbl.integer('jobsite_id').references('jobsite.id');
      tbl.string('title');
      tbl.string('name');
      tbl.string('phone_number').notNullable();
    })

    .createTable('jobsite_notes', (tbl) => {
      tbl.increments();
      tbl.integer('jobsite_id').references('jobsite.id');
      tbl.string('note').notNullable();
    })

    .createTable('tasks', (tbl) => {
      tbl.increments();
      tbl.integer('jobsite_id').references('jobsite.id');
      tbl.string('title').notNullable();
      tbl.string('task').notNullable();
      tbl.boolean('complete');
    })

    .createTable('buildings', (tbl) => {
      tbl.increments();
      tbl.integer('jobsite_id').references('jobsite.id');
      tbl.string('name');
      tbl.integer('floor_count');
      tbl.integer('unit_count');
      tbl.integer('outlet_count');
      tbl.boolean('complete');
    })

    .createTable('building_notes', (tbl) => {
      tbl.increments();
      tbl.integer('building_id').references('building.id');
      tbl.string('note');
    })

    .createTable('service_rooms', (tbl) => {
      tbl.increments();
      tbl.integer('jobsite_id').references('jobsite.id');
      tbl.integer('building_id').references('building.id');
      tbl.string('location').notNullable();
      tbl.string('images');
      tbl.string('note');
      tbl.boolean('complete');
    })

    .createTable('floors', (tbl) => {
      tbl.increments();
      tbl.integer('jobsite_id').references('jobsite.id');
      tbl.integer('building_id').references('building.id');
      tbl.string('name').notNullable();
      tbl.integer('unit_count').notNullable();
      tbl.integer('outlet_count').notNullable();
      tbl.string('notes');
      tbl.boolean('complete');
    })

    .createTable('units', (tbl) => {
      tbl.increments();
      tbl.integer('jobsite_id').references('jobsite.id');
      tbl.integer('building_id').references('building.id');
      tbl.integer('floor_id').references('floor.id');
      tbl.string('name').notNullable();
      tbl.integer('outlet_count').notNullable();
      tbl.string('notes');
      tbl.boolean('complete');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('unit')
    .dropTableIfExists('idf_room')
    .dropTableIfExists('floor')
    .dropTableIfExists('building')
    .dropTableIfExists('contact')
    .dropTableIfExists('jobsite');
};
