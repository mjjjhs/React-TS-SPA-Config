import css from 'styled-jsx/css';

const brandRelationDealListModalContentStyles = css`
    .modal-content-wrap {
        padding: 30px;
    }
    .radio-wrap {
        display: flex;
        align-items: center;
        line-height: 18px;
        border-bottom: 1px solid #eee;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }
    .radio-wrap > div {
        display: flex;
        font-size: 12px;
    }
    .radio-wrap > div:nth-of-type(2) {
        margin-left: 60px;
    }
    .radio-title {
        margin-right: 20px;
        font-size: 14px;
    }
    .deal-total-count {
        font-size: 12px;
    }
    table {
        width: 100%;
        min-width: 812px;
        table-layout: fixed;
        display: table;
        font-size: 14px;
        margin-bottom: 30px;
    }
    table, th, td {
        box-sizing: border-box;
        border-collapse: collapse;
    }
    thead, tbody {
        border: 1px solid #eee;
    }
    th, td {
        height: 36px;  
        border: 1px solid #eee;
    }
    td {
        text-align: center;
    }
    th {
        font-weight: normal;
        background-color: #f6f6f6;
    }
    th.deal-id, th.deal-sale-status {
        width: 70px;
    }
    th.deal-supply {
        width: 80px;
    }
    th.deal-sale-start, th.deal-sale-end {
        width: 138px;
    }
    td:nth-of-type(2) {
        text-overflow: ellipsis;
        overflow:hidden; 
        white-space:nowrap;
        text-decoration: underline;
        color: #007aff;
        cursor: pointer;
    }
    tbody tr:nth-child(even) {
        background-color: #fafbfc;
    }
    .no-data {
        border: none;
        width: 100%;
    }
    .no-data tr:hover {
        background-color: unset;
    }
    .no-data td {
        width: 100%;
        height: 17px;
        padding: 40px 0;
        vertical-align: top;
        border: none;
    }
    .pagination-wrap {
        line-height: 18px;
    }
`;

export default brandRelationDealListModalContentStyles;

