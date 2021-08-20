import styled from 'styled-components';

interface ActiveProps {
    readonly isActive: boolean;
}

const NavigationBar = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 0 25px lightgrey;

`;

const Item = styled.li`
  float: left;
`;

const Link = styled.a<ActiveProps>`
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  box-shadow: 1px 2px 10px lightgrey;
  font-size: 18px;
  background-color: #fff;
  font-weight: 500;
  transition: all 0.5s;
  &:hover {
    background-color: green;
  }

  background-color: ${(props) => (props.isActive ? "#04AA6D" : null)};
`;

export { Item, Link, NavigationBar };
