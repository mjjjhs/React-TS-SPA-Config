import css from 'styled-jsx/css';

const orderManagementGlobalStyles = css.global`
    #order-management-root {
        font-size 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #474747;
        font-family: "Noto Sans", "Nanum Gothic", "Apple SD Gothic Neo", "Malgun Gothic", "Open sans", "Meiryo";
    }
    #order-management-root hr {
        height: 1px;
        background: #eee;
        border-bottom: none;
        margin: 0;
        border: 0;
    }
    #order-management-root input::placeholder {
        color: #bbb;
    }
    #order-management-root .optionGroup > a:hover {
        color: #474747;
    }
    #order-management-root .nextPage, 
    #order-management-root .prevPage, 
    #order-management-root .firstPage, 
    #order-management-root .lastPage {
        margin-top: -2px;
    }
`;

export default orderManagementGlobalStyles;