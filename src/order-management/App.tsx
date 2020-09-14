import * as React from 'react';
import OrderManagement from "./pages/OrderManagement";

//이 부분은 기존 order-mng.js 에 있는 설정 부분 참조 jihoon.moon
window.__code__ = (function () {
    return basicCode;
})();

window.fnObj = {};

window.fnObj.pageStart = function () {
    app.formatCode();
}

function App() {
    return (
        <React.Fragment>
            <OrderManagement />
        </React.Fragment>
    )
}

export default App;