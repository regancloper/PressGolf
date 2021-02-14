import React, { useContext, useEffect } from 'react';
import AuthStack from './components/authstack/AuthStack';
import AppStack from './components/appstack/AppStack';
import { connect } from 'react-redux';
import { logIn } from '../client/actions';
import { User, UserAction } from './utils/types';
// import { AuthContext } from './components/providers/AuthProvider';

const App: React.FC<AppProps> = ({ user, logIn }) => {
	// const { user, login } = useContext(AuthContext);

	useEffect(() => {
		// check if the user is logged in or not
		let token = localStorage.getItem('token');
		if (token) {
			// need to decode token to make sure its right
			logIn(
				Number(localStorage.getItem('userid')),
				localStorage.getItem('role')
			);
		} else {
			console.log('no token found!');
		}
	}, []);

	return <>{user.userid !== 0 ? <AppStack /> : <AuthStack />}</>;
};

const mapStateToProps = (state: { user: User }) => {
	return { user: state.user };
};

interface AppProps {
	user: User;
	logIn: (userid: number, role: string) => UserAction;
}

export default connect(mapStateToProps, { logIn })(App);
