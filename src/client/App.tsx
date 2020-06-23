import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const App: React.FC<AppProps> = () => {


	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/login">
					<LoginPage />
				</Route>
				<Route exact path="/register">
					<RegisterPage />
				</Route>
			</Switch>
		</BrowserRouter>
	);

}


interface AppProps { }



export default App;
