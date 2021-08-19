import React from "react";
import Header from "./Header";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import { Route, Switch, Redirect } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Redirect to="/posts" />
        </Route>
        <Route exact path="/posts">
          <PostList />
        </Route>
        <Route path="/posts/:postId">
          <PostDetail />
        </Route>
      </Switch>

    </div>
  );
};

export default App;
