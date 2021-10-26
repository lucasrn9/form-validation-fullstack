import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const MainHeader = ({ getCookie, handleLogout }) => {

    return (
        <Header className="header">
            <Nav>
                {getCookie('loggedIn') ? (
                    <Button onClick={handleLogout}>Logout</Button>) : (
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>)}
            </Nav>
        </Header>
    )

}

MainHeader.propTypes = {
    getCookie: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired
    }

export default MainHeader;

const Header = styled.header`
width: 100vw;
height: 10vh;
display: flex;
justify-content: flex-end;
align-items: center;
border-bottom: 1px solid rgba(250,250,250,0.2);
`

const Nav = styled.nav`
padding: 0 32px;
`

const Button = styled.button`
height: 40px;
width: 80px;
border: none;
border-radius: 8px;
cursor: pointer;
font-family: ${(props) => props.theme.fonts.default};
font-weight: 600;
font-size: 16px;
`