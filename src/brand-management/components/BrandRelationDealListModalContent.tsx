import {IRadioReturnData, Paginate, Radio} from "@lqt/lqt-ui";
import * as React from "react";
import {useEffect, useState} from "react";
import cloneDeep from 'lodash-es/cloneDeep';
import moment from 'moment';
import {
    alertErr,
    axiosInstance,
    getMaxPageGroupNum,
    getPageGroupNum
} from "../helper";
import brandRelationDealListModalContentStyles
    from '../styles/brandRelationDealListModalContentStyles';
import {IBrandMngResData, IList, IPagination} from "../interface/IBrandMngData";
import {AxiosResponse} from "axios";
import {ApiEnums} from "../enums/BrandManagement";
import {IFetchBrandRelationDealParams} from "../interface/IBrandReqParams";
import {
    IBrandRelationDealListModalContentProps,
    IFilterOpt,
    IListTable
} from "../interface/IBrandMngCommon";

const paginationInitState: IPagination = {
    currentPage: 0,
    pageSize: 10,
    totalPages: 1,
    totalElements: 0
};

const perPageGroupNum: number = 10;

const supplyFilterRadioList: IFilterOpt[] = [
    {
        value: '',
        name: '전체',
        id: 'supply-radio-0'
    }, {
        value: 'Y',
        name: 'Y',
        id: 'supply-radio-1'
    }, {
        value: 'N',
        name: 'N',
        id: 'supply-radio-2'
    }
];

const saleStatusFilterRadioList: IFilterOpt[] = [
    {
        value: '',
        name: '전체',
        id: 'sale-status-radio-0'
    }, {
        value: 'Y',
        name: '판매중',
        id: 'sale-status-radio-1'
    }, {
        value: 'N',
        name: '기타',
        id: 'sale-status-radio-2'
    }
];

const tableHeaderList: IListTable[] = [
    {
        name: '딜ID',
        className: 'deal-id'
    },
    {
        name: '딜명',
        className: 'deal-name'
    },
    {
        name: '판매상태',
        className: 'deal-sale-status'
    },
    {
        name: '야놀자 공급',
        className: 'deal-supply'
    },
    {
        name: '판매 시작일',
        className: 'deal-sale-start'
    },
    {
        name: '판매 종료일',
        className: 'deal-sale-end'
    }
];

function BrandRelationDealListModalContent(
    {
        brandId
    }: IBrandRelationDealListModalContentProps
): JSX.Element {

    const [maxPageGroupNum, setMaxPageGroupNum] = useState<number>(0);
    const [curPageGroupNum, setCurPageGroupNum] = useState<number>(0);
    const [relationDealList, setRelationDealList] = useState<IList[]>(null);
    const [relationDealPagination, setRelationDealPagination] = useState<IPagination>(paginationInitState);
    const [curRelationDealPage, setCurRelationDealPage] = useState<number>(paginationInitState.currentPage);
    const [curSupplyFilterVal, setCurSupplyFilterVal] = useState<string>('Y');
    const [curSaleStatusFilterVal, setCurSaleStatusFilterVal] = useState<string>('Y');

    const setData = (data: IBrandMngResData): void => {
        if (!data) {
            setRelationDealList(null);
            setRelationDealPagination(paginationInitState);
            setCurRelationDealPage(paginationInitState.currentPage);
        } else {
            const {list, page} = data;
            setRelationDealList(list.length ? cloneDeep(list) : null);
            if(list.length) {
                setRelationDealPagination(
                    cloneDeep(page)
                );
            } else {
                setRelationDealPagination(
                    paginationInitState
                );
            }
        }
    };

    useEffect(() => {
        if (curRelationDealPage !== 0) {
            setCurRelationDealPage(0);
        } else {
            fetchBrandRelationDealList(brandId);
        }
    }, [curSaleStatusFilterVal, curSupplyFilterVal]);

    useEffect(() => {
        fetchBrandRelationDealList(brandId);
    }, [curRelationDealPage]);

    useEffect(() => {
        const pageGroupNum: number = getPageGroupNum({
            curPage: curRelationDealPage,
            perPageGroupNum
        });

        if (curPageGroupNum === pageGroupNum) {
            return;
        }

        setCurPageGroupNum(pageGroupNum);

    }, [curRelationDealPage]);

    useEffect(() => {
        if (!relationDealPagination) {
            return;
        }
        const computedMaxPageGroupNum: number = getMaxPageGroupNum({
            pagination: relationDealPagination,
            perPageGroupNum
        });

        if (computedMaxPageGroupNum === maxPageGroupNum) {
            return;
        }

        setMaxPageGroupNum(computedMaxPageGroupNum);

    }, [relationDealPagination.totalPages]);

    const getFetchBrandRelationDealListReqUrl = (brandId: number) => `/${ApiEnums.BRAND}/${brandId}/deals`;

    const getFetchBrandRelationDealListParams = (): IFetchBrandRelationDealParams => {
        return {
            params: {
                saleYn: curSaleStatusFilterVal,
                supplyYn: curSupplyFilterVal,
                pageSize: paginationInitState.pageSize,
                pageNumber: curRelationDealPage
            }
        };
    };

    const fetchBrandRelationDealList = async (brandId: number): Promise<void> => {
        try {
            const reqUrl = getFetchBrandRelationDealListReqUrl(brandId);
            const params = getFetchBrandRelationDealListParams();

            const res: AxiosResponse = await axiosInstance.get(
                reqUrl,
                params
            );

            if (!res) {
                setData(null);
                return;
            }

            setData(res.data);

        } catch (e) {
            alertErr(e);
        }
    };

    const openDealPage = (e: React.SyntheticEvent): void => {
        const dealId: number = parseInt(e.currentTarget.previousElementSibling.textContent, 10);
        window.open(
            `//www.yanolja.com/leisure/${dealId}`,
            `_blank`
        );
    };

    const handleChangeFilterRadio = ({value, callbackData}: IRadioReturnData) => {
        const {radioName} = callbackData;
        if (radioName === 'supplyFilter') {
            setCurSupplyFilterVal(value);
        } else {
            setCurSaleStatusFilterVal(value);
        }
    };

    const handleMovePage = (pageNum: number): void => setCurRelationDealPage(pageNum - 1);

    const getIsChecked = (isSupplyFilter: boolean, radio: IFilterOpt): boolean => {
        let target;
        if(isSupplyFilter) {
            target = curSupplyFilterVal;
        } else {
            target = curSaleStatusFilterVal;
        }
        return target === radio.value;
    };

    const totalLength = relationDealPagination?.totalElements || 0;

    const tableBodyClassName = !relationDealList ? 'no-data' : undefined;

    return (
        <div className={'modal-content-wrap'}>
            <div className={'radio-wrap'}>
                <div>
                    <span className={'radio-title'}>야놀자 공급 여부</span>
                    {
                        supplyFilterRadioList.map((radio, idx) =>
                            <Radio
                                key={radio.id}
                                text={radio.name}
                                value={radio.value}
                                callbackData={{
                                    radioName: 'supplyFilter',
                                    index: idx
                                }}
                                change={handleChangeFilterRadio}
                                checkedBackground={'#f26c55'}
                                checkedBorder={'1px solid #f26c55'}
                                margin={'0 20px 0 0'}
                                name={'supplyFilter'}
                                fontSize={'12px'}
                                labelMargin={'0 0 0 8px'}
                                isChecked={getIsChecked(true, radio)}
                            />
                        )
                    }
                </div>
                <div>
                    <span className={'radio-title'}>판매 상태</span>
                    {
                        saleStatusFilterRadioList.map((radio, idx) =>
                            <Radio
                                key={radio.id}
                                text={radio.name}
                                value={radio.value}
                                callbackData={{
                                    radioName: 'saleStatusFilter',
                                    index: idx
                                }}
                                change={handleChangeFilterRadio}
                                checkedBackground={'#f26c55'}
                                checkedBorder={'1px solid #f26c55'}
                                margin={'0 20px 0 0'}
                                name={'saleStatusFilter'}
                                fontSize={'12px'}
                                labelMargin={'0 0 0 8px'}
                                isChecked={getIsChecked(false, radio)}
                            />
                        )
                    }
                </div>
            </div>
            <p className={'deal-total-count'}>
                총 {totalLength}개
            </p>
            <table>
                <thead>
                <tr>
                    {
                        tableHeaderList.map(tableHeader =>
                            <th
                                className={tableHeader.className}
                                key={tableHeader.name}
                            >
                                {tableHeader.name}
                            </th>
                        )
                    }
                </tr>
                </thead>
                <tbody className={tableBodyClassName}>
                {
                    relationDealList ?
                        relationDealList.map(dealItem =>
                            <tr key={dealItem.dealId}>
                                <td>{dealItem.dealId}</td>
                                <td
                                    onClick={openDealPage}
                                    title={dealItem.dealName}
                                >
                                    {dealItem.dealName}
                                </td>
                                <td>{dealItem.dealStatusName}</td>
                                <td>{dealItem.supplyYn}</td>
                                <td>{moment(dealItem.saleStartDt).format('YYYY-MM-DD HH:mm')}</td>
                                <td>{moment(dealItem.saleEndDt).format('YYYY-MM-DD HH:mm')}</td>
                            </tr>
                        ) :
                        <tr>
                            <td colSpan={tableHeaderList.length}>목록이 없습니다.</td>
                        </tr>
                }
                </tbody>
            </table>
            <div className={'pagination-wrap'}>
                <Paginate
                    totalPage={relationDealPagination?.totalPages}
                    currentPage={curRelationDealPage + 1}
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
            <style jsx={'true'}>{brandRelationDealListModalContentStyles}</style>
        </div>
    )
}

export default BrandRelationDealListModalContent;