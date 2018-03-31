import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FuseTodoComponent } from './todo.component';
import { TodoService } from './todo.service';
import { FuseTodoMainSidenavComponent } from './sidenavs/main/main-sidenav.component';
import { FuseTodoListItemComponent } from './todo-list/todo-list-item/todo-list-item.component';
import { FuseTodoListComponent } from './todo-list/todo-list.component';
import { FuseTodoDetailsComponent } from './todo-details/todo-details.component';

import {AuthGuard} from '../../../../auth/auth.guard';
import {AdminGuard} from '../../../../auth/admin.guard';

const routes: Routes = [
    {
        path     : 'all',
        component: FuseTodoComponent,
        resolve  : {
            todo: TodoService
        },
        canActivate: [
            AuthGuard,
            AdminGuard
          ],
    },
    {
        path     : 'all/:todoId',
        component: FuseTodoComponent,
        resolve  : {
            todo: TodoService
        },
        canActivate: [
            AuthGuard,
            AdminGuard
          ],
    },
    {
        path     : 'tag/:tagHandle',
        component: FuseTodoComponent,
        resolve  : {
            todo: TodoService
        },
        canActivate: [
            AuthGuard,
            AdminGuard
          ],
    },
    {
        path     : 'tag/:tagHandle/:todoId',
        component: FuseTodoComponent,
        resolve  : {
            todo: TodoService
        },
        canActivate: [
            AuthGuard,
            AdminGuard
          ],
    },
    {
        path     : 'filter/:filterHandle',
        component: FuseTodoComponent,
        resolve  : {
            todo: TodoService
        },
        canActivate: [
            AuthGuard,
            AdminGuard
          ],
    },
    {
        path     : 'filter/:filterHandle/:todoId',
        component: FuseTodoComponent,
        resolve  : {
            todo: TodoService
        },
        canActivate: [
            AuthGuard,
            AdminGuard
          ],
    },
    {
        path      : '**',
        redirectTo: 'all'
    }
];

@NgModule({
    declarations: [
        FuseTodoComponent,
        FuseTodoMainSidenavComponent,
        FuseTodoListItemComponent,
        FuseTodoListComponent,
        FuseTodoDetailsComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers   : [
        TodoService
    ]
})
export class FuseTodoModule
{
}
