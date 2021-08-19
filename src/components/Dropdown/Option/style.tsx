import styled from "styled-components";

export const StyledOption = styled.option`
  color: ${(props) => (props.selected ? "lightgrey" : "black")};
`;
