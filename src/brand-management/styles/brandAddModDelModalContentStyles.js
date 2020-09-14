import css from 'styled-jsx/css';

const brandAddModDelModalContentStyles = css`
    .modal-content-wrap {
        padding: 30px;
    }
    .row {
        box-sizing: border-box;
        margin-bottom: 20px;
        line-height: 36px;
        font-size: 14px;
    }
    .row:nth-of-type(1) {
        display: none;
        line-height: 17px;
    }
    .row:nth-of-type(1) > div {
        margin-left: auto;
        margin-right: 632px;
    }
    .row:nth-of-type(1) p {
        margin: 0;
        line-height: 17px;
    }
    .row.show {
        display: flex;
    }
    .row:nth-of-type(2),
    .row:nth-of-type(5),
    .row:nth-of-type(6),
    .row:nth-of-type(3) > div,
    .row:nth-of-type(4) > div,
    .row:nth-of-type(6) > div {
        display: flex;
    }
    .row:nth-of-type(7) > span:nth-of-type(3) {
        margin-left: auto;
        margin-right: 548px;
    }
    
    .row:nth-of-type(7),
    .column-wrap > div {
        display: flex;
        align-items: center;
    }
    .column-wrap > div {
        margin-bottom: 10px;
    }
    .column-wrap > div:last-child {
        margin-bottom: 0;
    }
    .column-wrap {
        flex-direction: column;
        flex-wrap: wrap;
    }
    .row:nth-of-type(2) > div,
    .row:nth-of-type(5) > div,
    .row:nth-of-type(6) > div,
    .row:last-child > div,
    .adding-file-wrap {
        margin-left: auto;
    }
    .adding-file-wrap {
        margin-right: 512px;
    }
    .row:nth-of-type(4) .adding-file-wrap {
        margin-right: 445px;
    }
    .row:nth-of-type(5) > div {
        height: 96px;
    }
    .column-wrap > div > span:nth-of-type(2) {
        margin-left: 10px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    .column-wrap > div > span:nth-of-type(2),
    .column-wrap > div > span:nth-of-type(3) {
        border: solid 1px #dbdbdb;
        box-sizing: border-box;
        overflow: hidden;
        width: 36px;
        height: 36px;
    }
    .column-wrap > div > span:nth-of-type(3) {
        margin-left: -1px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    .row:last-child {
        margin-bottom: -10px;
        display: flex;
    }
    .row:nth-of-type(7) {
        line-height: 18px;
        border-bottom: 1px solid #eee;
        padding-bottom: 30px;
        margin-bottom: 20px;
    }
    .row > span:nth-of-type(2),
    .row > div > span:nth-of-type(2){
        font-size: 8px;
        color: #ff402c;
        vertical-align: top;
        top: -3px;
    }
    .row > p {
        margin: 10px 0 0 0;
        color: #a8a8a8;
        padding-left: 84px;
        font-size: 14px;
        line-height: 17px;
    }
    .row.is-error {
        margin-bottom: 10px;
    }
    .input-error-msg {
        margin: 4px 0 0 0;
        font-size: 12px;
        line-height:15px;
        color: #ff402c;
    }
    .brand-del-btn {
        text-decoration: underline;
        color: #474747;
    }
    .notice-btn:not(.disabled):hover {
        z-index: 10;
        border-color: #a8a8a8 !important;
    }
`;

export default brandAddModDelModalContentStyles;

