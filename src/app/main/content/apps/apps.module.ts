import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { FuseAngularMaterialModule } from '../components/angular-material/angular-material.module';
import {AuthGuard} from '../../../auth/auth.guard';

const routes = [
    {
        path        : 'dashboards/project',
        loadChildren: './dashboards/project/project.module#FuseProjectDashboardModule'
    },
    {
        path        : 'dashboards/analytics',
        loadChildren: './dashboards/analytics/analytics.module#FuseAnalyticsDashboardModule'
    },
    {
        path        : 'dashboards/client-a',
        loadChildren: './dashboards/client-a/client-a-analytics.module#FuseClientAAnalyticsDashboardModule'
    },
    {
        path        : 'dashboards/client-b',
        loadChildren: './dashboards/client-b/client-b-analytics.module#FuseClientBAnalyticsDashboardModule'
    },
    {
        path        : 'calendar',
        loadChildren: './calendar/calendar.module#FuseCalendarModule'
    },
    {
        path        : 'todo',
        loadChildren: './todo/todo.module#FuseTodoModule'
    },
    {
        path        : 'contacts',
        loadChildren: './contacts/contacts.module#FuseContactsModule'
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        FuseAngularMaterialModule
    ],
    declarations: []
})
export class FuseAppsModule
{
}
