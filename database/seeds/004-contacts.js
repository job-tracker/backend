exports.seed = function (knex) {
  return knex('contacts').insert([
    {
      jobsite_id: 1,
      job_title: 'Job Supervisor',
      name: 'Rick Jones',
      phone_number: '123-555-2323',
    },
    {
      jobsite_id: 2,
      job_title: 'Head Electrician',
      name: 'Devin Thompson',
      phone_number: '123-555-4466',
    },
  ]);
};
