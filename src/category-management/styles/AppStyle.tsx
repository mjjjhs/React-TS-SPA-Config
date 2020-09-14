import css from "styled-jsx/css";

export default css`
    .categoriesHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 86px;
        max-width: 1260px;
    }
    
    .categoriesContainer {
        display: flex;
        justify-content: center;
        max-width: 1260px;
    }

    .categoryWrapper {
        position: relative;
        width: 33.3%;
        height: 588px;
        border: solid 1px #eeeeee;
        box-sizing: border-box;
    }

    .categoryWrapper:not(:first-child) {
        margin-left: -1px;
    }

    .categoryWrapper h3 {
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        margin: 0 !important;
        padding-left: 14px !important;
        color: #474747 !important;
        border-bottom: solid 1px #eeeeee;
        background-color: #fafafa;
        box-sizing: border-box;
    }

    .filterSelect {
        display: inline-flex;
        align-items: center;
    }

    .filterSelect .filterTitle {
        margin-right: 28px;
    }

    .btnContainer {
        display: inline-flex;
        max-width: 1260px;
        justify-content: flex-end;
        align-items: flex-end;
        box-sizing: border-box;
    }

    .loadingContainer {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9;
    }
`;
