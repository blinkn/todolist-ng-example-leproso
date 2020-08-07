import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { ConfigComponent } from './pages/config/config.component';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', redirectTo: 'todo-list', pathMatch: 'full'},
  {path: 'todo-list', component: TodoListComponent},
  {path: 'config', component: ConfigComponent},
  {path: '**', component: Error404Component}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoListComponent,
    ConfigComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
