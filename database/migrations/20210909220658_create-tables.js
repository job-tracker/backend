exports.up = function (knex) {
  return (
    knex.schema

      // Users

      .createTable('users', (tbl) => {
        tbl.increments();
        tbl.integer('user_id').notNullable().unique();
        tbl.string('name').notNullable();
        tbl.string('email').notNullable().unique();
        tbl.string('password').notNullable();
      })

      // Supply Lists

      .createTable('supply_lists', (tbl) => {
        tbl.increments();
        tbl.integer('user_id').references('users.user_id');
        tbl.string('title').notNullable();
        tbl.string('quantity');
      })

      // Jobsites Group

      .createTable('jobsites', (tbl) => {
        tbl.increments();
        tbl.integer('user_id').references('users.user_id');
        tbl.integer('tracking_number').notNullable().unique();
        tbl.string('name');
        tbl.string('address').notNullable();
        tbl.boolean('complete').defaultTo(false);
      })

      .createTable('contacts', (tbl) => {
        tbl.increments();
        tbl.integer('user_id').references('users.user_id');
        tbl.integer('jobsite_id').references('jobsites.id');
        tbl.string('job_title');
        tbl.string('name');
        tbl.string('phone_number').notNullable();
      })

      .createTable('jobsite_notes', (tbl) => {
        tbl.increments();
        tbl.integer('user_id').references('users.user_id');
        tbl.integer('jobsite_id').references('jobsites.id');
        tbl.string('note').notNullable();
        tbl.boolean('complete').defaultTo(false);
      })

      // .createTable('tasks', (tbl) => {
      //   tbl.increments();
      //   tbl.integer('jobsite_id').references('jobsites.id');
      //   tbl.date('due_date');
      //   tbl.string('title').notNullable();
      //   tbl.string('task').notNullable();
      //   tbl.boolean('complete').defaultTo(false);
      // })

      //  Buildings Group

      .createTable('buildings', (tbl) => {
        tbl.increments();
        tbl.integer('user_id').references('users.user_id');
        tbl.integer('jobsite_id').references('jobsites.id');
        tbl.string('address').notNullable();
        tbl.string('scope_of_work');
        tbl.boolean('complete').defaultTo(false);
      })

      // .createTable('building_notes', (tbl) => {
      //   tbl.increments();
      //   tbl.integer('jobsite_id').references('jobsites.id');
      //   tbl.integer('building_id').references('buildings.id');
      //   tbl.string('note');
      // })

      // .createTable('service_rooms', (tbl) => {
      //   tbl.increments();
      //   tbl.integer('jobsite_id').references('jobsites.id');
      //   tbl.integer('building_id').references('buildings.id');
      // change location to floor reference, we want to use a
      // drop down to select the floor.
      //   tbl.string('location').notNullable();
      //   tbl.string('images');
      //   tbl.boolean('complete').defaultTo(false);
      // })

      // .createTable('service_room_notes', (tbl) => {
      //   tbl.increments();
      //   tbl.integer('jobsite_id').references('jobsites.id');
      //   tbl.integer('building_id').references('buildings.id');
      //   tbl.integer('service_room_id').references('service_rooms.id');
      //   tbl.string('note');
      // })

      // Floors Group

      .createTable('floors', (tbl) => {
        tbl.increments();
        tbl.integer('user_id').references('users.user_id');
        tbl.integer('jobsite_id').references('jobsites.id');
        tbl.integer('building_id').references('buildings.id');
        tbl.string('name').notNullable();
        tbl.string('scope_of_work');
        tbl.boolean('complete').defaultTo(false);
      })

      // Units Group

      .createTable('units', (tbl) => {
        tbl.increments();
        tbl.integer('user_id').references('users.user_id');
        tbl.integer('jobsite_id').references('jobsites.id');
        tbl.integer('building_id').references('buildings.id');
        tbl.integer('floor_id').references('floors.id');
        tbl.string('name').notNullable();
        tbl.string('scope_of_work');
        tbl.boolean('complete').defaultTo(false);
      })

    // .createTable('unit_notes', (tbl) => {
    //   tbl.increments();
    //   tbl.integer('jobsite_id').references('jobsites.id');
    //   tbl.integer('building_id').references('buildings.id');
    //   tbl.integer('floor_id').references('floors.id');
    //   tbl.integer('unit_id').references('units.id');
    //   tbl.string('note').notNullable();
    // })
  );
};

exports.down = function (knex) {
  return (
    knex.schema
      // .dropTableIfExists('unit_notes')
      .dropTableIfExists('units')
      .dropTableIfExists('floors')
      // .dropTableIfExists('service_room_notes')
      // .dropTableIfExists('service_rooms')
      // .dropTableIfExists('building_notes')
      .dropTableIfExists('buildings')
      // .dropTableIfExists('tasks')
      .dropTableIfExists('jobsite_notes')
      .dropTableIfExists('contacts')
      .dropTableIfExists('jobsites')
      .dropTableIfExists('supply_lists')
      .dropTableIfExists('users')
  );
};
