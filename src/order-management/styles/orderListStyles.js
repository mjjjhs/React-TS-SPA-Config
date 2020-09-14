import css from 'styled-jsx/css';

const orderListStyles = css`
    .order-list-wrap {
        padding: 20px 5px 8px;
    }
    .total-length {
        font-size: 12px;
        line-height: 12px;
        margin: 0 0 10px 0 !important;
    }
    .scroll-wrap {
        margin-top: 13px;
        min-height: 400px;
        background-color: #fff;
        margin-bottom: 19px;
        border-bottom: 1px solid #eee;
    }
    table {
        width: 100%;
        min-width: 1224px;
        table-layout: fixed;
        display: table;
    }
    table,
    th,
    td {
        box-sizing: border-box;
        border-collapse: collapse;
    }
    thead,
    tbody {
        border: 1px solid #eee;
    }
    tbody {
        border-bottom: none;
    }
    tbody.no-data,
    td.no-data{
        border: none;
    }
    td.no-data {
        padding-top: 40px;
    }
    th,
    td {
        height: 36px;
        border: 1px solid #eee;
        text-align: center;
    }
    td {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    tr:last-child, tr:last-child td {
        border-bottom: none;
    }
    th {
        font-weight: normal;
        background-color: #f6f6f6;
        height: 40px;
    }
    th:nth-of-type(1),
    th:nth-of-type(3),
    th:nth-of-type(5),
    th:nth-of-type(7) {
        width: 120px;
    }
    th:nth-of-type(6),
    th:nth-of-type(8),
    th:nth-of-type(11) {
        width: 138px;
    }
    th:nth-of-type(2) {
        width: 180px;
    }
    th:nth-of-type(4) {
        width: 300px;
    }
    th:nth-of-type(9) {
        width: 70px;
    }
    th:nth-of-type(10) {
        width: 100px;
    }
    tbody tr:nth-child(even) {
        background-color: #fafbfc;
    }
    hr {
        margin: 0 -20px !important;
    }
    .pagination-wrap {
        margin: 22px 0 0;
        height: 14px;
        line-height: 14px;
    }
`;

export default orderListStyles;

