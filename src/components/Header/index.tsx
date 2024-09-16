import React from "react";
import { Item, Link, NavigationBar } from './styles';

const Header: React.FC = () => {
  return (
    <NavigationBar>
      <Item><Link isActive={true} href="/">Home</Link></Item>
    </NavigationBar>
  )
}

export default Header;
