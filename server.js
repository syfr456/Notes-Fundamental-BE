require('dotenv').config();

// notes
const Hapi = require('@hapi/hapi');
const notes = require('./src/api/notes');
const NotesService = require('./src/services/InMemory/NotesService');
const NotesValidator = require('./src/validator/notes');

// users
const users = require('./src/api/users');
const UsersService = require('./src/services/postgres/UsersService');
const UsersValidator = require('./src/validator/users');

const init = async () => {
  const notesService = new NotesService();
  const usersService = new UsersService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
