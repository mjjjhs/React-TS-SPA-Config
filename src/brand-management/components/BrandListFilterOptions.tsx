import * as React from 'react';
import {
    Button,
    IInputReturnData,
    Input,
    IRadioReturnData,
    ISelectReturnData,
    Radio,
    Select
} from "@lqt/lqt-ui";
import brandListFilterOptionsStyles from "../styles/brandListFilterOptionsStyles"
import {IBrandListFilterOptionsProps, IFilterOpt} from "../interface/IBrandMngCommon";

const activateFilterRadioList: IFilterOpt[] = [
    {
        value: '',
        name: '전체',
        id: 'activate-radio-0'
    }, {
        value: 'Y',
        name: 'Y',
        id: 'activate-radio-1'
    }, {
        value: 'N',
        name: 'N',
        id: 'activate-radio-2'
    }
];

const searchBrandOptList: IFilterOpt[] = [
    {
        name: '브랜드명',
        value: 'name'
    },
    {
        name: '브랜드 ID',
        value: 'id'
    }
];

function BrandListFilterOptions(
    {
        onChangeSearchCategoryIdx,
        onChangeSearchKeyword,
        onChangeActivatedFilterWord,
        searchKeyword,
        searchCategoryIdx,
        curActivatedFilterVal,
        onClickSearchBtn
    }: IBrandListFilterOptionsProps
): JSX.Element {

    const handleChangeActivatedFilterRadio = ({value}: IRadioReturnData): void =>
        onChangeActivatedFilterWord(value);

    const handleChangeSearchCategoryOpt = ({selectedIndex}: ISelectReturnData): void =>
        onChangeSearchCategoryIdx(selectedIndex);

    const handleChangeSearchKeyword = ({value}: IInputReturnData): void =>
        onChangeSearchKeyword(value);

    const btnWrapDivRef = React.useRef<HTMLDivElement>(null);

    const handleBlurSearchInput = (): void =>
        btnWrapDivRef.current.classList.remove('focus');

    const handleFocusSearchInput = (): void =>
        btnWrapDivRef.current.classList.add('focus');

    const handleMouseEnterSearchBtn = (e: React.SyntheticEvent): void => {
        const inputNode = e.currentTarget.previousElementSibling.childNodes[0].childNodes[0];
        const activeElement = document.activeElement;

        inputNode !== activeElement && e.currentTarget.classList.add('focus');
    }

    const handleMouseLeaveSearchBtn = (e: React.SyntheticEvent): void => {
        const inputNode = e.currentTarget.previousElementSibling.childNodes[0].childNodes[0];
        const activeElement = document.activeElement;

        inputNode !== activeElement && e.currentTarget.classList.remove('focus');
    };

    const handleSearch = ({event}: IInputReturnData): void => {
        if (!event || event['key'] === 'Enter') {
            onClickSearchBtn();
        }
    }

    return (
        <div className={"list-opt-wrap"}>
            <div>
                <span>활성화 여부</span>
                {
                    activateFilterRadioList.map((radio, idx) =>
                        <Radio
                            key={radio.id}
                            text={radio.name}
                            value={radio.value}
                            callbackData={{
                                index: idx
                            }}
                            change={handleChangeActivatedFilterRadio}
                            checkedBackground={'#f26c55'}
                            checkedBorder={'1px solid #f26c55'}
                            margin={'0 20px 0 0'}
                            name={'activateFilter'}
                            fontSize={'12px'}
                            labelMargin={'0 0 0 8px'}
                            isChecked={curActivatedFilterVal === radio.value}
                        />
                    )
                }
            </div>
            <div>
                <span>검색어</span>
                <Select
                    zIndex={10}
                    width={'140px'}
                    height={'36px'}
                    callbackData={[
                        ...searchBrandOptList
                    ]}
                    values={searchBrandOptList.map(searchBrandOpt => searchBrandOpt.value)}
                    change={handleChangeSearchCategoryOpt}
                    option={searchBrandOptList.map(searchBrandOpt => searchBrandOpt.name)}
                    selectedIndex={searchCategoryIdx}
                />
                <Input
                    width={'243px'}
                    height={'36px'}
                    placeholder={'검색어를 입력해 주세요'}
                    margin={'0 0 0 10px'}
                    padding={'0 13px 0 10px'}
                    focusedBorderColor={'#a8a8a8'}
                    change={handleChangeSearchKeyword}
                    keyPress={handleSearch}
                    blur={handleBlurSearchInput}
                    focus={handleFocusSearchInput}
                    value={searchKeyword}
                />
                <span
                    ref={btnWrapDivRef}
                    onMouseEnter={handleMouseEnterSearchBtn}
                    onMouseLeave={handleMouseLeaveSearchBtn}
                >
                    <Button
                        imgUrl={'/static/ui/gajago/images/brand-management/search-icon@3x.png'}
                        width={'34px'}
                        height={'34px'}
                        imgWidth={'13px'}
                        imgHeight={'13px'}
                        border={'none'}
                        background={'transparent'}
                        hoverBorder={'#a8a8a8'}
                        click={handleSearch}
                    />
                </span>
            </div>
            <style jsx={"true"}>{brandListFilterOptionsStyles}</style>
        </div>
    )
}

export default BrandListFilterOptions;