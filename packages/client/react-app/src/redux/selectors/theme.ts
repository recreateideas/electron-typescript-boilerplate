import { Selector } from 'react-redux';
import { IReduxStore } from '../store';
import { ThemeMode } from 'src/App/ui-core';
import { UserAgent } from '..';

const mode: Selector<IReduxStore, ThemeMode> = (state) => state.appState.theme.mode;
const isDarkMode: Selector<IReduxStore, boolean> = (state) => state.appState.theme.mode === 'dark';
const userAgent: Selector<IReduxStore, UserAgent | undefined> = (state) =>
    state.appState.theme.userAgent;

export { mode, isDarkMode, userAgent };
