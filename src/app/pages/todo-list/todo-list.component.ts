import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../../models/todo.model';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  private models: TodoModel[] = [];

  public showCompleted = false;

  constructor() { }

  ngOnInit(): void {

    if (localStorage.getItem('todos')) {
      this.models = JSON.parse(localStorage.getItem('todos'));
    } 

    setInterval(
      () => {
        localStorage.setItem('todos', JSON.stringify(this.models))
      }, 100)

  }

  getModels(completed: boolean): TodoModel[] {
    if (completed) {
      return this.models;
    }
    return this.models.filter((e) => !e.complete);
  }


  newTodo(): void {

    let description = prompt('Descrição do Todo');

    this.models.push(new TodoModel({
      uid: this.getlastuid(),
      description: description,
      complete: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

  }

  getlastuid(): string {

    const x = (parseInt(this.models[this.models.length - 1]?.uid) || 0) + 1;
    return x.toString();

  }

  deleteModel(model: TodoModel): void {

    this.models.splice(this.models.indexOf(model), 1);

  }

  updateModel(model: TodoModel): void {

    model.description = prompt('description');
    model.updatedAt = new Date();

  }



}
