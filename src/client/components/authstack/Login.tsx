import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { apiService, SetAccessToken } from '../../utils/api';
import { AuthContext } from '../providers/AuthProvider';
import '../../scss/app';

interface LoginProps { }

export const Login: React.FC<LoginProps> = () => {
    const history = useHistory();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);
    const [loginBtn, setLoginBtn] = useState<string | JSX.Element>('Sign In');

    const handleLoginSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setLoginBtn(
            <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="mx-2">Logging In...</span>
            </>
        );
        setDisabled(true);

        try {
            let result = await apiService('/auth/login', 'POST', {
                email,
                password
            });
            if (result) {
                login(result.userid, result.role);
                SetAccessToken(result.token, { userid: result.userid, role: result.role });
                history.push('/');
            } else {
                // replace with better user alert
                alert('You entered the wrong credentials! Please try again.');
                setLoginBtn('Sign In');
                setDisabled(false);
            }
        } catch (e) {
            throw e;
        }
    }

    return (
        <div className="bg-white p-4 rounded-0 shadow-lg">
            <form className="form-signin d-flex flex-column justify-content-center" id="login-form">

                <h1 className="w-75 register-text m-auto text-center" style={{ fontWeight: 400, fontSize: '3rem' }}>
                    Sign In
                </h1>
                <p className="text-center register-subtext pt-2">And start playing.</p>
                <div className="my-3 raleway">
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input
                        type="password"
                        id="inputPassword"
                        className="form-control mt-3"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <button
                        className="btn btn-primary btn-block mt-4 shadow-lg py-2 rounded-0"
                        type="submit"
                        onClick={handleLoginSubmit}
                        disabled={disabled}
                    >
                        {loginBtn}
                    </button>


                </div>


            </form>
        </div >
    );
}