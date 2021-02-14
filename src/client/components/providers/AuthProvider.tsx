import React, { useState } from 'react';

type User = null | { userid: number; role: string };

export const AuthContext = React.createContext<{
	user: User;
	login: (userid: number, role: string) => void;
	logout: () => void;
}>({
	user: null,
	login: () => {},
	logout: () => {},
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User>(null);

	return (
		<AuthContext.Provider
			value={{
				user,
				login: (userid, role) => {
					setUser({ userid, role });
				},
				logout: () => {
					setUser(null);
					localStorage.clear();
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
