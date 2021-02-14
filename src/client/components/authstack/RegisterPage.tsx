import React from 'react';
import '../../scss/app';
import Register from './Register';

const RegisterPage: React.FC<RegisterPageProps> = () => {
	return (
		<div className="register-course h-100 d-flex align-items-center">
			<div className="container">
				<div className="row d-flex justify-content-center">
					<div className="col-lg-6">
						<Register />
					</div>
				</div>
			</div>
		</div>
	);
};

interface RegisterPageProps {}

export default RegisterPage;
