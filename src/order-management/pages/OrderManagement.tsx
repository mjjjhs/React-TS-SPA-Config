import * as React from "react";
import {OrderList, OrderListFilter} from '../components';
import orderManagementGlobalStyles from '../styles/orderManagementGlobalStyles';

function OrderManagement(): JSX.Element {

    return (
        <React.Fragment>
            <OrderListFilter />
            <hr />
            <OrderList />
            <style jsx>{orderManagementGlobalStyles}</style>
        </React.Fragment>
    )
}

export default OrderManagement;