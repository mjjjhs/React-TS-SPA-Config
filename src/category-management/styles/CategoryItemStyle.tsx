import css from 'styled-jsx/css';

export default css`
    .categoryList {
        height: 538px;
    }
    
    li {
        height: 38px;
    }

    li a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        padding: 0 13px;
    }
    
    li a span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    
    .titleText {
      width: 80%;
    }
    
    .statusText {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 20px;
        font-size: 12px;
        border-radius: 10px;
    }

    .used {
        border: solid 1px #007aff;
        color: #007aff;
    }

    .unused {
        border: solid 1px #ff402c;
        color: #ff402c;
    }

    .ready {
        border: solid 1px #a8a8a8;
        color: #a8a8a8;
    }

    .selected {
        background-color: #ecf5ff;
    }

    .focused {
        font-weight: bold;
    }
`;
