import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { store } from '@redux/configure-store';
import { MainPage } from './pages';

import 'normalize.css';
import 'antd/dist/antd.css'
import 'antd/lib/icon/style/index.css'
import './styles/index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                </Routes>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
);
