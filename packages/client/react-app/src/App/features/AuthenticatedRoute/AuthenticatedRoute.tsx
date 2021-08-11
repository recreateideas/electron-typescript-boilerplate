import { memo, ReactElement, useEffect, useLayoutEffect } from 'react';
import { LocationDescriptor } from 'history';
import { Route, Redirect } from 'react-router-dom';
import { isEqual } from 'lodash';
import { actions, selectors, useSelector, useDispatch } from '../../../redux';
// import { Header } from '..';

// redirectUrl: PropTypes.string,
// skipGetUser: PropTypes.bool,
// showBackButton: PropTypes.bool,
// title: PropTypes.string,
// contextRoot: PropTypes.string,
// };

interface IProps {
    redirectUrl?: LocationDescriptor<unknown>;
    title?: string;
    showBackButton?: boolean;
    exact?: boolean;
    path?: string | string[];
    location?: {
        pathname?: string;
    };
    render: (props: any) => ReactElement;
}

export const AuthenticatedRoute = memo((props: IProps) => {
    const { redirectUrl, title = 'Random', showBackButton, ...routeProps } = props;
    const {
        router: { setRouteParams },
    } = actions;
    const dispatch = useDispatch();
    const { router: routerSelectors } = selectors;
    const location = useSelector(routerSelectors.location);
    const isAuthenticated = true;

    const { location: locationProps, path } = routeProps;
    useEffect(() => {
        if (path && locationProps?.pathname) {
            dispatch(setRouteParams(path));
        }
    }, [dispatch, locationProps, path, setRouteParams]);

    useLayoutEffect(() => {
        document.title = `Stacks - ${title}`;
    }, [title]);

    const allProps = {
        ...routeProps,
        location,
    };
    return isAuthenticated ? (
        <>
            {/* <Header {...{ showBackButton }} /> */}
            <Route {...allProps} />
        </>
    ) : (
        /* istanbul ignore next */
        <Redirect to={redirectUrl as LocationDescriptor} />
    );
}, isEqual);

AuthenticatedRoute.displayName = 'AuthenticatedRoute';
