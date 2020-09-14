import * as React from 'react';
import {useEffect, useState} from 'react';
import {alertErr, axiosInstance, getJsonHeader, getMultipartHeader, showMessage} from './helper';
import brandManagementGlobalStyles from './styles/brandManagementGlobalStyles';
import {
    IBrandDetail, IBrandImage,
    IBrandMngResData,
    IBrandMngResErrMsg,
    IList,
    IPagination
} from "./interface/IBrandMngData";
import cloneDeep from 'lodash-es/cloneDeep';
import {IBrandModalProps} from "./interface/IBrandModalProps";
import {AxiosResponse} from 'axios';
import BrandListFilterOptions from './components/BrandListFilterOptions';
import BrandList from './components/BrandList';
import {ApiEnums} from './enums/BrandManagement';
import {Modal} from "@lqt/lqt-ui";
import BrandAddModDelModalContent from "./components/BrandAddModDelModalContent";
import BrandRelationDealListModalContent from "./components/BrandRelationDealListModalContent";
import {IFetchBrandParams} from "./interface/IBrandReqParams";
import {IBrandNameErr, IPerPageOpt} from "./interface/IBrandMngCommon";

const perPageNumOptList: IPerPageOpt[] = [
    {
        name: '20개',
        value: 20
    },
    {
        name: '30개',
        value: 30
    },
    {
        name: '40개',
        value: 40
    }
];

const paginationInitState: IPagination = {
    currentPage: 0,
    pageSize: 0,
    totalPages: 1,
    totalElements: 0
};

function App() {
    const [selectedPerPageIdx, setSelectedPerPageIdx] = useState<number>(0);

    const initModalInfo: IBrandModalProps = {
        isShowed: false,
        title: '',
        size: null,
        param: null,
        modalType: ''
    };

    const [modalInfo, setModalInfo] = useState<IBrandModalProps>(initModalInfo);
    const [brandList, setBrandList] = useState<IList[]>(null);
    const [brandDetail, setBrandDetail] = useState<IBrandDetail>(null);
    const [pagination, setPagination] = useState<IPagination>(paginationInitState);
    const [curPage, setCurPage] = useState<number>(paginationInitState.currentPage);
    const [curPageGroupNum, setCurPageGroupNum] = useState<number>(0);
    const [curActivatedFilterVal, setCurActivatedFilterVal] = useState<string>('');
    const [brandNmErr, setBrandNmErr] = useState<IBrandNameErr>({
        isErr: false,
        msg: ''
    });
    const [searchCategoryIdx, setSearchCategoryIdx] = useState<number>(0);
    const [searchKeyword, setSearchKeyword] = useState<string | number>('');

    const setStateInit = () => {

        if (brandNmErr.isErr) {
            setBrandNmErr({
                ...brandNmErr,
                isErr: false,
                msg: ''
            });
        }

        switch (modalInfo.modalType) {
            case 'brandRegister':
            case 'brandModify':
                setBrandDetail(null);
                break;
        }
    };

    useEffect(() => {
        if (curPage !== 0) {
            setCurPage(0);
        } else {
            fetchBrandList();
        }
    }, [curActivatedFilterVal, selectedPerPageIdx]);

    const setData = (data: IBrandMngResData): void => {
        if (!data) {
            setBrandList(null);
            setPagination(paginationInitState);
            setCurPage(paginationInitState.currentPage);
        } else {
            const {list, page} = data;
            setBrandList(list.length ? list : null);
            if(list.length) {
                setPagination(
                    cloneDeep(page)
                );
            } else {
                setPagination(
                    cloneDeep(paginationInitState)
                );
            }

        }
    };

    const getFetchBrandListParams = (): IFetchBrandParams => {
        return {
            params: {
                [searchCategoryIdx !== 0 ? 'queryId' : 'queryBrandNm']: searchKeyword,
                queryActiveYn: curActivatedFilterVal,
                pageSize: perPageNumOptList[selectedPerPageIdx].value,
                pageNumber: curPage
            }
        };
    };

    const fetchBrandList = async (): Promise<void> => {
        try {
            const params = getFetchBrandListParams();
            const reqUrl = `/${ApiEnums.BRAND}`;

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


    const getRegisterBrandQueryString = (brandDetailInfo: IBrandDetail): string => {
        let {brandNm, information, activeYn, notice} = brandDetailInfo;

        notice = getNoticeConvertReqData(notice);

        if (!notice.length) {
            notice.push('');
        }


        let queryString = '?';
        queryString += notice.map(noticeItem => `notice=${noticeItem}`).join('&');
        queryString += `&brandNm=${brandNm}&information=${information.replace(/(?:\r\n|\r|\n)/g, '<br>')}&activeYn=${activeYn}`;

        return queryString;
    };

    const getRegisterBrandFormData = (brandDetailInfo: IBrandDetail): FormData => {
        let {image} = brandDetailInfo;

        const formData = new FormData();
        formData.append('logoFile', image.logo);
        formData.append('mainFile', image.main);

        return formData;
    };

    const isRegisterBrandValid = (brandDetailInfo: IBrandDetail): boolean => {
        let {image, brandNm, activeYn} = brandDetailInfo;
        let returnValue: boolean = true;

        if (!image.logo || !image.main) {
            alert('이미지를 선택해 주세요.');
            returnValue = false;
        } else if (!brandNm.trim()) {
            alert('브랜드 명을 입력해 주세요.');
            returnValue = false;
        } else if (!activeYn) {
            alert('활성화 여부를 선택해 주세요.');
            returnValue = false;
        }

        return returnValue;
    };

    const registerBrand = async (brandDetailInfo: IBrandDetail): Promise<void> => {
        try {
            if (!isRegisterBrandValid(brandDetailInfo)) {
                return;
            }

            const queryString = encodeURI(getRegisterBrandQueryString(brandDetailInfo));
            const formData = getRegisterBrandFormData(brandDetailInfo);
            const headers = getMultipartHeader();
            const reqUrl = `/${ApiEnums.BRAND}${queryString}`;

            const res: AxiosResponse = await axiosInstance.post(
                reqUrl,
                formData,
                headers
            );

            if (!res) {
                return;
            }

            showMessage({responseData: res, msg: '등록되었습니다'});

            handleClose();

            fetchBrandList();

        } catch (e) {
            alertErr(e);
        }
    };

    const isModifyBrandDetailImageValid = (changedImg: IBrandImage): boolean => {
        let rv = true;
        if (!changedImg) {
            alert('이미지를 선택해 주세요.');
            rv = false;
        }
        return rv;
    };

    const getModifyBrandDetailImageFormData = (changedImg: IBrandImage): FormData => {
        const formData = new FormData();
        if(changedImg?.logo) {
            formData.append('logoFile', changedImg.logo);
        }
        if(changedImg?.main) {
            formData.append('mainFile', changedImg.main);
        }
        return formData;
    };

    const getBrandDetailInfoReqUrl = (brandId: number): string => `/${ApiEnums.BRAND}/${brandId}`;

    const getImgUploadReqUrl = (id: number): string => `${getBrandDetailInfoReqUrl(id)}/upload`;

    const modifyBrandDetailImage = async (id: number, changedImg: IBrandImage): Promise<IBrandMngResData> => {
        try {
            if (!isModifyBrandDetailImageValid(changedImg)) {
                return;
            }

            const headers = getMultipartHeader();
            const formData = getModifyBrandDetailImageFormData(changedImg);
            const reqUrl = getImgUploadReqUrl(id);

            return await axiosInstance.post(
                reqUrl,
                formData,
                headers
            );
        } catch (e) {
            alertErr(e);
        }
    };

    const getNoticeConvertReqData = (notice: string[]) => {
        return notice.reduce((prev, cur) => {
            !!cur.trim() && prev.push(cur);
            return prev;
        }, []);
    };

    const modifyBrandDetailInfoValid = (brandDetailInfo: IBrandDetail): boolean => {
        let {brandNm, activeYn} = brandDetailInfo;
        let rv = true;

        if (!brandNm.trim()) {
            alert('브랜드 명을 입력해 주세요.');
            rv = false;
        } else if (!activeYn) {
            alert('활성화 여부를 선택해 주세요.');
            rv = false;
        }
        return rv;
    };

    const modifyBrandDetailInfo = async (brandDetail: IBrandDetail): Promise<void> => {
        try {
            let {brandNm, information, id, activeYn, notice, image} = brandDetail;
            notice = getNoticeConvertReqData(notice);

            if (!modifyBrandDetailInfoValid(brandDetail)) {
                return;
            }

            const reqUrl = getBrandDetailInfoReqUrl(id);
            const headers = getJsonHeader();
            const data = JSON.stringify({
                activeYn,
                brandNm,
                id,
                information,
                notice,
                image
            });

            const res: AxiosResponse = await axiosInstance.put(
                reqUrl,
                data,
                headers
            );

            if (!res) {
                return;
            }

            showMessage({responseData: res, msg: '저장되었습니다.'});

            handleClose();

            fetchBrandList();

        } catch (e) {
            alertErr(e);
        }
    };


    const getDetailModalOption = (): IBrandModalProps => {
        return {
            ...modalInfo,
            title: '브랜드 수정',
            isShowed: true,
            size: {
                width: '800px'
            },
            modalType: 'brandModify'
        };
    };

    const fetchBrandDetailInfo = async (brandId: number): Promise<void> => {
        try {
            const showModalOption = getDetailModalOption();
            const reqUrl = getBrandDetailInfoReqUrl(brandId);
            const res: AxiosResponse = await axiosInstance.get(reqUrl);

            if (!res) {
                return;
            }

            const {body}: { body: IBrandDetail } = res.data;

            setBrandDetail({...body});

            setModalInfo(showModalOption);

        } catch (e) {
            alertErr(e);
        }
    };

    const delBrand = async (brandId: number): Promise<void> => {
        try {
            const reqUrl = getBrandDetailInfoReqUrl(brandId);
            const res: AxiosResponse = await axiosInstance.delete(reqUrl);

            if (!res) {
                return;
            }

            showMessage({responseData: res, msg: '삭제되었습니다.'});

            handleClose();

            await fetchBrandList();

        } catch (e) {
            alertErr(e);
        }
    };

    const getCheckedBrandNameReqUrl = (brandName: string): string => `/${ApiEnums.BRAND}/checkBrandNm?brandNm=${encodeURIComponent(brandName)}`;

    const fetchCheckedBrandNm = async (brandNm: string): Promise<void> => {
        try {
            const reqUrl = getCheckedBrandNameReqUrl(brandNm);
            const res: AxiosResponse = await axiosInstance.get(reqUrl);

            if (res.data.alert) {
                const {error, status}: { error: IBrandMngResErrMsg, status: number } = res.data;

                if (error) {
                    if (status === 200) {
                        setBrandNmErr({
                            ...brandNmErr,
                            isErr: true,
                            msg: error.message
                        });
                    }
                    return;
                }
            }

        } catch (e) {
            alertErr(e);
        }
    };

    const handleClickBrandRegisterBtnInModal = (brandDetailInfo: IBrandDetail): void => {
        registerBrand(brandDetailInfo);
    };

    const handleClickBrandModifyBtnInModal = async (brandDetailInfo: IBrandDetail, changedImg: IBrandImage): Promise<void> => {
        let uploadImgRes;
        const {id} = brandDetailInfo;
        if (changedImg) {
            uploadImgRes = await modifyBrandDetailImage(id, changedImg);
        }
        if(changedImg && !uploadImgRes) {
            return;
        }

        const { body: image }: { body: IBrandImage } = uploadImgRes ? uploadImgRes?.data : { body: null };
        const params = image ? {
                ...brandDetailInfo,
                image
            } :
            {
                ...brandDetailInfo
            };

        setBrandDetail(params);
        modifyBrandDetailInfo(params);
    };

    const handleClickBrandDelBtnInModal = (brandId: number): void => {
        delBrand(brandId);
    };

    const handleClickBrandDealCountBtnInModal = (brandId: number): void => {
        setModalInfo({
            ...modalInfo,
            isShowed: true,
            title: '연결된 상품 리스트',
            size: {
                width: '890px'
            },
            param: brandId,
            modalType: 'relationDealList'
        });
    };

    useEffect((): void => {
        fetchBrandList();
    }, [curPage]);

    const handleClickSearchBtn = (): void => {
        if (curPage !== 0) {
            setCurPage(0);
        } else {
            fetchBrandList();
        }
    };

    const handleClose = (): void => {
        setModalInfo({
            ...modalInfo,
            isShowed: false
        });
        setTimeout(() => setStateInit(), 350);
    };

    const handleClickBrandModifiedBtnInModal = (brandId: number): void => {
        fetchBrandDetailInfo(brandId);
    };

    const handleBlurBrandNm = (brandNm: string): void => {
        fetchCheckedBrandNm(brandNm);
    };

    const modalWidth = modalInfo?.size ? modalInfo?.size.width : 'auto';

    const isBrandAddModDelModal = (modalInfo?.modalType === 'brandRegister' || modalInfo?.modalType === 'brandModify');

    const isDealListModal = modalInfo?.modalType === 'relationDealList';

    return (
        <React.Fragment>
            <BrandListFilterOptions
                onChangeSearchCategoryIdx={setSearchCategoryIdx}
                onChangeSearchKeyword={setSearchKeyword}
                onChangeActivatedFilterWord={setCurActivatedFilterVal}
                onClickSearchBtn={handleClickSearchBtn}
                searchKeyword={searchKeyword}
                searchCategoryIdx={searchCategoryIdx}
                curActivatedFilterVal={curActivatedFilterVal}
            />
            <BrandList
                pagination={pagination}
                curPage={curPage}
                selectedPerPageIdx={selectedPerPageIdx}
                curPageGroupNum={curPageGroupNum}
                brandList={brandList}
                perPageNumOptList={perPageNumOptList}
                propsBrandNmErr={brandNmErr}
                onChangeCurPageGroupNum={setCurPageGroupNum}
                onChangeCurPage={setCurPage}
                onChangeSelectedPerPageIdx={setSelectedPerPageIdx}
                onClickBrandRegisterBtn={setModalInfo}
                onClickBrandModifiedBtnInModal={handleClickBrandModifiedBtnInModal}
                onClickBrandDealCountBtnInModal={handleClickBrandDealCountBtnInModal}
            />
            <Modal
                isShowed={modalInfo?.isShowed}
                title={modalInfo?.title}
                onCloseClick={handleClose}
                width={modalWidth}
                backgroundOverlay={'rgba(0,0,0,0.5)'}
                zIndex={300}
                padding={'0'}
            >
                {
                    isBrandAddModDelModal &&
                    <BrandAddModDelModalContent
                        onClickBrandModifyBtnInModal={handleClickBrandModifyBtnInModal}
                        onClickBrandRegisterBtnInModal={handleClickBrandRegisterBtnInModal}
                        onClickBrandDelBtnInModal={handleClickBrandDelBtnInModal}
                        onBlurBrandNm={handleBlurBrandNm}
                        onSetErrorBrandNm={setBrandNmErr}
                        propsBrandNmErr={brandNmErr}
                        body={brandDetail}
                    />
                }
                {
                    isDealListModal &&
                    <BrandRelationDealListModalContent
                        brandId={modalInfo?.param}
                    />
                }
            </Modal>
            <style jsx={'true'} global={'true'}>{brandManagementGlobalStyles}</style>
        </React.Fragment>
    )
}

export default App;