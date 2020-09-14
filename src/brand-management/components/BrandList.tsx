import {Button, ISelectReturnData, Paginate, Select} from "@lqt/lqt-ui";
import * as React from "react";
import {useEffect, useState} from "react";
import moment from 'moment';
import brandListStyles from '../styles/brandListStyles';
import {getMaxPageGroupNum, getPageGroupNum} from "../helper";
import {
    IBrandListProps,
    IListTable
} from "../interface/IBrandMngCommon";

const tableHeaderList: IListTable[] = [
    {
        name: '수정',
        className: 'modify'
    },
    {
        name: '브랜드 ID',
        className: 'brand-id'
    },
    {
        name: '브랜드명',
        className: 'brand-name'
    },
    {
        name: '연결된 상품수',
        className: 'relation-product-length'
    },
    {
        name: '활성화 여부',
        className: 'is-activated'
    },
    {
        name: '최초 생성일',
        className: 'created-at'
    },
    {
        name: '최종 수정일',
        className: 'updated-at'
    }
];

const perPageGroupNum: number = 10;

function BrandList(
    {
        pagination,
        curPage,
        selectedPerPageIdx,
        brandList,
        curPageGroupNum,
        perPageNumOptList,
        onChangeCurPageGroupNum,
        onChangeCurPage,
        onChangeSelectedPerPageIdx,
        onClickBrandRegisterBtn,
        onClickBrandModifiedBtnInModal,
        onClickBrandDealCountBtnInModal
    }: IBrandListProps
): JSX.Element {

    const [maxPageGroupNum, setMaxPageGroupNum] = useState<number>(0);

    useEffect(() => {
        const pageGroupNum: number = getPageGroupNum({curPage, perPageGroupNum});

        if (curPageGroupNum === pageGroupNum) {
            return;
        }

        onChangeCurPageGroupNum(pageGroupNum);

    }, [curPage]);

    useEffect(() => {
        const computedMaxPageGroupNum: number = getMaxPageGroupNum({pagination, perPageGroupNum});

        if (computedMaxPageGroupNum === maxPageGroupNum) {
            return;
        }

        setMaxPageGroupNum(computedMaxPageGroupNum);

    }, [pagination.totalPages]);

    const handleChangeListPerPageNum = ({selectedIndex}: ISelectReturnData): void =>
        onChangeSelectedPerPageIdx(selectedIndex);

    const handleMovePage = (pageNum: number): void => onChangeCurPage(pageNum - 1);


    const handleClickBrandModifiedBtnInModal = (e: React.SyntheticEvent, callbackData: number): void => {
        onClickBrandModifiedBtnInModal(callbackData);
    };

    const handleClickDealCount = (e: React.SyntheticEvent<HTMLTableDataCellElement>): void => {
        const brandId = e.currentTarget.dataset.listId;
        if (!brandId) {
            return;
        }
        onClickBrandDealCountBtnInModal(parseInt(brandId, 10));
    };

    const handleClickBrandRegisterBtn = (): void => {
        onClickBrandRegisterBtn({
            title: '브랜드 등록',
            isShowed: true,
            size: {
                width: '800px'
            },
            modalType: 'brandRegister'

        });
    };

    const totalLength = pagination.totalElements || 0;

    const selectComponentProps = {
        values: perPageNumOptList.map((perPageNumOpt): number => perPageNumOpt.value),
        optionsText: perPageNumOptList.map((perPageNumOpt): string => perPageNumOpt.name)
    };

    const getTableBodyClass = (): string | undefined => !brandList ? 'no-data' : undefined;

    return (
        <React.Fragment>
            <div className={'brand-list-wrap'}>
                <div>
                    <Select
                        zIndex={10}
                        width={'100px'}
                        height={'30px'}
                        fontSize={'12px'}
                        callbackData={[
                            ...perPageNumOptList
                        ]}
                        values={selectComponentProps?.values}
                        change={handleChangeListPerPageNum}
                        option={selectComponentProps?.optionsText}
                        selectedIndex={selectedPerPageIdx}
                    />
                    <span className={'list-total-length'}>총 {totalLength}개</span>
                </div>
                <Button
                    width={'auto'}
                    height={'36px'}
                    padding={'0 12px'}
                    borderRadius={'4px'}
                    background={'#f26c55'}
                    text={'+ 등록하기'}
                    textTop={'-1px'}
                    click={handleClickBrandRegisterBtn}
                />
            </div>
            <table>
                <thead>
                <tr>
                    {
                        tableHeaderList.map((tableHeader): JSX.Element =>
                            <th className={tableHeader.className}
                                key={tableHeader.name}>{tableHeader.name}</th>
                        )
                    }
                </tr>
                </thead>
                <tbody className={getTableBodyClass()}>
                {
                    brandList ?
                        brandList.map(brandItem =>
                            <tr key={brandItem.id}>
                                <td>
                                    <Button
                                        text={'수정'}
                                        width={'62px'}
                                        height={'30px'}
                                        background={'#fff'}
                                        color={'#f26c55'}
                                        border={'1px solid #f26c55'}
                                        borderRadius={'3px'}
                                        fontSize={'12px'}
                                        callbackData={brandItem.id}
                                        click={handleClickBrandModifiedBtnInModal}
                                    />
                                </td>
                                <td>{brandItem.id}</td>
                                <td title={brandItem.brandNm}>{brandItem.brandNm}</td>
                                <td onClick={handleClickDealCount}
                                    data-list-id={brandItem.id}
                                >
                                    {brandItem.dealCount}
                                </td>
                                <td>{brandItem.activeYn}</td>
                                <td>{moment(brandItem.insDt).format('YYYY-MM-DD HH:mm')}</td>
                                <td>{moment(brandItem.uptDt).format('YYYY-MM-DD HH:mm')}</td>
                            </tr>
                        ) :
                        <tr>
                            <td colSpan={tableHeaderList.length}>목록이 없습니다.</td>
                        </tr>
                }
                </tbody>
            </table>
            <hr className={'pull-divider'}/>
            <div className={'pagination-wrap'}>
                <Paginate
                    totalPage={pagination?.totalPages}
                    currentPage={curPage + 1}
                    visibleCount={9}
                    prevButtonText={'이전'}
                    nextButtonText={'다음'}
                    updatePageNumber={handleMovePage}
                    activeColor={'#f26c55'}
                    prevNextTextTop={'0'}
                    pageItemTextTop={'2px'}
                    innerMargin={'14px'}
                />
            </div>
            <style jsx={'true'}>{brandListStyles}</style>
        </React.Fragment>
    )
}

export default BrandList;