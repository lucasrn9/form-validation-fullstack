import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Register, Login } from './pages'
import { Header } from './components'

function App() {

  const [posts, setPosts] = useState([{
    title: '',
    body: ''
  }])

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const handleLogout = async () => {
    fetch('http://localhost:3333/api/logout', {
      credentials: 'include'
    })
    document.cookie = "loggedIn=false; expires=Thu, 18 Dec 2013 12:00:00 UTC;"
    setPosts({ error: 'You must be logged' })
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header getCookie={getCookie} handleLogout={handleLogout} />
        <Switch>
          <Route path="/" exact >
            <Home posts={posts} setPosts={setPosts} />
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
