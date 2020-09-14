import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

declare const ENV: string;

ReactDOM.render(
    <App />,
    document.getElementById("order-management-root")
);