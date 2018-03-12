import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';

import { FuseCallbackComponent } from './callback.component';

const routes = [
    {
        path     : 'callback',
        component: FuseCallbackComponent
    }
];

@NgModule({
    declarations: [
        FuseCallbackComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class FuseCallbackModule
{}
