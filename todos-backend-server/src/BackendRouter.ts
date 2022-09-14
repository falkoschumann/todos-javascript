import { Request, Router } from 'express';
import { constants } from 'http2';

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
      let errorMessage = 'Could not add todo.';
      if (err instanceof Error) {
        errorMessage += ' ' + err.message;
      }
      res.status(constants.HTTP_STATUS_BAD_REQUEST).json(new Failure(errorMessage));
    }
  });
  router.post('/clear-completed', async (req, res) => {
    try {
      verifyContentType(req);
      verifyClearCompletedCommand(req.body);
      const status = await clearCompletedCommandHandler(req.body);
      res.json(status);
    } catch (err) {
      let errorMessage = 'Could not clear completed.';
      if (err instanceof Error) {
        errorMessage += ' ' + err.message;
      }
      res.status(constants.HTTP_STATUS_BAD_REQUEST).json(new Failure(errorMessage));
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
      let errorMessage = 'Could not destroy todo.';
      if (err instanceof Error) {
        errorMessage += ' ' + err.message;
      }
      res.status(constants.HTTP_STATUS_BAD_REQUEST).json(new Failure(errorMessage));
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
      let errorMessage = 'Could not save todo.';
      if (err instanceof Error) {
        errorMessage += ' ' + err.message;
      }
      res.status(constants.HTTP_STATUS_BAD_REQUEST).json(new Failure(errorMessage));
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
      let errorMessage = 'Could not toggle all.';
      if (err instanceof Error) {
        errorMessage += ' ' + err.message;
      }
      res.status(constants.HTTP_STATUS_BAD_REQUEST).json(new Failure(errorMessage));
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
      let errorMessage = 'Could not toggle todo.';
      if (err instanceof Error) {
        errorMessage += ' ' + err.message;
      }
      res.status(constants.HTTP_STATUS_BAD_REQUEST).json(new Failure(errorMessage));
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

function verifyAddTodoCommand(message: Record<string, unknown>) {
  verifyProperty(message, 'title', 'string');
}

function verifyClearCompletedCommand(_: Record<string, unknown>) {
  // command is empty
}

function verifyDestroyTodoCommand(message: Record<string, unknown>) {
  verifyProperty(message, 'id', 'number');
}

function verifySaveTodoCommand(message: Record<string, unknown>) {
  verifyProperty(message, 'id', 'number');
  verifyProperty(message, 'title', 'string');
}

function verifyTodosSelectQuery(_: Record<string, unknown>) {
  // command is empty
}

function verifyToggleAllCommand(message: Record<string, unknown>) {
  verifyProperty(message, 'checked', 'boolean');
}

function verifyToggleTodoCommand(message: Record<string, unknown>) {
  verifyProperty(message, 'id', 'number');
}

function verifyProperty(message: Record<string, unknown>, name: string, type: string) {
  if (message[name] == null) {
    throw Error(`Message must have property ${name}.`);
  }
  if (typeof message[name] !== type) {
    throw Error(`Property ${name} of message must be of type ${type}.`);
  }
}
