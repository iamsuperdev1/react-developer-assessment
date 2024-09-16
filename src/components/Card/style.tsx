import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div `
    box-shadow: 0 0 25px lightgray;
    padding: 10px 15px;
    width: 80%;
    margin: 10px auto;
    background-color: white;
    transition: all 0.5s;

    &:hover {
        background-color: lightgoldenrodyellow;
    }
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
`;

const CardHeaderImage = styled.img`
    padding: 5px 10px;
`;

const CardHeaderName = styled.p`
    padding: 5px 10px;
    font-size: 18px;
    font-weight: 700;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    &:hover {
        color: black;
    }
`;

const CardBodyTitle = styled.p`
    font-size: 16px;
    font-weight: 700;
    padding: 5px 15px;
`;

const CardBodySummary = styled.p`
    font-size: 16px;
    font-style: italic;
    padding: 5px 15px;
`;

const CardFooter = styled.div`
    p {
        text-align: right;
        font-size: 16px;
        font-style: italic;
    }
`;

export {
    StyledLink,
    CardContainer,
    CardHeader,
    CardHeaderImage,
    CardHeaderName,
    CardBodyTitle,
    CardBodySummary,
    CardFooter
};
