import {Button, Input, Select} from "@lqt/lqt-ui";
import * as React from "react";
import {getSearchConditionOptList} from "../helper";
import orderListFilterStyles from '../styles/orderListFilterStyles'
import {FilterText} from "../enums/Text";
import {Styles} from "../enums/Styles";

const searchConditionOptList = getSearchConditionOptList();

function FilterSearchCondition(): JSX.Element {

    return (
        <div>
            <span>{FilterText.SEARCH_CONDITION}</span>
            <Select
                zIndex={12}
                width={'200px'}
                height={Styles.INPUT_HEIGHT}
                values={searchConditionOptList.map(item => item.value)}
                color={Styles.DEFAULT_FONT_COLOR}
                // change={handleChangeSearchCategoryOpt}
                option={searchConditionOptList.map(item => item.text)}
                selectedIndex={0}
            />
            <Input
                width={'276px'}
                height={Styles.INPUT_HEIGHT}
                color={Styles.DEFAULT_FONT_COLOR}
                placeholder={FilterText.SEARCH_PALACE_HOLDER}
                margin={'0 10px'}
                padding={'0 14px'}
                focusedBorderColor={'#a8a8a8'}
                // change={handleChangeSearchKeyword}
                // keyPress={handleSearch}
                // blur={handleBlurSearchInput}
                // focus={handleFocusSearchInput}
                // value={searchKeyword}
            />
            <span className={'btn-wrap'}>
                <Button
                    width={'88px'}
                    height={Styles.INPUT_HEIGHT}
                    border={'none'}
                    background={Styles.POINT_COLOR}
                    color={'#fff'}
                    hoverColor={'#fff'}
                    borderRadius={Styles.BORDER_RADIUS}
                    margin={'0 5px 0 0'}
                    text={FilterText.SEARCH}
                    // click={handleSearch}
                />
                <Button
                    width={'88px'}
                    height={Styles.INPUT_HEIGHT}
                    border={`solid 1px ${Styles.DEFAULT_BORDER_COLOR}`}
                    borderRadius={Styles.BORDER_RADIUS}
                    color={Styles.DEFAULT_FONT_COLOR}
                    background={'#fff'}
                    text={FilterText.INIT}
                    hoverBorder={`solid 1px ${Styles.HOVER_BORDER_COLOR}`}
                    // click={handleSearch}
                />
            </span>

            <style jsx>{orderListFilterStyles}</style>
        </div>
    )
}

export default FilterSearchCondition;