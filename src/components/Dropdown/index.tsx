import React from 'react';
import { DropdownWrapper, StyledSelect, StyledLabel, StyledOption } from './style';

type DropdownProps = {
    formLabel: string;
    action: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

type OptionProps = {
    selected?: boolean;
    value: string;
}

export const Option: React.FC<OptionProps> = ({ value, selected }) => {
    return (
        <StyledOption selected={selected}>
            {value}
        </StyledOption>
    )
}
