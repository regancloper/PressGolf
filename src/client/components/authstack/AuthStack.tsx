import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../Home';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const AuthStack: React.FC<AuthStackProps> = () => {

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


interface AuthStackProps { }



export default AuthStack;
