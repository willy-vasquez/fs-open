const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3001;

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hello worlds!</h1>');
});

app.get('/api/notes', (request, response) => response.json(notes));

app.get('/api/notes/:id', (request, response) => {
  const { id } = request.params;
  const note = notes.find((note) => note.id === +id);
  if (note) response.json(note);
  else response.status(404).end();
});

app.delete('/api/notes/:id', (request, response) => {
  const { id } = request.params;
  notes = notes.filter((note) => note.id !== +id);

  response.status(204).end();
});

const generateId = () => {
  return notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
};

app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const newNote = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes.push(newNote);

  response.status(201).json(newNote);
});

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
