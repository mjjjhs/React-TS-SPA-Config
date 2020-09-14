export interface IFetchBrandParams {
    params: {
        queryId?: number | string,
        queryBrandNm?: string,
        queryActiveYn: string,
        pageSize: number | string,
        pageNumber: number
    }
}

export interface IFetchBrandRelationDealParams {
    params: {
        saleYn?: string,
        supplyYn?: string,
        pageSize: number | string,
        pageNumber: number
    }
}

export interface IHeader {
    headers: {
        ['Content-Type']: string
    }
}