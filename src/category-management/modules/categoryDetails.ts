import axios from 'axios';
import { GROUPS_URL, TYPE_URL } from '../config';
import { CategoryLevel } from '../enum/CategoryEnum';
import { ILargeCategory, IMediumCategory, ISmallCategory } from '../interface/ICategory';
import { IResponse } from '../interface/IResponse';

type CategoryDetailsMap = {
    [key: number]: ILargeCategory | IMediumCategory | ISmallCategory;
};

interface IFetchCategoryDetails {
    id: number;
    level: number;
}

interface ICategoryDetails {
    byId: CategoryDetailsMap;
    pending: boolean;
}

type CategoryDetailsAction =
    | ReturnType<typeof setCategoryDetails>
    | ReturnType<typeof setSmallCategoryDetails>
    | ReturnType<typeof setPendingCategoryDetails>;

const SET_CATEGORY_DETAILS = 'categoryDetails/SET_CATEGORY_DETAILS' as const;
const SET_SMALL_CATEGORY_DETAILS = 'categoryDetails/SET_SMALL_CATEGORY_DETAILS' as const;
const SET_PENDING_CATEGORY_DETAILS = 'categoryDetails/SET_PENDING_CATEGORY_DETAILS' as const;

export const setCategoryDetails = (datas: ILargeCategory | IMediumCategory) => ({
    type: SET_CATEGORY_DETAILS,
    payload: datas
});

export const setSmallCategoryDetails = (datas: ISmallCategory) => ({
    type: SET_SMALL_CATEGORY_DETAILS,
    payload: datas
});

export const setPendingCategoryDetails = (status: boolean) => ({
    type: SET_PENDING_CATEGORY_DETAILS,
    payload: status
});

export const fetchCategoryDetails = ({ id, level }: IFetchCategoryDetails) => async (
    dispatch: any
) => {
    dispatch(setPendingCategoryDetails(true));
    let requestUrl = '';

    if (level === CategoryLevel.SMALL) {
        requestUrl = `${TYPE_URL}/${id}`;
    } else {
        requestUrl = `${GROUPS_URL}/${id}`;
    }

    try {
        const { data } = await axios.get(requestUrl);
        const { success, error, body }: IResponse = data;
        if (success) {
            if (level === CategoryLevel.SMALL) {
                dispatch(setSmallCategoryDetails(body));
            } else {
                dispatch(setCategoryDetails(body));
            }
        } else {
            alert(error.message);
            dispatch(setPendingCategoryDetails(false));
        }
    } catch (err) {
        throw err;
    }
};

const initialState: ICategoryDetails = {
    byId: {},
    pending: false
};

export default function categoryDetails(state = initialState, action: CategoryDetailsAction) {
    switch (action.type) {
        case SET_CATEGORY_DETAILS: {
            const { code, ...otherKeys } = action.payload;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [code]: {
                        code,
                        ...otherKeys
                    },
                },
                pending: false
            };
        }
        case SET_SMALL_CATEGORY_DETAILS: {
            const { id, ...otherKeys } = action.payload;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id]: {
                        id,
                        ...otherKeys
                    }
                },
                pending: false
            };
        }
        case SET_PENDING_CATEGORY_DETAILS: {
            const status = action.payload;
            return {
                ...state,
                pending: status
            };
        }
        default:
            return state;
    }
}
