import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';

@Component({
    selector   : 'fuse-callback',
    templateUrl: './callback.component.html',
    styleUrls  : ['./callback.component.scss'],
    animations : fuseAnimations
})
export class FuseCallbackComponent implements OnInit
{
    constructor(
        private fuseConfig: FuseConfigService,
    )
    {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });
    }

    ngOnInit()
    {
    }
}
