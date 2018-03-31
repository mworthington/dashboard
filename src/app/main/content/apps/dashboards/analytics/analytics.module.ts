import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseAnalyticsDashboardComponent } from './analytics.component';
import { AnalyticsDashboardService } from './analytics.service';
import { FuseWidgetModule } from '../../../../../core/components/widget/widget.module';

import {AuthGuard} from '../../../../../auth/auth.guard';
import {AdminGuard} from '../../../../../auth/admin.guard';

const routes = [
    {
        path     : '**',
        component: FuseAnalyticsDashboardComponent,
        resolve  : {
            data: AnalyticsDashboardService
        },
        canActivate: [
            AdminGuard
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
        FuseAnalyticsDashboardComponent
    ],
    providers   : [
        AnalyticsDashboardService
    ]
})
export class FuseAnalyticsDashboardModule
{
}

