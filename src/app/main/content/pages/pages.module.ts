import { NgModule } from '@angular/core';

import {ErrorPagesModule} from './errors/errors.module';
import {AuthPagesModule} from './authentication/authentication.module';
import {FuseAnalyticsDashboardModule} from './dashboard/analytics.module';
import {FuseCallbackModule} from './callback/callback.module';

@NgModule({
    imports: [
        // Errors
        ErrorPagesModule,

        // authentication (login, register)
        AuthPagesModule,


        FuseAnalyticsDashboardModule,

        // callback
        FuseCallbackModule
    ]
})
export class FusePagesModule
{

}
