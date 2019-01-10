import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoService } from './todo.service';
import { Todo } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  public todos: Todo[];
  public activeTasks: number;
  public newTodo: string;
  public path: string;

  constructor(private todoService: TodoService, private route: ActivatedRoute) {  }

  public async getTodos() {
    this.todos = await this.todoService.get(this.path);
    this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
  }

  public async addTodo() {
    await this.todoService.add({ title: this.newTodo, isDone: false });
    this.getTodos();
    this.newTodo = '';
  }

  public async updateTodo(todo: Todo, updatedValue: string) {
    todo.title = updatedValue;
    await this.todoService.put(todo);
    todo.editing = false;
    this.getTodos();
  }

  public async deleteTodo(todo: Todo) {
    await this.todoService.delete(todo);
    this.getTodos();
  }

  public async deleteCompletedTodos(): Promise<void> {
    await this.todoService.deleteCompleted()
    this.getTodos();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos();
    });
  }

}
