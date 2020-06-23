import React from 'react';
import { Login } from './Login';

interface LoginPageProps {

}

const LoginPage: React.FC<LoginPageProps> = ({ }) => {
    return (
        <div className="login-course h-100 d-flex align-items-center">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-6">
                        <Login />
                    </div>
                </div>

            </div>

        </div>
    );
}

export default LoginPage;