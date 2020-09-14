import {IBrandMngResData, IBrandMngResErrMsg, IPagination} from "../interface/IBrandMngData";
import axios, {AxiosResponse} from 'axios';
import {ApiEnums} from "../enums/BrandManagement";
import {IHeader} from "../interface/IBrandReqParams";
import {isEmpty} from 'lodash-es';

export const alertErr = (e: any) => {//엑시오스 인터셉트 에러 로직 추가
    if (e.response) {
        alert(e.response.statusText);
    } else {
        alert(e.message);
    }
};

export const getPageGroupNum = ({curPage, perPageGroupNum}: { curPage: number, perPageGroupNum: number }): number => {
    return Math.floor(curPage / perPageGroupNum);
};

export const getMaxPageGroupNum = ({pagination, perPageGroupNum}: { pagination: IPagination, perPageGroupNum: number }): number => {
    return Math.floor(
        pagination.totalPages / perPageGroupNum
    ) + (pagination.totalPages % perPageGroupNum ? 1 : 0);
};

export const showMessage = ({responseData, msg}: { responseData: AxiosResponse, msg: string }): void => {
    const {alert: isAlert, message}: { alert: boolean, message: string } = responseData.data;
    if (isAlert) {
        if (message === 'SUCCESS') {
            alert(msg);
        }
    }
};

export const getMultipartHeader = (): IHeader => {
    return {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
};

export const getJsonHeader = (): IHeader => {
    return {
        headers: {
            'Content-Type': 'application/json'
        }
    };
};

// Axios
const baseURL = `/${ApiEnums.PREFIX_API}/${ApiEnums.VERSION}/${ApiEnums.PREFIX_YANOLJA}`;
const axiosInstance = axios.create({
    baseURL,
    timeout: 3000
});

axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response): AxiosResponse<void> => {
        const {
            alert: isAlert,
            message,
            error,
            redirect,
            body
        }: {
            alert: boolean,
            message: string,
            redirect: string,
            error: IBrandMngResErrMsg,
            body: IBrandMngResData
        } = response.data;

        if (isAlert) {
            if (error) {
                const {url: reqUrl} = response.config;
                if (reqUrl.includes('/checkBrandNm?brandNm=')) {
                    return response;
                }
                alert(error.message);
            } else if (message === 'REDIRECT') {
                window.location.href = redirect;
            }
            if (message !== 'SUCCESS') {
                return;
            }
        } else if (body && isEmpty(body)) {
            alert('오류가 발생했습니다.');
            return;
        }
        return response;
    },
    (error) => Promise.reject(error)
);

export {axiosInstance};