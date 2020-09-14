import {Select} from "@lqt/lqt-ui";
import * as React from "react";
import {getPartnerOptList, getThirdPartyOptList, getUseStateOptList, getRefundStateOptList} from "../helper";
import orderListFilterStyles from '../styles/orderListFilterStyles'
import {FilterSearchCondition, FilterSearchPeriod} from "./";
import {FilterText} from "../enums/Text";
import {Styles} from "../enums/Styles";

const partnerList = getPartnerOptList();
const thirdPartyList = getThirdPartyOptList();
const useStateList = getUseStateOptList();
const refundStateList = getRefundStateOptList();
function OrderListFilter(): JSX.Element {

    return (
        <React.Fragment>
            <div className={'filter-wrap'}>
                <FilterSearchCondition />
                <FilterSearchPeriod />
                <div>
                    <span>{FilterText.PARTNER_NAME}</span>
                    <Select
                        zIndex={10}
                        width={'160px'}
                        height={Styles.INPUT_HEIGHT}
                        values={partnerList.map(item => item.value)}
                        // change={handleChangeSearchCategoryOpt}
                        option={partnerList.map(item => item.text)}
                        color={Styles.DEFAULT_FONT_COLOR}
                        selectedIndex={0}
                    />
                    <span className={'lm-31'}>{FilterText.THIRD_PARTY_NAME}</span>
                    <Select
                        zIndex={10}
                        width={'200px'}
                        height={Styles.INPUT_HEIGHT}
                        values={thirdPartyList.map(item => item.value)}
                        // change={handleChangeSearchCategoryOpt}
                        option={thirdPartyList.map(item => item.text)}
                        color={Styles.DEFAULT_FONT_COLOR}
                        selectedIndex={0}
                    />
                </div>
                <div>
                    <span>{FilterText.USE_STATUS}</span>
                    <Select
                        zIndex={10}
                        width={'160px'}
                        height={Styles.INPUT_HEIGHT}
                        values={useStateList.map(item => item.value)}
                        // change={handleChangeSearchCategoryOpt}
                        option={useStateList.map(item => item.text)}
                        color={Styles.DEFAULT_FONT_COLOR}
                        selectedIndex={0}
                    />
                    <span className={'lm-31'}>{FilterText.REFUND_REQUEST_DATE_BASE}</span>
                    <Select
                        zIndex={10}
                        width={'200px'}
                        height={Styles.INPUT_HEIGHT}
                        values={refundStateList.map(item => item.value)}
                        // change={handleChangeSearchCategoryOpt}
                        option={refundStateList.map(item => item.text)}
                        color={Styles.DEFAULT_FONT_COLOR}
                        selectedIndex={0}
                    />
                </div>
            </div>

            <style jsx>{orderListFilterStyles}</style>
        </React.Fragment>
    )
}

export default OrderListFilter;