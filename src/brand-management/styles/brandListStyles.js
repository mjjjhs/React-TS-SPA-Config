import css from 'styled-jsx/css';

const brandListStyles = css`
    .brand-list-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        min-width: 812px;
    }
    .brand-list-wrap > div:nth-of-type(1) {
        display: flex;
        align-items: center;
    }
    .list-total-length {
        margin-left: 10px;
        font-size: 12px;
    }
    table {
        width: 100%;
        min-width: 812px;
        table-layout: fixed;
        display: table;
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
        font-size: 14px;
    }
    td {
        text-align: center;
    }
    td:nth-of-type(3) {
        text-overflow: ellipsis;
        overflow:hidden; 
        white-space:nowrap;
    }
    th {
        font-weight: normal;
        background-color: #f6f6f6;
    }
    th.modify {
        width: 80px;
    }
    th.bran-name {
        width: 25%;
    }
    th.brand-id {
        width: 9.9%;
    }
    th.relation-product-length, th.is-activated {
        width: 11.2%;
    }
    th.created-at, th.updated-at {
        width: 17.1%;
    }
    tbody tr:nth-child(even) {
        background-color: #fafbfc;
    }
    tbody tr:hover {
        background-color: #ecf5ff;
    }
    td:nth-of-type(4) {
        color: #007aff;
        text-decoration: underline;
        cursor: pointer;
    }
    .pull-divider {
        height: 1px;
        background-color: #eee;
        border-bottom: none;
        margin: 0 -15px;
        margin-top: 19px;
        margin-bottom: 23px;
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

export default brandListStyles;

