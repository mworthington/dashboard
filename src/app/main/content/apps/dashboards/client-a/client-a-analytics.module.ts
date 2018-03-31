import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseClientAAnalyticsDashboardComponent } from './client-a-analytics.component';
import { AnalyticsDashboardService } from './../analytics/analytics.service';
import { FuseWidgetModule } from '../../../../../core/components/widget/widget.module';

import {AuthGuard} from '../../../../../auth/auth.guard';

const routes: Routes = [
    {
        path     : '**',
        component: FuseClientAAnalyticsDashboardComponent,
        resolve  : {
            data: AnalyticsDashboardService
        },
        canActivate: [
            AuthGuard
          ],
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        FuseWidgetModule,
        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        })
    ],
    declarations: [
        FuseClientAAnalyticsDashboardComponent
    ],
    providers   : [
        AnalyticsDashboardService
    ]
})
export class FuseClientAAnalyticsDashboardModule
{
}

