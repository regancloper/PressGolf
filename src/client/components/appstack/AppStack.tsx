import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Profile from './Profile';
import PostScore from './PostScore';
import Scorecard from './Scorecard';


const AppStack: React.FC<AppStackProps> = () => {

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/post">
					<PostScore />
				</Route>
				<Route exact path="/scorecard">
					<Scorecard />
				</Route>
				<Route path="/">
					<Profile />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}


interface AppStackProps { }



export default AppStack;
