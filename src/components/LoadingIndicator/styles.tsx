import styled from 'styled-components';

export const Loading = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    background: aliceblue;
    height: 100vh;
    &:after {
        content: " ";
        display: block;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: 8px;
        box-sizing: border-box;
        border: 32px solid #de8a23;
        border-color: #de8a23 transparent #de8a23 transparent;
        animation: lds-hourglass 1.2s infinite;
    }
`;