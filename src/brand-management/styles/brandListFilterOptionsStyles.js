import css from 'styled-jsx/css';

const brandListFilterOptionsStyles = css`
    .list-opt-wrap {
        border-bottom: 1px solid #eee;
        padding-bottom: 20px;
        margin-bottom:23px;
    }
    .list-opt-wrap > div {
        display: flex;
    }
    .list-opt-wrap > div:nth-of-type(1) {
        margin: 0 0 20px 0;
    }
    .list-opt-wrap > div > span {
        margin: 0 20px 0 0;
    }
    .list-opt-wrap > div > span:last-child {
        margin: 0;
    }
    span {
        display: inline-flex;
        align-items: center;
        font-size: inherit;
    }
    .list-opt-wrap > div:nth-of-type(2) > span:nth-of-type(1) {
        margin: 0 46px 0 0;
    }
    .list-opt-wrap > div:nth-of-type(2) > span:last-child {
        margin-left: -3px;
        margin-right: 0;
        border: 1px solid #dbdbdb;
        z-index: 10;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        overflow: hidden;
        background-color: #fff;
    }
    .list-opt-wrap > div:nth-of-type(2) > span.focus {
        outline: none;
        border-color: #a8a8a8;
    }
    
`;

export default brandListFilterOptionsStyles;

