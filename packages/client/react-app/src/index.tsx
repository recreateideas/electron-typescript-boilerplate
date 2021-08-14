import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import { App, ThemeProviderConnected } from './App';

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProviderConnected>
                <App />
            </ThemeProviderConnected>
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);
