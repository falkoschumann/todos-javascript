import { Request, Router } from 'express';

import {
  AddTodoCommandHandler,
  ClearCompletedCommandHandler,
  DestroyTodoCommandHandler,
  Failure,
  SaveTodoCommandHandler,
  SelectTodosQueryHandler,
  ToggleAllCommandHandler,
  ToggleTodoCommandHandler,
} from 'todos-contract';

interface BackendRouterOptions {
  readonly selectTodosQueryHandler: SelectTodosQueryHandler;
  readonly addTodoCommandHandler: AddTodoCommandHandler;
  readonly clearCompletedCommandHandler: ClearCompletedCommandHandler;
  readonly destroyTodoCommandHandler: DestroyTodoCommandHandler;
  readonly saveTodoCommandHandler: SaveTodoCommandHandler;
  readonly toggleAllCommandHandler: ToggleAllCommandHandler;
  readonly toggleTodoCommandHandler: ToggleTodoCommandHandler;
}

export function createBackendRouter({
  selectTodosQueryHandler,
  addTodoCommandHandler,
  clearCompletedCommandHandler,
  destroyTodoCommandHandler,
  saveTodoCommandHandler,
  toggleAllCommandHandler,
  toggleTodoCommandHandler,
}: BackendRouterOptions): Router {
  const router = Router();
  router.post('/add-todo', async (req, res) => {
    try {
      verifyContentType(req);
      verifyAddTodoCommand(req.body);
      const status = await addTodoCommandHandler(req.body);
      res.json(status);
    } catch (err) {
      console.error('add todo failed:', req.body, err);
      const error = err as Error;
      res.json(new Failure(`Could not add todo. ${error.message}`));
    }
  });
  router.post('/clear-completed', async (req, res) => {
    try {
      verifyContentType(req);
      verifyClearCompletedCommand(req.body);
      const status = await clearCompletedCommandHandler(req.body);
      res.json(status);
    } catch (err) {
      console.error('clear completed failed:', req.body, err);
      const error = err as Error;
      res.json(new Failure(`Could not clear completed. ${error.message}`));
    }
  });
  router.post('/destroy-todo', async (req, res) => {
    try {
      verifyContentType(req);
      verifyDestroyTodoCommand(req.body);
      const status = await destroyTodoCommandHandler(req.body);
      res.json(status);
    } catch (err) {
      console.error('destroy todo failed:', req.body, err);
      const error = err as Error;
      res.json(new Failure(`Could not destroy todo. ${error.message}`));
    }
  });
  router.post('/save-todo', async (req, res) => {
    try {
      verifyContentType(req);
      verifySaveTodoCommand(req.body);
      const status = await saveTodoCommandHandler(req.body);
      res.json(status);
    } catch (err) {
      console.error('save todo failed:', req.body, err);
      const error = err as Error;
      res.json(new Failure(`Could not save todo. ${error.message}`));
    }
  });
  router.get('/select-todos', async (req, res) => {
    try {
      verifyTodosSelectQuery(req.query);
      const result = await selectTodosQueryHandler(req.query);
      res.json(result);
    } catch (err) {
      console.error('select todos failed:', req.query, err);
      res.json([]);
    }
  });
  router.post('/toggle-all', async (req, res) => {
    try {
      verifyContentType(req);
      verifyToggleAllCommand(req.body);
      const status = await toggleAllCommandHandler(req.body);
      res.json(status);
    } catch (err) {
      console.error('toggle all failed:', req.body, err);
      const error = err as Error;
      res.json(new Failure(`Could not toggle all. ${error.message}`));
    }
  });
  router.post('/toggle-todo', async (req, res) => {
    try {
      verifyContentType(req);
      verifyToggleTodoCommand(req.body);
      const status = await toggleTodoCommandHandler(req.body);
      res.json(status);
    } catch (err) {
      console.error('toggle todo failed:', req.body, err);
      const error = err as Error;
      res.json(new Failure(`Could not toggle todo. ${error.message}`));
    }
  });
  return router;
}

function verifyContentType(req: Request) {
  const contentType = req.header('Content-Type');
  if (contentType !== 'application/json') {
    throw Error(`Content type must be application/json, was ${contentType}.`);
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */

function verifyAddTodoCommand(message: any) {
  verifyProperty(message, 'title', 'string');
}

function verifyClearCompletedCommand(_: any) {
  // command is empty
}

function verifyDestroyTodoCommand(message: any) {
  verifyProperty(message, 'id', 'number');
}

function verifySaveTodoCommand(message: any) {
  verifyProperty(message, 'id', 'number');
  verifyProperty(message, 'title', 'string');
}

function verifyTodosSelectQuery(_: any) {
  // command is empty
}

function verifyToggleAllCommand(message: any) {
  verifyProperty(message, 'checked', 'boolean');
}

function verifyToggleTodoCommand(message: any) {
  verifyProperty(message, 'id', 'number');
}

function verifyProperty(message: any, name: string, type: string) {
  if (message[name] == null) {
    throw Error(`Message must have property ${name}.`);
  }
  if (typeof message[name] !== type) {
    throw Error(`Property ${name} of message must be of type ${type}.`);
  }
}

/* eslint-enable @typescript-eslint/no-explicit-any */
