// import axios, {AxiosResponse} from 'axios';
// import {isEmpty} from 'lodash-es';
import {FilterText} from "../enums/Text";

export const getSearchConditionOptList = () => {
    return [
        {
            text: FilterText.ORDER_NUM,
            value: ''
        },
        {
            text: FilterText.OPT_ORDER_NUM,
            value: ''
        },
        {
            text: FilterText.ITEM_ORDER_NUM,
            value: ''
        },
        {
            text: FilterText.PARTNER_ORDER_NUM,
            value: ''
        },
        {
            text: FilterText.PURCHASER_NAME,
            value: ''
        },
        {
            text: FilterText.PURCHASER_PHONE_NUM,
            value: ''
        },
        {
            text: FilterText.USER_NAME,
            value: ''
        },
        {
            text: FilterText.USER_PHONE_NUM,
            value: ''
        },
        {
            text: FilterText.DEAL_ID,
            value: ''
        },
        {
            text: FilterText.DEAL_NAME,
            value: ''
        }
    ];
};
export const getSearchPeriodOptList = () => {
    return [
        {
            text: FilterText.PURCHASE_DATE_BASE,
            value: ''
        },
        {
            text: FilterText.USE_DATE_BASE,
            value: ''
        },
        {
            text: FilterText.REFUND_REQUEST_DATE_BASE,
            value: ''
        }
    ];
};
export const getDatepickerBtnList = () => {
    return [
        {
            text: FilterText.TODAY,
        },
        {
            text: FilterText.ONE_MONTH,
        },
        {
            text: FilterText.THREE_MONTH,
        },
        {
            text: FilterText.SIX_MONTH,
        }
    ];
};
export const getPartnerOptList = () => {
    return [
        {
            text: '전체',
            value: 'all'
        },
        {
            text: '가자고(DEV)',
            value: 3
        },
        {
            text: '고코투',
            value: 8
        },
        {
            text: '데일리호텔',
            value: 35
        },
        {
            text: '마이리얼트',
            value: 11
        },
        {
            text: '모하지',
            value: 14
        }
    ];
};
export const getThirdPartyOptList = () => {
    return [
        {
            text: '전체',
            value: 'all'
        },
        {
            text: '나라커뮤니케이션',
            value: 1
        },
        {
            text: '물반고기반',
            value: 2
        },
        {
            text: '스마트인피니',
            value: 3
        },
        {
            text: '엘에스컴퍼니',
            value: 4
        },
        {
            text: '제주모바일',
            value: 5
        }
    ];
};
export const getUseStateOptList = () => {
    return [
        {
            text: '전체',
            value: 'all'
        },
        {
            text: '미사용',
            value: 1
        },
        {
            text: '사용완료',
            value: 2
        },
        {
            text: '부분사용',
            value: 3
        },
    ];
};
export const getRefundStateOptList = () => {
    return [
        {
            text: '전체',
            value: 'all'
        },
        {
            text: '환불요청',
            value: 1
        },
        {
            text: '환불완료',
            value: 2
        },
        {
            text: '환불반려',
            value: 3
        },
    ];
};
// Axios
// const baseURL = `/${ApiEnums.PREFIX_API}/${ApiEnums.VERSION}/${ApiEnums.PREFIX_YANOLJA}`;
// const axiosInstance = axios.create({
//     baseURL,
//     timeout: 3000
// });
//
// axiosInstance.interceptors.request.use(
//     (config) => config,
//     (error) => Promise.reject(error)
// );
//
// axiosInstance.interceptors.response.use(
//     (response): AxiosResponse<void> => {
//         const {
//             alert: isAlert,
//             message,
//             error,
//             redirect,
//             body
//         }: {
//             alert: boolean,
//             message: string,
//             redirect: string,
//             error: IBrandMngResErrMsg,
//             body: IBrandMngResData
//         } = response.data;
//
//         if (isAlert) {
//             if (error) {
//                 const {url: reqUrl} = response.config;
//                 if (reqUrl.includes('/checkBrandNm?brandNm=')) {
//                     return response;
//                 }
//                 alert(error.message);
//             } else if (message === 'REDIRECT') {
//                 window.location.href = redirect;
//             }
//             if (message !== 'SUCCESS') {
//                 return;
//             }
//         } else if (body && isEmpty(body)) {
//             alert('오류가 발생했습니다.');
//             return;
//         }
//         return response;
//     },
//     (error) => Promise.reject(error)
// );
//
// export {axiosInstance};