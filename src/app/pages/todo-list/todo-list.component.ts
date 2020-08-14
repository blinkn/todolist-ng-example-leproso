import {Component, OnInit} from '@angular/core';
import {TodoModel} from '../../models/todo.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {state, trigger, style, transition, animate} from '@angular/animations';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('anim1', [
      state('onEnter', style({opacity: '1'})),
      transition('void => *', [
        style({transform: 'translateX(-40px)'}),
        animate(250)
      ])
    ])
  ]
})
export class TodoListComponent implements OnInit {

  public models: TodoModel[] = [];
  public uncompletedTodos = 0;
  public completedTodos = 0;
  public showCompleted = false;


  constructor(private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.firestore.firestore.collection('/todos').onSnapshot(collection => {
      const models: TodoModel[] = collection.docs.map(doc => new TodoModel({uid: doc.id, ...doc.data()}));
      this.models = models;
      this.uncompletedTodos = models.filter(m => !m.complete).length;
      this.completedTodos = models.filter(m => m.complete).length;
    });
  }

  delete(todo: TodoModel): void {
    this.firestore.doc('/todos/' + todo.uid).delete();
  }

  edit(todo: TodoModel): void {
    const des = prompt('Digite a nova descrição desse todo:', todo.description);
    this.firestore.doc('/todos/' + todo.uid).update({description: des});
  }

  completeTodo(todo: TodoModel, campo: HTMLInputElement): void {
    this.firestore.doc('/todos/' + todo.uid).update({complete: campo.checked});
  }

  newTodo(): void {
    const des = prompt('Descrição');
    this.firestore.collection('/todos').add({
      description: des,
      complete: false
    });
  }

}
