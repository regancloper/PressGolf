import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';

import { logIn } from '../../actions';
import '../../scss/app';
import { apiService, SetAccessToken } from '../../utils/api';
import { UserAction } from '../../utils/types';
// import { AuthContext } from '../providers/AuthProvider';

interface RegisterProps {
	logIn: (userid: number, role: string) => UserAction;
}

const Register: React.FC<RegisterProps> = ({ logIn }) => {
	const history = useHistory();
	// const { login } = useContext(AuthContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [validated, setValidated] = useState(false);
	const [registerBtn, setRegisterBtn] = useState<JSX.Element>(
		<button
			type="submit"
			className="btn btn-block btn-primary shadow rounded-0 py-2"
		>
			Register
		</button>
	);

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
			setValidated(true);
		} else {
			setRegisterBtn(
				<button
					className="btn btn-block btn-primary shadow rounded-0 py-2"
					type="submit"
					disabled
				>
					<span
						className="spinner-border"
						role="status"
						aria-hidden="true"
					></span>
					<span className="mx-2">Loading...</span>
				</button>
			);
			try {
				let result = await apiService('/auth/register', 'POST', {
					email,
					password,
					firstName,
					lastName,
				});
				if (result) {
					// below line is how login works with Redux
					logIn(result.userid, result.role);
					// below line is how login works with React Context
					// login(result.userid, result.role);
					SetAccessToken(result.token, {
						userid: result.userid,
						role: result.role,
					});
					history.push('/');
				} else {
					// replace with error handling
					console.log('Registration unsuccessful ...');
				}
			} catch (e) {
				throw e;
			}
		}
	};

	return (
		<div className="bg-white shadow-lg p-4 rounded-0">
			<Form noValidate validated={validated} onSubmit={handleRegister}>
				<div className="row justify-content-center">
					<div className="col-sm-10">
						<h1 className="m-0">Create Your Account</h1>
						<p className="pb-3 my-0 register-subtext">
							Create a free account and get started.
						</p>

						<Form.Group className="raleway">
							<Form.Label className="m-0">Email</Form.Label>
							<Form.Control
								type="email"
								required
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setEmail(e.target.value)
								}
							/>
							<Form.Control.Feedback type="invalid">
								Please provide a valid email address.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="raleway">
							<Form.Label className="m-0">Password</Form.Label>
							<Form.Control
								type="password"
								required
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPassword(e.target.value)
								}
							/>
							<Form.Control.Feedback type="invalid">
								Please provide a password.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="raleway">
							<Form.Label className="m-0">First Name</Form.Label>
							<Form.Control
								type="text"
								required
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setFirstName(e.target.value)
								}
							/>
							<Form.Control.Feedback type="invalid">
								Please provide your first name.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="raleway mb-3">
							<Form.Label className="m-0">Last Name</Form.Label>
							<Form.Control
								type="text"
								required
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setLastName(e.target.value)
								}
							/>
							<Form.Control.Feedback type="invalid">
								Please provide your last name.
							</Form.Control.Feedback>
						</Form.Group>
						<div className="mt-4 d-flex justify-content-center">
							{registerBtn}
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default connect(null, { logIn })(Register);
