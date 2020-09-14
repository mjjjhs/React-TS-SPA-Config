import css from "styled-jsx/css";

export default css`
    table {
        display: block;
        border-collapse: collapse;
        width: 100%;
        min-height: 100px;
        border-spacing: 0;
        box-sizing: border-box;
    }

    tbody {
        display: block;
        max-height: 200px;
        overflow: overlay;
        border-bottom: solid 1px #eeeeee;
    }

    td {
        text-align: center;
        height: 36px;
        border: solid 1px #eeeeee;
        padding: 0px;
    }

    thead th {
        height: 36px;
        border: 1px solid #eee;
        background-color: #f6f6f9;
        box-sizing: border-box;
        padding: 0px;
    }

    thead th.mediumCheckbox {
        width: 38px;
    }

    thead th.mediumId {
        width: 124px;
    }

    thead th.mediumName {
        width: 313px;
    }

    tbody tr:nth-child(odd) {
        background-color: #fafbfc;
    }

    .loadingWrapper .loadingBtn {
        top: 50%;
    }

    tbody td:nth-of-type(1) {
        width: 38px;
    }
    tbody td:nth-of-type(2) {
        width: 124px;
    }
    tbody td:nth-of-type(3) {
        width: 313px;
    }
`;
