import css from "styled-jsx/css";

export default css`
    .content {
        font-size: 14px;
        padding: 30px 30px 20px 30px;
    }

    .content .row {
        display: flex;
        padding-bottom: 20px;
    }

    .content .row:first-of-type {
        padding-bottom: 20px;
    }

    .content .row:last-of-type {
        padding-top: 20px;
        padding-bottom: 0px;
        justify-content: flex-end;
        border-top: solid 1px #dbdbdb;
    }

    .content .row .rowTitle {
        display: inline-flex;
        width: 74px;
        margin-right: 10px;
    }
    
    .content .row .rowTitle.center {
      align-items: center;
    }

    .content .row .rowContent {
        width: 473px;
    }

    .content .rowTitle strong {
        vertical-align: top;
        font-size: 10px;
        color: #f26c55;
    }

    .edit .row:last-of-type {
        justify-content: space-between;
    }

    .addFileText {
        display: inline-block;
        margin-top: 10px;
        font-size: 14px;
        color: #a8a8a8;
    }

    .error {
        padding: 20px 0px 30px 0 !important;
    }

    .errorText {
        position: absolute;
        margin: 0;
        font-size: 12px;
        color: #ff402c;
    }

    .loadingWrapper {
        position: relative;
        display: flex;
        justify-content: center;
    }

    .loadingWrapper .loadingBtn {
        position: absolute;
        margin: auto;
    }
`;
