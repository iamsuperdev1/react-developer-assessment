import styled from 'styled-components';

const Panel = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px 15px;
    max-width: 75vw;
`;

const PanelLeft = styled.div`
    padding: 10px 15px;
`;

const PanelImage = styled.img`
    background: transparent;
    border-radius: 50%;
`

const PanelRight = styled.div`
    padding: 15px 20px;
    background: white;
    box-shadow: 0 5px 10px -6px rgb(0 0 0 / 15%);
    line-height: 1.4;
`;

const PanelParagraph = styled.p`
    margin: 5px 0;
    &:nth-child(1) {
        font-size: 20px;
        font-weight: 500;
        word-spacing: 3.1px;
    }
    &:nth-child(2) {
        font-size: 14px;
        color: #777 !important;
      }
      &:nth-child(3) {
        font-weight: 500;
        font-size: 15px;
      }
      &:nth-child(4) {
        font-style: italic;
      }
`;

const PanelSpan = styled.span`
    display: inline-block;
    margin: 10px 0;
    font-size: 14px;
    font-style: italic;
    width: 100%;
    text-align: right;
`;

const PanelUL = styled.ul`
    list-style: inside;
    padding: 0 10px;
`
const PanelLi = styled.li`
    font-size: 16px;
    font-weight: 300;
`

const PanelFooter = styled.div `
    text-align: right;
`

const PabelBackBtn = styled.a `
    display: inline-block;
    text-decoration: none;
    background: lightblue;
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 1px 2px lightslategrey;
    color: gray;
    transition: all 0.5s;
    &:hover {
    color: white;
    cursor: pointer;
    }
`

export { Panel, PanelLeft, PanelImage, PanelRight, PanelParagraph, PanelSpan, PanelUL, PanelLi, PanelFooter, PabelBackBtn };