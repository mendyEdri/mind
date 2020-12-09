import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import AuthRoute from "../Utils/AuthRoute";
import ProtectedRoute from '../Utils/ProtectedRoute';
import { AuthProvider } from "../Context/auth";
import MenuBar from "../Components/MenuBar";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import NotFound from "../Pages/NotFound";
import SinglePost from '../Pages/SinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <ProtectedRoute exact path='/posts/:postId' component={SinglePost}/>
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
