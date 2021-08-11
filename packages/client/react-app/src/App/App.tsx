import { ReactElement } from 'react';
import { ConnectedRouter as Router } from 'connected-react-router';
import { Switch, Redirect, Route } from 'react-router-dom';
import { history } from '../redux';
import { routes } from '../routes';
import { AuthenticatedRoute } from './features';
import { Application } from './styledComponents';

export const App = (): ReactElement => {
    return (
        <Application>
            <Router history={history}>
                {/* <AuthenticatedRoute render={(props) => <SideBar {...props} />} /> */}
                <Switch>
                    {Object.values(routes).map((routeObj, i) => {
                        const {
                            title,
                            exact,
                            path,
                            components: { mainView: Component },
                        } = routeObj;
                        return (
                            <AuthenticatedRoute
                                key={i}
                                exact={exact}
                                path={path}
                                title={title}
                                render={(props) => (
                                    // <ErrorBoundary>
                                    //     <PageContainer>
                                    //         <Header title={title} />
                                    //         <PageContent className="page-content">
                                    <Component {...props} />
                                    //         </PageContent>
                                    //     </PageContainer>
                                    // </ErrorBoundary>
                                )}
                            />
                        );
                    })}
                    <Route path="/">
                        <Redirect exact to="/editor" />
                    </Route>
                </Switch>
            </Router>
        </Application>
    );
};

App.displayName = 'App';

App.defaultProps = {};
