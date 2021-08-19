import React from 'react';
import { DropdownWrapper, StyledSelect, StyledLabel, StyledButton } from './style';

type DropdownProps = {
    formLabel: string;
    action: string;
    onChange: (e: any) => void
}

export const Dropdown: React.FC<DropdownProps> = ({ formLabel, action, children, onChange }) => {
    return (
        <DropdownWrapper action={action} onChange={onChange}>
            <StyledLabel htmlFor="categories">
                {formLabel}
            </StyledLabel>
            <StyledSelect id="categories" name="categories">
                {children}
            </StyledSelect>
        </DropdownWrapper>
    )
};

