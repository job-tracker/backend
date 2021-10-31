exports.up = function (knex) {
  return (
    knex.schema

      // Users

      .createTable('users', (tbl) => {
        tbl.increments();
        tbl.integer('user_id').notNullable().unique();
        tbl.string('name').notNullable();
        tbl.string('email').notNullable().unique();
      })

      // Supply Lists

      .createTable('supply_lists', (tbl) => {
        tbl.increments();
        tbl
          .integer('user_id')
          .unsigned()
          .references('users.user_id')
          .onDelete('CASCADE');
        tbl.string('title').notNullable();
        tbl.string('quantity');
      })

      // Jobsites Group

      .createTable('jobsites', (tbl) => {
        tbl.increments();
        tbl
          .integer('user_id')
          .unsigned()
          .references('users.user_id')
          .onDelete('CASCADE');
        tbl.integer('tracking_number').notNullable().unique();
        tbl.string('name');
        tbl.string('address').notNullable();
        tbl.boolean('complete').defaultTo(false);
      })

      .createTable('contacts', (tbl) => {
        tbl.increments();
        tbl
          .integer('user_id')
          .unsigned()
          .references('users.user_id')
          .onDelete('CASCADE');
        tbl
          .integer('jobsite_id')
          .unsigned()
          .references('jobsites.id')
          .onDelete('CASCADE');
        tbl.string('job_title');
        tbl.string('name');
        tbl.string('phone_number').notNullable();
      })

      .createTable('jobsite_notes', (tbl) => {
        tbl.increments();
        tbl
          .integer('user_id')
          .unsigned()
          .references('users.user_id')
          .onDelete('CASCADE');
        tbl
          .integer('jobsite_id')
          .unsigned()
          .references('jobsites.id')
          .onDelete('CASCADE');
        tbl.string('note').notNullable();
        tbl.boolean('complete').defaultTo(false);
      })

      //  Buildings Group

      .createTable('buildings', (tbl) => {
        tbl.increments();
        tbl
          .integer('user_id')
          .unsigned()
          .references('users.user_id')
          .onDelete('CASCADE');
        tbl
          .integer('jobsite_id')
          .unsigned()
          .references('jobsites.id')
          .onDelete('CASCADE');
        tbl.string('address').notNullable();
        tbl.string('scope_of_work');
        tbl.boolean('complete').defaultTo(false);
      })

      // Floors Group

      .createTable('floors', (tbl) => {
        tbl.increments();
        tbl
          .integer('user_id')
          .unsigned()
          .references('users.user_id')
          .onDelete('CASCADE');
        tbl
          .integer('jobsite_id')
          .unsigned()
          .references('jobsites.id')
          .onDelete('CASCADE');
        tbl
          .integer('building_id')
          .unsigned()
          .references('buildings.id')
          .onDelete('CASCADE');
        tbl.string('name').notNullable();
        tbl.string('scope_of_work');
        tbl.boolean('complete').defaultTo(false);
      })

      // Units Group

      .createTable('units', (tbl) => {
        tbl.increments();
        tbl
          .integer('user_id')
          .unsigned()
          .references('users.user_id')
          .onDelete('CASCADE');
        tbl
          .integer('jobsite_id')
          .unsigned()
          .references('jobsites.id')
          .onDelete('CASCADE');
        tbl
          .integer('building_id')
          .unsigned()
          .references('buildings.id')
          .onDelete('CASCADE');
        tbl
          .integer('floor_id')
          .unsigned()
          .references('floors.id')
          .onDelete('CASCADE');
        tbl.string('name').notNullable();
        tbl.string('scope_of_work');
        tbl.boolean('complete').defaultTo(false);
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('units')
    .dropTableIfExists('floors')
    .dropTableIfExists('buildings')
    .dropTableIfExists('jobsite_notes')
    .dropTableIfExists('contacts')
    .dropTableIfExists('jobsites')
    .dropTableIfExists('supply_lists')
    .dropTableIfExists('users');
};
