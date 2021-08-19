import styled from "styled-components";

const DropdownWrapper = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`;

const StyledSelect = styled.select `
    max-width: 50%;
    height: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
  margin-bottom: 1rem;
`;

const StyledButton = styled.input`
  max-width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  border: solid 2px blue;
  padding: 0.5rem;
  border-radius: 1rem;
`;

export { DropdownWrapper, StyledSelect, StyledLabel, StyledButton };