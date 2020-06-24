import React, { useContext, useEffect } from 'react';
import AuthStack from './components/authstack/AuthStack';
import AppStack from './components/appstack/AppStack';
import { AuthContext } from './components/providers/AuthProvider';

const App: React.FC<AppProps> = () => {
	const { user, login } = useContext(AuthContext);

	useEffect(() => {
		// check if the user is logged in or not
		let token = localStorage.getItem('token');
		if (token) {
			console.log(token);
			// need to decode token to make sure its right
			login(Number(localStorage.getItem('userid')), localStorage.getItem('role'));
		} else {
			console.log('no token found!');
		}
	}, [])

	return (
		<>
			{user ? <AppStack /> : <AuthStack />}
		</>
	);

}


interface AppProps { }



export default App;
