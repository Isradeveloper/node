import { Router } from 'express';
import { TodosController } from './controller';
import { TodoDatasourceImpl } from '../../infrastructure/datasources/todo.datasource.impl';

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new TodoDatasourceImpl();
    const todosController = new TodosController(datasource);

    router.get('/', todosController.getTodos);
    router.get('/:id', todosController.getTodoById);

    router.post('/', todosController.createTodo);
    router.put('/:id', todosController.updateTodo);

    router.delete('/:id', todosController.deleteTodo);

    return router;
  }
}
