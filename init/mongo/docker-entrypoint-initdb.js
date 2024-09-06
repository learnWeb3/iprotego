db = db.getSiblingDB('iprotego'); // we can not use "use" statement here to switch db

// backend server api
db.createUser({
  user: 'iprotego-data-admin',
  pwd: 'coz16wV2ONhHF',
  roles: [{ role: 'readWrite', db: 'iprotego' }],
  passwordDigestor: 'server',
});
