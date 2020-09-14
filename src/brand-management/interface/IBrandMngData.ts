export interface IBrandMngResData {
    list?: IList[],
    page?: IPagination,
    header?: {
        code?: number,
        message?: string
    },
    body?: IBrandDetail,
    content?: IList[],
    last?: boolean,
    first?: boolean,
    totalPages?: number,
    totalElements?: number,
    numberOfElements?: number,
    size?: number,
    number?: number,
    alert?: boolean,
    error?: IBrandMngResErrMsg,
    message?: string,
    redirect?: string,
    status?: number,
    success?: boolean,
    timestamp?: number,
    useCallback?: boolean
}

export interface IBrandDetail {
    brandNm?: string,
    image?: IBrandImage,
    information?: string,
    notice?: string[],
    insDt?: string,
    uptDt?: string,
    activeYn?: string,
    dealCount?: number,
    id?: number
}

export interface IBrandImage {
    logo?: string | File,
    main?: string | File
}

export interface IBrandMngResErrMsg {
    exception?: string,
    message?: string,
    path?: string,
    trace?: string,
    params?: IBrandMngResErrParams
}

export interface IList {
    id?: number,
    brandNm?: string,
    dealCount?: number,
    activeYn?: string,
    insDt?: string,
    uptDt?: string,
    dealId?: number,
    dealName?: string,
    status?: string,
    saleStartDt?: string,
    saleEndDt?: string,
    supplyYn?: string,
    dealStatusName?: string
}

export interface IPagination {
    currentPage: number,
    pageSize: number,
    totalElements?: number,
    totalPages?: number
}

interface IBrandMngResErrParams {

}