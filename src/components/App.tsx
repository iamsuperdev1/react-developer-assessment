import React from "react";
import Header from "./Header";
import PostList from "./PostList";

const App: React.FC = () => {
  return (
    <div>
      <Header></Header>
      <PostList></PostList>
    </div>
  );
};

export default App;
