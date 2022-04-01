import React from 'react';
import ReactDOM from 'react-dom';
import store from './features/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Styles
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Components
import Layout from './components/Layout';
import Auth from './components/Auth/Auth';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import Boards from './components/Boards';
import App from './components/App';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" element={<Homepage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/boards"
							element={
								<Auth>
									<Boards />
								</Auth>
							}
						></Route>
						<Route
							path="/boards/:boardId"
							element={
								<Auth>
									<App />
								</Auth>
							}
						></Route>
						<Route path="*" element={<p>404! Nothing Found!</p>} />
					</Route>
				</Routes>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
