import styled from 'styled-components';

const Pagination = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
  
    .item {
        display: inline-block;
        padding: 10px 15px;
        border: 1px solid rgb(211 211 211);
        background: #fff;
        color: #3e58ed;
        font-weight: 700;
        font-size: 16px;
    }
    
    .item:hover {
        cursor: pointer;
        background-color: lightgray;
    }
    
    .item.active {
        background-color: #3e58ed;
        color: #fff;
    }
`;

export {
    Pagination
};
