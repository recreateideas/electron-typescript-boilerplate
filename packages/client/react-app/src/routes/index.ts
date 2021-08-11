import { editor } from './editor';

export const routes = {
    ...editor,
    /* leave this route last, fallback */
    // notFound: {
    //     title: 'ooooOOPS..!',
    //     path: '',
    //     exact: true,
    //     components: {
    //         mainView: React.lazy(() =>
    //             import('../../Pages/404' /* webpackChunkName: "404-page" */)
    //         )
    //     }
    // }
};
