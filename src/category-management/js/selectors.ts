import { createSelector } from "reselect";
import { RootState } from "../modules";
import {
    CategoryLevel,
    CategoryModalType,
    CategoryStatus,
    CategoryTypeKey
} from "../enum/CategoryEnum";
import { IMediumCategory, ISmallCategory } from "../interface/ICategory";

// A helper function to create the parameter selectors
function createParameterSelector(selector) {
    return (_, params) => selector(params);
}

const getSelected = createParameterSelector(params => params.selectedData);
const getFiltered = createParameterSelector(params => params.filterStatus);
const getModalType = createParameterSelector(params => params.modalType);
const getCurrentLevel = createParameterSelector(params => params.currentLevel);
const getId = createParameterSelector(params => params.id);
const getOriginLevel = createParameterSelector(params => params.originLevel);

export const largeCategorySelector = createSelector(
    (state: RootState) => state.category[CategoryTypeKey.LARGE],
    getFiltered,
    (large, filtered) => {
        let items = Object.keys(large.byId).map(key => large.byId[key]);
        if (filtered !== CategoryStatus.ALL) {
            items = items.filter(item => item.status === filtered);
        }
        return {
            items,
            pending: large.pending
        };
    }
);

export const mediumCategorySelector = createSelector(
    (state: RootState) => state.category[CategoryTypeKey.LARGE],
    (state: RootState) => state.category[CategoryTypeKey.MEDIUM],
    getSelected,
    getFiltered,
    (large, medium, selected, filtered) => {
        if (selected < 0) {
            return {
                items: [],
                pending: medium.pending
            };
        }
        const ids = large.byId[selected]?.associateIds;
        if (!ids) {
            return {
                items: [],
                pending: medium.pending
            };
        }
        const items = ids
            .map(id => {
                return medium.byId[id];
            })
            .filter((item: IMediumCategory) => {
                if (filtered !== CategoryStatus.ALL) {
                    return item && item.status === filtered;
                }
                return item;
            });
        return { items, pending: medium.pending };
    }
);

export const smallCategorySelector = createSelector(
    (state: RootState) => state.category[CategoryTypeKey.MEDIUM],
    (state: RootState) => state.category[CategoryTypeKey.SMALL],
    getSelected,
    getFiltered,
    (medium, small, selected, filtered) => {
        if (selected < 0) {
            return {
                items: [],
                pending: small.pending
            };
        }
        const ids = medium.byId[selected]?.associateIds;
        if (!ids) {
            return {
                items: [],
                pending: small.pending
            };
        }
        const items = ids
            .map(id => {
                return small.byId[id];
            })
            .filter((item: IMediumCategory) => {
                if (filtered !== CategoryStatus.ALL) {
                    return item && item.status === filtered;
                }
                return item;
            });

        return { items, pending: small.pending };
    }
);

export const modalDatasSelector = createSelector(
    (state: RootState) => state.categoryDetails,
    getModalType,
    getCurrentLevel,
    getOriginLevel,
    getId,
    (categoryDetails, modalType, currentLevel, originLevel, id) => {
        let datas;
        let pending = false;
        if (modalType === CategoryModalType.CREATE) {
            // 등록 모드일 때, 선택된 상위 카테고리 초기 셋팅
            // 생성 당시 선택된 카테고리는 대분류, but 현재 카테고리는 소분류일 경우에는 id 매칭이 되지 않는 경우 제외
            if (originLevel === CategoryLevel.LARGE && currentLevel === CategoryLevel.MEDIUM) {
                // 생성할 당시 선택된 카테고리가 대분류이면서, 현재 타켓된 카테고리는 중분류일 경우
                const targetDatas: Partial<IMediumCategory> = {
                    parentCode: id
                };
                datas = targetDatas;
            } else if (
                originLevel === CategoryLevel.MEDIUM &&
                currentLevel === CategoryLevel.SMALL
            ) {
                // 생성할 당시 선택된 카테고리가 중분류이면서, 현재 타켓된 카테고리는 소분류일 경우
                const targetDatas: Partial<ISmallCategory> = {
                    categoryGroupCodes: [id]
                };
                datas = targetDatas;
            }
            return {
                datas,
                pending
            };
        }

        datas = categoryDetails.byId[id] || null;
        pending = categoryDetails.pending;

        return { datas, pending };
    }
);
