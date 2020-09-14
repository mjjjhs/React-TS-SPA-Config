import {Paginate} from "@lqt/lqt-ui";
import * as React from "react";
import orderListStyles from '../styles/orderListStyles'
import {useMemo} from "react";
import {Scrollbars} from 'react-custom-scrollbars';
import {Styles} from "../enums/Styles";
import {FilterText} from "../enums/Text";
import moment from "moment";
const list = [
    {
        id:0,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:1,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:2,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:3,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:4,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:5,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:6,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:7,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:8,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:9,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:10,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:11,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:12,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:13,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:14,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:15,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:16,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:17,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:18,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
    {
        id:19,
        orderNum: 1954832,
        partnerOrderNum: '미스터힐링',
        partnerNm: '마이리얼트립',
        dealNm: '[서울강남] 도자기 만들기 체험 강남점',
        purchaserNm: '홍*동',
        purchaserPhoneNum: '010-****-5678',
        userNm:'임*인',
        userPhoneNum: '010-****-5678',
        quantity: 20,
        totalPrice: '187,000',
        purchaseDate: '2020-08-21 18:20'
    },
];
const page = {
    curPage: 1,
    totalPages: 10,
    totalCount: 100
};

const headerList: string[] = [
    FilterText.ORDER_NUM,
    FilterText.PARTNER_ORDER_NUM,
    FilterText.PARTNER_NAME,
    FilterText.DEAL_NAME,
    FilterText.PURCHASER_NAME,
    FilterText.PURCHASER_PHONE_NUM,
    FilterText.USER_NAME,
    FilterText.USER_PHONE_NUM,
    FilterText.QUANTITY,
    FilterText.TOTAL_PRICE,
    FilterText.PURCHASE_DATE
];

function OrderList(): JSX.Element {
    const handlerUpdatePageNumber = () => {

    };
    const dynamicHeight = useMemo(() => {
        const thHeight = 40, tdHeight = 36;
        return list.length * tdHeight + thHeight;
    }, [list.length]);

    return (
        <React.Fragment>
            <div className={'order-list-wrap'}>
                <p className={'total-length'}>총 {page?.totalCount || 0}개</p>
                <div>
                    <div className={'scroll-wrap'}>
                        <Scrollbars
                            style={{
                                width: '100%',
                                height: (list?.length || 0) >= 10 ? dynamicHeight : 400,
                                autoHide: true
                            }}
                        >
                            <table className={'ticket-list-table'}>
                                <thead>
                                <tr>
                                    {headerList.map(
                                        (headerTitle, idx): JSX.Element => (
                                            <th key={idx}>
                                                {headerTitle}
                                            </th>
                                        )
                                    )}
                                </tr>
                                </thead>
                                <tbody className={list?.length ? undefined : 'no-data'}>
                                    {
                                        list?.length && page ? (
                                            list.map((item): JSX.Element => (
                                                <tr key={item.id}>
                                                    <td title={item.orderNum.toString()}>
                                                        {item.orderNum}
                                                    </td>
                                                    <td title={item.partnerOrderNum}>
                                                        {item.partnerOrderNum}
                                                    </td>
                                                    <td title={item.partnerNm}>
                                                        {item.partnerNm}
                                                    </td>
                                                    <td title={item.dealNm}>
                                                        {item.dealNm}
                                                    </td>
                                                    <td>
                                                        {item.purchaserNm}
                                                    </td>
                                                    <td >
                                                        {item.purchaserPhoneNum}
                                                    </td>
                                                    <td>
                                                        {item.userNm}
                                                    </td>
                                                    <td>
                                                        {item.userPhoneNum}
                                                    </td>
                                                    <td title={item.quantity.toString()}>
                                                        {item.quantity}
                                                    </td>
                                                    <td title={item.totalPrice}>
                                                        {item.totalPrice}
                                                    </td>
                                                    <td>
                                                        {
                                                            moment(item.purchaseDate).format('YYYY-MM-DD hh:mm')
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className={'no-data'} colSpan={headerList.length}>
                                                    {
                                                        !list?.length && (typeof page === 'undefined' || !page)
                                                            ? FilterText.NOTICE
                                                            : FilterText.NO_RESULT
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </Scrollbars>
                    </div>
                    <hr/>
                    <div className={'pagination-wrap'}>
                        <Paginate
                            totalPage={page ? page.totalPages : 1}
                            currentPage={page ? page?.curPage : 1}
                            updatePageNumber={handlerUpdatePageNumber}
                            activeColor={Styles.POINT_COLOR}
                            pageItemTextTop={'0px'}
                            innerMargin={'10px'}
                        />
                    </div>
                </div>
            </div>
            <style jsx>{orderListStyles}</style>
        </React.Fragment>
    )
}

export default OrderList;