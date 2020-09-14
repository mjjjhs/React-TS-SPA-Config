import {RangeDatePicker, Select} from "@lqt/lqt-ui";
import * as React from "react";
import {getSearchPeriodOptList, getDatepickerBtnList} from "../helper";
import orderListFilterStyles from '../styles/orderListFilterStyles'
import {FilterText} from "../enums/Text";
import {Styles} from "../enums/Styles";
import moment from "moment";
import {useState} from "react";

const searchPeriodOptList = getSearchPeriodOptList();
const datepickerBtnList = getDatepickerBtnList();
function FilterSearchPeriod(): JSX.Element {
    const [period, setPeriod] = useState({
        activeBtnIdx: null,
        sDate: null,
        eDate: null
    });
    const handleClickPeriodBtn = (e): void => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        let sDate, diff;
        const now = new Date().toISOString();
        const eDate = moment(now).utc().format(FilterText.DATE_FORMAT);
        switch(idx) {
            case 0:
                sDate = eDate;
                break;
            case 1:
                diff = 30;
                break;
            case 2:
                diff = 91;
                break;
            default:
                diff = 181;
                break;
        }
        sDate = moment(now).subtract(diff, 'days').utc().format(FilterText.DATE_FORMAT);
        setPeriod({
            activeBtnIdx: idx,
            sDate,
            eDate
        });
    };
    const handleChangePeriod = (rv) => {
        setPeriod({
            ...period,
            sDate: rv.startDate,
            eDate: rv.endDate
        });
    };
    return (
        <div>
            <span>{FilterText.SEARCH_PERIOD}</span>
            <Select
                zIndex={10}
                width={'160px'}
                height={Styles.INPUT_HEIGHT}
                margin={'0 14px 0 0'}
                color={Styles.DEFAULT_FONT_COLOR}
                values={searchPeriodOptList.map(item => item.value)}
                // change={handleChangeSearchCategoryOpt}
                option={searchPeriodOptList.map(item => item.text)}
                selectedIndex={0}
            />
            <div className={'datepicker-wrap'}>
                <div>
                    <RangeDatePicker
                        startDate={period.sDate}
                        endDate={period.eDate}
                        startDatePlaceholder={FilterText.START_DATE}
                        endDatePlaceholder={FilterText.END_DATE}
                        minimumNights={0}
                        color={Styles.DEFAULT_FONT_COLOR}
                        dateFormat={FilterText.DATE_FORMAT}
                        width={'146px'}
                        height={Styles.INPUT_HEIGHT}
                        outRangeFn={date => moment(date.toISOString()).utc().valueOf() > moment(new Date().toISOString()).utc().valueOf()}
                        change={handleChangePeriod}
                    />
                </div>
                <span className={'btn-wrap'}>
                {
                    datepickerBtnList.map((item, idx) =>
                        <button
                            key={idx}
                            className={`datepicker-period-btn${idx === period.activeBtnIdx ? ' active' : ''}`}
                            data-idx={idx}
                            onClick={handleClickPeriodBtn}
                        >
                            {item.text}
                        </button>
                   )
                }
                </span>
            </div>

            <style jsx>{orderListFilterStyles}</style>
        </div>
    )
}

export default FilterSearchPeriod;