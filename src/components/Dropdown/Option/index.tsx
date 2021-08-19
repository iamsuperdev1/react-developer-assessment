import React from 'react';
import { StyledOption } from './style';

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