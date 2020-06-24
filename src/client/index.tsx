import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './scss/app';
import { AuthProvider } from './components/providers/AuthProvider';

render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    document.getElementById("root")
);