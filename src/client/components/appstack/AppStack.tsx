import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Profile from './Profile';


const AppStack: React.FC<AppStackProps> = () => {

	return (
		<BrowserRouter>
			<Switch>
				<Route>
					<Profile />
				</Route>
				{/* <Route exact path="/login">
					<LoginPage />
				</Route>
				<Route exact path="/register">
					<RegisterPage />
				</Route> */}
			</Switch>
		</BrowserRouter>
	);
}


interface AppStackProps { }



export default AppStack;
