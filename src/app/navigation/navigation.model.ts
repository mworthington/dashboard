import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class FuseNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'applications',
                'title'   : 'Applications',
                'translate': 'NAV.APPLICATIONS',
                'type'    : 'group',
                'children': [
                    {
                        'id'       : 'dashboards',
                        'title'    : 'Dashboards',
                        'translate': 'NAV.DASHBOARDS',
                        'type'     : 'collapse',
                        'icon'     : 'dashboard',
                        'children' : [
                            {
                                'id'   : 'analytics-dashboard',
                                'title': 'Project Associates',
                                'type' : 'item',
                                'url'  : '/apps/dashboards/analytics/analytics-dashboard'
                            },
                            {
                                'id'   : 'client-a-analytics-dashboard',
                                'title': 'Client A',
                                'type' : 'item',
                                'url'  : '/apps/dashboards/client-a/client-a-analytics-dashboard'
                            },
                            {
                                'id'   : 'client-b-analytics-dashboard',
                                'title': 'Client B',
                                'type' : 'item',
                                'url'  : '/apps/dashboards/client-b/client-b-analytics-dashboard'
                            },
                        ]
                    },
                    {
                        'id'       : 'calendar',
                        'title'    : 'Calendar',
                        'translate': 'NAV.CALENDAR',
                        'type'     : 'item',
                        'icon'     : 'today',
                        'url'      : '/apps/calendar'
                    },
                    {
                        'id'       : 'contacts',
                        'title'    : 'Contacts',
                        'translate': 'NAV.CONTACTS',
                        'type'     : 'item',
                        'icon'     : 'account_box',
                        'url'      : '/apps/contacts'
                    },
                    {
                        'id'       : 'to-do',
                        'title'    : 'To-Do',
                        'translate': 'NAV.TODO',
                        'type'     : 'item',
                        'icon'     : 'check_box',
                        'url'      : '/apps/todo',
                        'badge'    : {
                            'title': 3,
                            'bg'   : '#FF6F00',
                            'fg'   : '#FFFFFF'
                        }
                    },
                    {
                        'id'   : 'sample',
                        'title': 'Sample',
                        'translate': 'NAV.SAMPLE.TITLE',
                        'type' : 'item',
                        'icon' : 'email',
                        'url'  : '/sample',
                        'badge': {
                            'title': 25,
                            'translate': 'NAV.SAMPLE.BADGE',
                            'bg'   : '#F44336',
                            'fg'   : '#FFFFFF'
                        }
                    }
                ]
            }
        ];
    }
}
