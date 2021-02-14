import { LOG_IN, LOG_OUT } from './types';

// action creator to log user in
export const logIn = (userid: number, role: string) => {
	return {
		type: LOG_IN,
		payload: {
			userid,
			role,
		},
	};
};

// action creator to log user out
export const logOut = () => {
	return {
		type: LOG_OUT,
	};
};
