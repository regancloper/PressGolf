import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../scss/app';

interface LoginProps { }

export const Login: React.FC<LoginProps> = () => {
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLoginSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        // try {
        //     let result = await json('/auth/login', 'POST', {
        //         email,
        //         password
        //     });
        //     if (result) {
        //         login(result.userid, result.role);
        //         SetAccessToken(result.token, { userid: result.userid, role: result.role });
        //         history.push('/');
        //     } else {
        //         // replace with better user alert
        //         alert('You entered the wrong credentials! Please try again.');
        //     }
        // } catch (e) {
        //     throw e;
        // }
    }

    return (
        <div className="bg-dark p-4 rounded text-white shadow">
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
                        className="btn btn-primary btn-block mt-4 shadow-lg py-2"
                        type="submit"
                        onClick={handleLoginSubmit}
                    >
                        Sign In</button>
                    

                </div>


            </form>
        </div >
    );
}