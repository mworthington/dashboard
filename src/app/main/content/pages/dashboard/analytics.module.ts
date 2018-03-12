import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseAnalyticsDashboardComponent } from './analytics.component';
import { AnalyticsDashboardService } from './analytics.service';
import { FuseWidgetModule } from '../../../../core/components/widget/widget.module';

import {AuthGuard} from '../../../../auth/auth.guard';

const routes: Routes = [
    {
        path     : 'analytics-dashboard',
        canActivate: [
            AuthGuard
          ],
        component: FuseAnalyticsDashboardComponent,
        resolve  : {
            data: AnalyticsDashboardService
        }
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
        FuseAnalyticsDashboardComponent
    ],
    providers   : [
        AuthGuard,
        AnalyticsDashboardService
    ]
})
export class FuseAnalyticsDashboardModule
{
}

