import { Editor } from '../App/pages';

export const editor = {
    dashboard: {
        title: 'Editor',
        path: '/editor',
        exact: true,
        components: {
            mainView: Editor,
        },
        contextRoot: 'dashbaord',
        context: 'dashboard',
    },
};
