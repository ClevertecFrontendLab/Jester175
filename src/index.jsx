import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from 'components/layout';
import { LayoutMain } from 'components/layout-main';

import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { Terms } from './pages/terms';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<HashRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route element={<LayoutMain />}>
						<Route path='/' element={<Navigate to='/books/all' />} />
						<Route path='/books/:category' element={<MainPage />} />
						<Route path='/terms' element={<Terms title='Правила пользования' />} />
						<Route path='/contract' element={<Terms title='Договор оферты' />} />
					</Route>
					<Route path='/books/:category/:bookId' element={<BookPage />} />
				</Route>
			</Routes>
		</HashRouter>
	</React.StrictMode>
);
