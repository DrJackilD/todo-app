import { Injectable } from '@angular/core';

export interface Todo {
  title: string;
  isDone: boolean;
  editing?: boolean;
}

let TODOS: Todo[] = [
  { title: 'Style app', isDone: true },
  { title: 'Finish service functionality', isDone: false },
  { title: 'Setup API', isDone: false },
  { title: 'Get sleep', isDone: false },
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  get(query: string): Promise<Todo[]> {
    return new Promise(resolve => {
      let data: Todo[];

      if (query === 'active' || query === 'completed') {
        const isCompleted = query === 'completed';
        data = TODOS.filter(todo => todo.isDone === isCompleted);
      } else {
        data = TODOS;
      }
      resolve(data);
    });
  }

  add(data: Todo): Promise<Todo> {
    return new Promise(resolve => {
      TODOS.push(data);
      resolve(data);
    });
  }

  put(data: Todo): Promise<Todo> {
    return new Promise(resolve => {
      const index: number = TODOS.findIndex(todo => todo === data);
      TODOS[index].title = data.title;
      resolve(data);
    });
  }

  delete(data: Todo): Promise<Todo> {
    return new Promise(resolve => {
      const index: number = TODOS.findIndex(todo => todo === data);
      TODOS.splice(index, 1);
      resolve(data);
    });
  }

  deleteCompleted(): Promise<Todo[]> {
    return new Promise(resolve => {
      TODOS = TODOS.filter(todo => !todo.isDone);
      resolve(TODOS);
    });
  }
}
