import css from 'styled-jsx/css';
const orderListFilterStyles = css`
    :focus {
      outline: 0;
    }
    span {
      line-height: 36px;
      margin-right: 20px;
    }
    span.btn-wrap {
      margin-right: 0;
    }
    .filter-wrap {
      padding: 5px 5px 20px;
    }
    .filter-wrap > div {
      margin-bottom: 14px
    }
    .filter-wrap > div:last-child {
      margin-bottom: 0;
    }
    .btn-wrap {
      display: inline-block;
    }
    .datepicker-wrap {
      position: absolute;
      display: inline-flex;
      z-index: 11;
    }
    .datepicker-wrap > div {
      min-width: 307.72px;
    }
    .datepicker-wrap span {
      position: absolute;
      min-width: 230px;
      left: 317px;
    }
    .datepicker-wrap button {
      width: 53px;
      height: 36px;
      border: solid 1px #dbdbdb;
      background: white;
      color: #474747;
      border-radius: 4px;
      margin: 0 0 0 6px;
      padding: 0;
      font-size: 14px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
    }
    .datepicker-wrap button:hover, 
    .datepicker-wrap button:active, 
    .datepicker-wrap button.active {
      border-color: #f26c55;
    }
    .datepicker-wrap button:first-child {
      margin: 0;
    }
    .lm-31 {
      margin-left: 31px;
    }
    hr {
      width: 100%;
      height: 1px;
      background: #eee;
    }
`;

export default orderListFilterStyles;

