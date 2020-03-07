
exports.seed = function(knex) {
  return knex("jobsite").insert([
    {
      tracking_number: 12345,
      name: 'Village by Vintage',
      address: '123 Jackson Ave Seattle, Wa',
      contact: {
        name: 'Rick Jones',
        phone_number: '123-555-2323',
      },
      notes: 'Random note',
      complete: false
    }
  ]);
};
