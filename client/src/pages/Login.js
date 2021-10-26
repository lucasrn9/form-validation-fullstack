import React from 'react';
import LoginForm from '../components/loginForm/LoginForm';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <Layout className="layout">
            <Container className="login-form-Container">
                <LoginForm className="login-form" />
                <RrLink to="/register">
                   Create account
                </RrLink>
            </Container>
        </Layout>
    )
}

const Layout = styled.div`
display:flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 89vh;
`

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 50%;
`

const RrLink = styled(Link)`
text-decoration: none;
color: white;
`

export default Login;