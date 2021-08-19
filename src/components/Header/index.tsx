import styled from 'styled-components';
import React from "react";

const Header: React.FC = () => {
  return (
    <NavigationBar>
      <Item><Link isActive={true} href="/">Home</Link></Item>
      <Item><Link isActive={false} href="/posts">Posts</Link></Item>
    </NavigationBar>
  )
}

interface ActiveProps {
  readonly isActive: boolean;
}

const NavigationBar = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
`;

const Item = styled.li`
  float: left;
`;

const Link = styled.a<ActiveProps>`
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;

  &:hover {
    background-color: #111;
  }

  background-color: ${(props) => (props.isActive ?  "#04AA6D" : null)};
`;

export default Header;
