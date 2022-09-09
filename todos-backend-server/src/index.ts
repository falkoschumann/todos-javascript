import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import {
  createAddTodoCommandHandler,
  createClearCompletedCommandHandler,
  createDestroyTodoCommandHandler,
  createSaveTodoCommandHandler,
  createSelectTodosQueryHandler,
  createToggleAllCommandHandler,
  createToggleTodoCommandHandler,
  FileTodosRepository,
} from 'todos-backend';

import { createBackendRouter } from './BackendRouter';

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('spec'));

const todosRepository = new FileTodosRepository('todos.json');
const addTodoCommandHandler = createAddTodoCommandHandler(todosRepository);
const clearCompletedCommandHandler = createClearCompletedCommandHandler(todosRepository);
const destroyTodoCommandHandler = createDestroyTodoCommandHandler(todosRepository);
const saveTodoCommandHandler = createSaveTodoCommandHandler(todosRepository);
const toggleAllCommandHandler = createToggleAllCommandHandler(todosRepository);
const toggleTodoCommandHandler = createToggleTodoCommandHandler(todosRepository);
const selectTodosQueryHandler = createSelectTodosQueryHandler(todosRepository);
const backendRouter = createBackendRouter({
  addTodoCommandHandler,
  clearCompletedCommandHandler,
  destroyTodoCommandHandler,
  saveTodoCommandHandler,
  toggleAllCommandHandler,
  toggleTodoCommandHandler,
  selectTodosQueryHandler,
});
app.use('/api', backendRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Todos backend server listening on port ${port}`);
});
