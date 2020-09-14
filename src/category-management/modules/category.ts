import axios from 'axios';
import {
    IFormDataLargeCategory,
    IFormDataMediumCategory,
    IFormDataSmallCategory,
    ILargeCategory,
    IMediumCategory,
    ISmallCategory
} from '../interface/ICategory';
import {
    ALL_GROUP_LIST_URL,
    ALL_GROUPS_LIST_URL,
    GROUP_LIST_URL,
    GROUPS_URL,
    GROUPS_VALIDATE_URL,
    TYPE_LIST_URL,
    TYPE_URL,
    TYPE_VALIDATE_URL
} from '../config';
import { CategoryLevel, CategoryTypeKey } from '../enum/CategoryEnum';
import { IResponse } from '../interface/IResponse';

type CategoryType = CategoryTypeKey.LARGE | CategoryTypeKey.MEDIUM | CategoryTypeKey.SMALL;
type CategoryMap<T> = {
    [key: number]: T;
};

interface ICategoryItem<T> {
    byId: CategoryMap<T>;
    allIds: Array<number>;
    pending: any;
}

interface ICategory {
    large: ICategoryItem<ILargeCategory>;
    medium: ICategoryItem<IMediumCategory>;
    small: ICategoryItem<ISmallCategory>;
}

interface ICategoryParams {
    id: number;
    type: CategoryType;
}

interface IPendingAction {
    type: string;
    value?: boolean;
}

type CategoryAction =
    | ReturnType<typeof setLargeCategoryList>
    | ReturnType<typeof setMediumCategoryList>
    | ReturnType<typeof setSmallCategoryList>
    | ReturnType<typeof setAllMediumCategoryList>
    | ReturnType<typeof setLargeCategory>
    | ReturnType<typeof setMediumCategory>
    | ReturnType<typeof setSmallCategory>
    | ReturnType<typeof updateLargeCategory>
    | ReturnType<typeof updateMediumCategory>
    | ReturnType<typeof updateSmallCategory>
    | ReturnType<typeof removeCategory>
    | ReturnType<typeof setPendingCategory>;

const SET_LARGE_CATEGORY_LIST = 'category/SET_LARGE_CATEGORY_LIST' as const;
const SET_MEDIUM_CATEGORY_LIST = 'category/SET_MEDIUM_CATEGORY_LIST' as const;
const SET_SMALL_CATEGORY_LIST = 'category/SET_SMALL_CATEGORY_LIST' as const;
const SET_ALL_MEDIUM_CATEGORY_LIST = 'category/SET_ALL_MEDIUM_CATEGORY_LIST' as const;
const SET_LARGE_CATEGORY = 'category/SET_LARGE_CATEGORY' as const;
const SET_MEDIUM_CATEGORY = 'category/SET_MEDIUM_CATEGORY' as const;
const SET_SMALL_CATEGORY = 'category/SET_SMALL_CATEGORY' as const;
const UPDATE_LARGE_CATEGORY = 'category/UPDATE_LARGE_CATEGORY' as const;
const UPDATE_MEDIUM_CATEGORY = 'category/UPDATE_MEDIUM_CATEGORY' as const;
const UPDATE_SMALL_CATEGORY = 'category/UPDATE_SMALL_CATEGORY' as const;
const REMOVE_CATEGORY = 'category/REMOVE_CATEGORY' as const;
const SET_PENDING_CATEGORY = 'category/SET_PENDING_CATEGORY' as const;

export const setLargeCategoryList = (items: any) => ({
    type: SET_LARGE_CATEGORY_LIST,
    payload: items
});

export const setMediumCategoryList = (payload: any) => ({
    type: SET_MEDIUM_CATEGORY_LIST,
    payload
});

export const setAllMediumCategoryList = (items: any) => ({
    type: SET_ALL_MEDIUM_CATEGORY_LIST,
    payload: items
});

export const setSmallCategoryList = (payload: any) => ({
    type: SET_SMALL_CATEGORY_LIST,
    payload
});

export const setLargeCategory = (item: IFormDataLargeCategory) => ({
    type: SET_LARGE_CATEGORY,
    payload: item
});

export const setMediumCategory = (item: IFormDataMediumCategory) => ({
    type: SET_MEDIUM_CATEGORY,
    payload: item
});

export const setSmallCategory = (item: IFormDataSmallCategory) => ({
    type: SET_SMALL_CATEGORY,
    payload: item
});

export const updateLargeCategory = (item: IFormDataLargeCategory) => ({
    type: UPDATE_LARGE_CATEGORY,
    payload: item
});

export const updateMediumCategory = (item: IFormDataMediumCategory) => ({
    type: UPDATE_MEDIUM_CATEGORY,
    payload: item
});

export const updateSmallCategory = (item: IFormDataSmallCategory) => ({
    type: UPDATE_SMALL_CATEGORY,
    payload: item
});

export const removeCategory = (item: ICategoryParams) => ({
    type: REMOVE_CATEGORY,
    payload: item
});

export const setPendingCategory = (item: IPendingAction) => ({
    type: SET_PENDING_CATEGORY,
    payload: {
        type: item.type,
        value: !item.hasOwnProperty('value') ? true : item.value
    }
});

export const fetchLargeCategoryList = (status?: number) => async (dispatch: any) => {
    dispatch(setPendingCategory({ type: CategoryTypeKey.LARGE }));

    const requestUrl = !Number.isInteger(status)
        ? ALL_GROUPS_LIST_URL
        : `${ALL_GROUPS_LIST_URL}&status=${status}`;
    try {
        const { data } = await axios.get(requestUrl);
        const { success, error, body }: IResponse = data;
        if (success) {
            dispatch(setLargeCategoryList(body));
        } else {
            window.alert(error.message);
            dispatch(setPendingCategory({ type: CategoryTypeKey.LARGE, value: false }));
        }
    } catch (err) {
        throw err;
    }
};

export const fetchMediumCategoryList = (parentId: number, status: number) => async (
    dispatch: any
) => {
    dispatch(setPendingCategory({ type: CategoryTypeKey.MEDIUM }));

    const requestUrl = !Number.isInteger(status)
        ? `${GROUP_LIST_URL}${parentId}`
        : `${GROUP_LIST_URL}${parentId}&status=${status}`;
    try {
        const { data } = await axios.get(requestUrl);
        const { success, error, body } = data;
        if (success) {
            dispatch(
                setMediumCategoryList({
                    parentId,
                    items: body
                })
            );
        } else {
            window.alert(error.message);
            dispatch(setPendingCategory({ type: CategoryTypeKey.MEDIUM, value: false }));
        }
    } catch (err) {
        throw err;
    }
};

export const fetchSmallCategoryList = (parentId: number, status: number) => async (
    dispatch: any
) => {
    dispatch(setPendingCategory({ type: CategoryTypeKey.SMALL }));

    const requestUrl = !Number.isInteger(status)
        ? `${TYPE_LIST_URL}${parentId}`
        : `${TYPE_LIST_URL}${parentId}&status=${status}`;
    try {
        const { data } = await axios.get(requestUrl);
        const { success, error, body }: IResponse = data;
        if (success) {
            dispatch(
                setSmallCategoryList({
                    parentId,
                    items: body
                })
            );
        } else {
            window.alert(error.message);
            dispatch(setPendingCategory({ type: CategoryTypeKey.SMALL, value: false }));
        }
    } catch (err) {
        throw err;
    }
};

export const fetchAllMediumCategoryList = () => async (dispatch: any) => {
    dispatch(setPendingCategory({ type: CategoryTypeKey.MEDIUM }));

    const requestUrl = ALL_GROUP_LIST_URL;
    try {
        const { data } = await axios.get(requestUrl);
        const { success, error, body }: IResponse = data;
        if (success) {
            dispatch(setAllMediumCategoryList(body));
        } else {
            window.alert(error.message);
            dispatch(setPendingCategory({ type: CategoryTypeKey.MEDIUM, value: false }));
        }
    } catch (err) {
        throw err;
    }
};

export const postLargeCategory = ({ level, name, status }: IFormDataLargeCategory) => async (
    dispatch: any
) => {
    dispatch(setPendingCategory({ type: CategoryTypeKey.LARGE }));

    const requestUrl = GROUPS_URL;
    const bodyFormData = new FormData();

    level.toString() && bodyFormData.append('level', level.toString());
    name && bodyFormData.append('name', name);
    status.toString() && bodyFormData.append('status', status.toString());

    try {
        const { data } = await axios.post(requestUrl, bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const { success, error, body }: IResponse = data;
        if (success) {
            dispatch(setLargeCategory(body));
        } else {
            window.alert(error.message);
            dispatch(setPendingCategory({ type: CategoryTypeKey.LARGE, value: false }));
        }
        return success;
    } catch (err) {
        throw err;
    }
};

export const postMediumCategory = ({
    level,
    name,
    status,
    parentCode,
    file
}: IFormDataMediumCategory) => async (dispatch: any) => {
    dispatch(setPendingCategory({ type: CategoryTypeKey.MEDIUM }));

    const requestUrl = GROUPS_URL;
    const bodyFormData = new FormData();

    level.toString() && bodyFormData.append('level', level.toString());
    name && bodyFormData.append('name', name);
    status.toString() && bodyFormData.append('status', status.toString());
    parentCode.toString() && bodyFormData.append('parentCode', parentCode.toString());
    file && bodyFormData.append('file', file);

    try {
        const { data } = await axios.post(requestUrl, bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const { success, error, body }: IResponse = data;
        if (success) {
            dispatch(setMediumCategory(body));
        } else {
            window.alert(error.message);
            dispatch(setPendingCategory({ type: CategoryTypeKey.MEDIUM, value: false }));
        }
        return success;
    } catch (err) {
        throw err;
    }
};

export const postSmallCategory = ({
    name,
    status,
    categoryGroupCodes,
    file
}: IFormDataSmallCategory) => async (dispatch: any) => {
    dispatch(setPendingCategory({ type: CategoryTypeKey.SMALL }));

    const requestUrl = TYPE_URL;
    const bodyFormData = new FormData();

    name && bodyFormData.append('name', name);
    status.toString() && bodyFormData.append('status', status.toString());
    for (let i = 0; i < categoryGroupCodes.length; i++) {
        bodyFormData.append('categoryGroupCodes', categoryGroupCodes[i].toString());
    }
    file && bodyFormData.append('file', file);

    try {
        const { data } = await axios.post(requestUrl, bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const { success, error, body }: IResponse = data;
        if (success) {
            dispatch(setSmallCategory(body));
        } else {
            window.alert(error.message);
            dispatch(setPendingCategory({ type: CategoryTypeKey.SMALL, value: false }));
        }
        return success;
    } catch (err) {
        throw err;
    }
};

export const putLargeCategory = ({ code, level, name, status }: IFormDataLargeCategory) => async (
    dispatch: any
) => {
    dispatch(setPendingCategory({ type: CategoryTypeKey.LARGE }));

    const requestUrl = `${GROUPS_URL}/${code}`;
    const bodyFormData = new FormData();

    code.toString() && bodyFormData.append('code', code.toString());
    level.toString() && bodyFormData.append('level', level.toString());
    name && bodyFormData.append('name', name);
    status.toString() && bodyFormData.append('status', status.toString());

    try {
        const { data } = await axios.post(requestUrl, bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const { success, error, body }: IResponse = data;
        if (success) {
            dispatch(updateLargeCategory(body));
        } else {
            window.alert(error.message);
            dispatch(setPendingCategory({ type: CategoryTypeKey.LARGE, value: false }));
        }
        return success;
    } catch (err) {
        throw err;
    }
};

export const putMediumCategory = ({
    code,
    level,
    name,
    status,
    file,
    parentCode
}: IFormDataMediumCategory) => async (dispatch: any) => {
    dispatch(setPendingCategory({ type: CategoryTypeKey.MEDIUM }));

    const requestUrl = `${GROUPS_URL}/${code}`;
    const bodyFormData = new FormData();

    code.toString() && bodyFormData.append('code', code.toString());
    level.toString() && bodyFormData.append('level', level.toString());
    status.toString() && bodyFormData.append('status', status.toString());
    parentCode.toString() && bodyFormData.append('parentCode', parentCode.toString());
    name && bodyFormData.append('name', name);
    file && bodyFormData.append('file', file);

    try {
        const { data } = await axios.post(requestUrl, bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        const { success, error, body }: IResponse = data;
        if (success) {
            dispatch(updateMediumCategory(body));
        } else {
            window.alert(error.message);
            dispatch(setPendingCategory({ type: CategoryTypeKey.MEDIUM, value: false }));
        }
        return success;
    } catch (err) {
        throw err;
    }
};

export const putSmallCategory = ({
    id,
    name,
    status,
    file,
    categoryGroupCodes
}: IFormDataSmallCategory) => async (dispatch: any) => {
    dispatch(setPendingCategory({ type: CategoryTypeKey.SMALL }));

    const requestUrl = `${TYPE_URL}/${id}`;
    const bodyFormData = new FormData();

    status.toString() && bodyFormData.append('status', status.toString());
    name && bodyFormData.append('name', name);
    file && bodyFormData.append('file', file);
    if (categoryGroupCodes.length === 0) {
        window.alert('연결된 중분류가 없다');
        return;
    } else {
        for (let i = 0; i < categoryGroupCodes.length; i++) {
            bodyFormData.append('categoryGroupCodes', categoryGroupCodes[i].toString());
        }
    }

    try {
        const { data } = await axios.post(requestUrl, bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const { success, error, body }: IResponse = data;
        if (success) {
            dispatch(updateSmallCategory(body));
        } else {
            window.alert(error.message);
            dispatch(setPendingCategory({ type: CategoryTypeKey.SMALL, value: false }));
        }
        return success;
    } catch (err) {
        throw err;
    }
};

export const deleteCategory = ({ id, level }) => async (dispatch: any) => {
    let type: CategoryType = CategoryTypeKey.LARGE;
    if (level === CategoryLevel.MEDIUM) {
        type = CategoryTypeKey.MEDIUM;
    } else if (level === CategoryLevel.SMALL) {
        type = CategoryTypeKey.SMALL;
    }

    dispatch(setPendingCategory({ type }));

    let requestUrl = '';

    if (level === CategoryLevel.SMALL) {
        requestUrl = `${TYPE_URL}/${id}`;
    } else {
        requestUrl = `${GROUPS_URL}/${id}`;
    }

    try {
        const { data } = await axios.delete(requestUrl);
        const { success, error }: IResponse = data;
        if (success) {
            dispatch(removeCategory({ id, type }));
        } else {
            window.alert(error.message);
            dispatch(setPendingCategory({ type, value: false }));
        }
        return success;
    } catch (err) {
        throw err;
    }
};

export const postValidation = ({ name, level }) => async () => {
    let requestUrl = '';

    if (level === CategoryLevel.SMALL) {
        requestUrl = `${TYPE_VALIDATE_URL}`;
    } else {
        requestUrl = `${GROUPS_VALIDATE_URL}`;
    }

    try {
        const { data } = await axios.post(requestUrl, {
            name,
            level
        });
        const { success }: IResponse = data;
        return success;
    } catch (err) {
        throw err;
    }
};

const initialState: ICategory = {
    [CategoryTypeKey.LARGE]: {
        byId: {},
        allIds: [],
        pending: false
    },
    [CategoryTypeKey.MEDIUM]: {
        byId: {},
        allIds: [],
        pending: false
    },
    [CategoryTypeKey.SMALL]: {
        byId: {},
        allIds: [],
        pending: false
    }
};

export default function category(state = initialState, action: CategoryAction) {
    const associateWithParent = (parentId, ids, type) => {
        const categoryType = state[type];
        const parent = categoryType.byId[parentId];
        if (!parent.associateIds) {
            parent.associateIds = [];
        }

        const newChildren = ids.filter(id => {
            return !parent.associateIds.includes(id);
        });

        return [...parent.associateIds, ...newChildren];
    };

    switch (action.type) {
        case SET_LARGE_CATEGORY_LIST: {
            const items = action.payload;
            const newState = {
                byId: {},
                allIds: [],
                pending: false
            };

            items.forEach(item => {
                newState.allIds.push(item.code);
                newState.byId[item.code] = {
                    ...state[CategoryTypeKey.LARGE].byId[item.code],
                    ...item
                };
            });

            return {
                ...state,
                [CategoryTypeKey.LARGE]: newState
            };
        }
        case SET_MEDIUM_CATEGORY_LIST: {
            const { parentId, items } = action.payload;
            const newState = {
                byId: {},
                allIds: [],
                pending: false
            };

            items.forEach(item => {
                newState.allIds.push(item.code);
                newState.byId[item.code] = {
                    ...state[CategoryTypeKey.MEDIUM].byId[item.code],
                    ...item
                };
            });

            const associated = associateWithParent(
                parentId,
                newState.allIds,
                CategoryTypeKey.LARGE
            );
            state[CategoryTypeKey.LARGE].byId[parentId].associateIds = associated;

            return {
                ...state,
                [CategoryTypeKey.MEDIUM]: newState
            };
        }
        case SET_ALL_MEDIUM_CATEGORY_LIST: {
            const items = action.payload;
            const newState = {
                byId: {},
                allIds: [],
                pending: false
            };

            items.forEach(item => {
                newState.allIds.push(item.code);
                newState.byId[item.code] = {
                    ...state[CategoryTypeKey.MEDIUM].byId[item.code],
                    ...item
                };
            });

            return {
                ...state,
                [CategoryTypeKey.MEDIUM]: newState
            };
        }
        case SET_SMALL_CATEGORY_LIST: {
            const { parentId, items } = action.payload;
            const newState = {
                byId: {},
                allIds: [],
                pending: false
            };

            items.forEach(item => {
                newState.allIds.push(item.id);
                newState.byId[item.id] = {
                    ...state[CategoryTypeKey.SMALL].byId[item.id],
                    ...item
                };
            });

            const associated = associateWithParent(
                parentId,
                newState.allIds,
                CategoryTypeKey.MEDIUM
            );
            state[CategoryTypeKey.MEDIUM].byId[parentId].associateIds = associated;

            return {
                ...state,
                [CategoryTypeKey.SMALL]: newState
            };
        }
        case SET_LARGE_CATEGORY: {
            const { code, level, name, status } = action.payload;
            const newCategory = {
                code,
                level,
                name,
                status
            };

            return {
                ...state,
                [CategoryTypeKey.LARGE]: {
                    ...state[CategoryTypeKey.LARGE],
                    byId: {
                        ...state[CategoryTypeKey.LARGE].byId,
                        [code]: newCategory
                    },
                    pending: false
                }
            };
        }
        case SET_MEDIUM_CATEGORY: {
            const { code, name, status, parentCode } = action.payload;
            const newCategory = {
                code,
                parentCode,
                name,
                status
            };
            const associated = associateWithParent(parentCode, [code], CategoryTypeKey.LARGE);
            state[CategoryTypeKey.LARGE].byId[parentCode].associateIds = associated;

            return {
                ...state,
                [CategoryTypeKey.MEDIUM]: {
                    ...state[CategoryTypeKey.MEDIUM],
                    byId: {
                        ...state[CategoryTypeKey.MEDIUM].byId,
                        [code]: newCategory
                    },
                    pending: false
                }
            };
        }
        case SET_SMALL_CATEGORY: {
            const { id, name, status, categoryGroupCodes } = action.payload;
            const newCategory = {
                id,
                name,
                status,
                categoryGroupCodes
            };

            categoryGroupCodes.forEach(parentId => {
                const associated = associateWithParent(parentId, [id], CategoryTypeKey.MEDIUM);
                state[CategoryTypeKey.MEDIUM].byId[parentId].associateIds = associated;
            });

            return {
                ...state,
                [CategoryTypeKey.SMALL]: {
                    ...state[CategoryTypeKey.SMALL],
                    byId: {
                        ...state[CategoryTypeKey.SMALL].byId,
                        [id]: newCategory
                    },
                    pending: false
                }
            };
        }
        case UPDATE_LARGE_CATEGORY: {
            const { code, level, name, status } = action.payload;
            const newCategory = {
                code,
                level,
                name,
                status
            };
            return {
                ...state,
                [CategoryTypeKey.LARGE]: {
                    ...state[CategoryTypeKey.LARGE],
                    byId: {
                        ...state[CategoryTypeKey.LARGE].byId,
                        [code]: {
                            ...state[CategoryTypeKey.LARGE].byId[code],
                            ...newCategory
                        }
                    },
                    pending: false
                }
            };
        }
        case UPDATE_MEDIUM_CATEGORY: {
            const { code, level, name, status, parentCode, file } = action.payload;
            const newCategory = {
                code,
                level,
                name,
                status,
                file,
                parentCode
            };

            return {
                ...state,
                [CategoryTypeKey.MEDIUM]: {
                    ...state[CategoryTypeKey.MEDIUM],
                    byId: {
                        ...state[CategoryTypeKey.MEDIUM].byId,
                        [code]: {
                            ...state[CategoryTypeKey.MEDIUM].byId[code],
                            ...newCategory
                        }
                    },
                    pending: false
                }
            };
        }
        case UPDATE_SMALL_CATEGORY: {
            const { id, level, name, status, categoryGroupCodes, file } = action.payload;
            const newCategory = {
                id,
                level,
                name,
                status,
                file,
                categoryGroupCodes
            };

            // 새로운 중분류에 소분류 id 를 추가한다.
            categoryGroupCodes.forEach(code => {
                const associated = associateWithParent(code, [id], CategoryTypeKey.MEDIUM);
                state[CategoryTypeKey.MEDIUM].byId[code].associateIds = associated;
            });
            // 기존 연결된 중분류에서 소분류 id를  제거한다.
            Object.values(state[CategoryTypeKey.MEDIUM].byId).forEach((medium: IMediumCategory) => {
                if (medium.associateIds) {
                    const index = medium.associateIds.indexOf(id);
                    if (index > -1 && !categoryGroupCodes.includes(medium.code)) {
                        medium.associateIds.splice(index, 1);
                        medium.associateIds = [...medium.associateIds];
                    }
                }
            });

            return {
                ...state,
                [CategoryTypeKey.SMALL]: {
                    ...state[CategoryTypeKey.SMALL],
                    byId: {
                        ...state[CategoryTypeKey.SMALL].byId,
                        [id]: {
                            ...state[CategoryTypeKey.SMALL].byId[id],
                            ...newCategory
                        }
                    },
                    pending: false
                }
            };
        }
        case REMOVE_CATEGORY: {
            const { id, type } = action.payload;

            // 삭제된 카테고리와의 연결 관계인 부모의 associateIds 에서 제거
            if (type === CategoryTypeKey.MEDIUM) {
                const largeId = state[CategoryTypeKey.MEDIUM].byId[id].parentCode;
                const largeCategory = state[CategoryTypeKey.LARGE].byId[largeId];
                largeCategory.associateIds = largeCategory.associateIds.filter(
                    associatedId => associatedId !== id
                );
            } else if (type === CategoryTypeKey.SMALL) {
                const associatedMediumIds =
                    state[CategoryTypeKey.SMALL].byId[id].categoryGroupCodes;
                associatedMediumIds.forEach(mediumId => {
                    const medium = state[CategoryTypeKey.MEDIUM].byId[mediumId];
                    if (medium.associateIds) {
                        medium.associateIds = medium.associateIds.filter(
                            associatedId => associatedId !== id
                        );
                    }
                });
            }

            delete state[type].byId[id];

            return {
                ...state,
                [type]: {
                    ...state[type],
                    byId: {
                        ...state[type].byId
                    },
                    pending: false
                }
            };
        }
        case SET_PENDING_CATEGORY: {
            const { type, value }: IPendingAction = action.payload;
            return {
                ...state,
                [type]: {
                    ...state[type],
                    pending: value
                }
            };
        }
        default:
            return state;
    }
}
