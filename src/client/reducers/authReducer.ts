import { UserAction } from '../utils/types';
import { LOG_IN, LOG_OUT } from '../actions/types';

const INITIAL_STATE = {
	userid: 0,
	role: 'guest',
};

export default (state = INITIAL_STATE, action: UserAction) => {
	switch (action.type) {
		case LOG_IN:
			return action.payload;
		case LOG_OUT:
			return {
				userid: 0,
				role: 'guest',
			};
		default:
			return state;
	}
};
