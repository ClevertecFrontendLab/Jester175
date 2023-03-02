import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SignIn } from 'components/auth/sign-in';
import { SignUp } from 'components/auth/sign-up';
import { Layout } from 'components/layout';
import { LayoutMain } from 'components/layout-main';
import { AuthPage } from 'pages/auth';
import { store } from 'store';

import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { Terms } from './pages/terms';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Provider store={store}>
		<HashRouter>
			<Routes>
				<Route element={<AuthPage />}>
					<Route path='/' element={<Navigate to='/auth' />} />
					<Route path='/auth' element={<SignIn />} />
					<Route path='/registration' element={<SignUp />} />
				</Route>
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
	</Provider>
);
