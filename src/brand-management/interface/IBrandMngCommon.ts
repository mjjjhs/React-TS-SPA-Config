import {IBrandDetail, IBrandImage, IBrandMngResData, IList, IPagination} from "./IBrandMngData";
import {IBrandModalProps} from "./IBrandModalProps";

export interface IPerPageOpt {
    name: string,
    value: number
}
export interface IBrandNameErr {
    isErr: boolean,
    msg: string
}
export interface IListTable {
    readonly name: string,
    readonly className: string
}
export interface IFilterOpt {
    readonly value: string,
    readonly name: string,
    readonly id?: string
}
export interface IBrandListProps {
    pagination: IPagination,
    curPage: number,
    selectedPerPageIdx: number,
    brandList: IList[],
    curPageGroupNum: number,
    propsBrandNmErr: IBrandNameErr,
    perPageNumOptList: IPerPageOpt[],
    onChangeCurPageGroupNum: (changedPageGroupNum: number) => void,
    onChangeCurPage: (selectedCurPage: number) => void,
    onChangeSelectedPerPageIdx: (selectedPerPageIdx: number) => void,
    onClickBrandRegisterBtn: ({title, isShowed, modalType, size}: IBrandModalProps) => void
    onClickBrandModifiedBtnInModal: (brandId: number) => void,
    onClickBrandDealCountBtnInModal: (brandId: number) => void
}
export interface IBrandListFilterOptionsProps {
    onChangeSearchCategoryIdx: (searchCategoryIdx: number) => void,
    onChangeSearchKeyword: (searchKeyword: string | number) => void,
    onChangeActivatedFilterWord: (curFilterActivatedWord: string) => void,
    onClickSearchBtn: () => void,
    searchKeyword: string | number,
    searchCategoryIdx: number,
    curActivatedFilterVal: string
}
export interface IBrandAddModDelModalContentProps extends IBrandMngResData {
    propsBrandNmErr?: { isErr: boolean, msg: string },
    onClickBrandRegisterBtnInModal?: (brandDetailInfo: IBrandDetail) => void,
    onClickBrandModifyBtnInModal?: (brandDetailInfo: IBrandDetail, changedImg: IBrandImage) => void,
    onClickBrandDelBtnInModal?: (brandId: number) => void,
    onBlurBrandNm?: (brandNm: string) => void,
    onSetErrorBrandNm?: (brandNmErr: { isErr: boolean, msg: string }) => void
}
export interface INoticeAddDelCallbackData {
    type: string,
    idx: number
}
export interface IImgDimension {
    width: number,
    height: number
}
export interface IBrandRelationDealListModalContentProps {
    brandId: number
}