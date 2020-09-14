import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchLargeCategoryList,
    fetchMediumCategoryList,
    fetchSmallCategoryList
} from "./modules/category";
import LargeCategoryList from "./components/LargeCategoryList";
import MediumCategoryList from "./components/MediumCategoryList";
import SmallCategoryList from "./components/SmallCategoryList";
import CreatorModal from "./components/CreatorModal";
import { Button, Loader, Select } from "@lqt/lqt-ui";
import AppStyles from "./styles/AppStyle";
import GlobalStyles from "./styles/GlobalStyle";
import {
    CategoryLevel,
    CategoryModalType,
    CategoryStatus,
    CategoryStatusText,
    CategoryTypeKey,
    CategoryTypeText
} from "./enum/CategoryEnum";
import { FILTER_DEFAULT_INDEX } from "./config";
import {
    largeCategorySelector,
    mediumCategorySelector,
    smallCategorySelector
} from "./js/selectors";

const initialSelectedState = {
    [CategoryTypeKey.LARGE]: -1,
    [CategoryTypeKey.MEDIUM]: -1,
    [CategoryTypeKey.SMALL]: -1,
    currentLevel: -1,
    currentId: -1
};

const App = () => {
    const [filterStatus, updateFilterStatus] = useState(CategoryStatus.ALL);
    const [selectedData, updateSelectedData] = useState(initialSelectedState);
    const [modalType, updateModalType] = useState(CategoryModalType.OFF);
    const [loadingState, updateLoadingState] = useState({
        [CategoryTypeKey.LARGE]: false,
        [CategoryTypeKey.MEDIUM]: false,
        [CategoryTypeKey.SMALL]: false
    });
    const largeCategory = useSelector(state => largeCategorySelector(state, { filterStatus }));
    const mediumCategory = useSelector(state =>
        mediumCategorySelector(state, {
            selectedData: selectedData[CategoryTypeKey.LARGE],
            filterStatus
        })
    );
    const smallCategory = useSelector(state =>
        smallCategorySelector(state, {
            selectedData: selectedData[CategoryTypeKey.MEDIUM],
            filterStatus
        })
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (filterStatus === CategoryStatus.ALL) {
            dispatch(fetchLargeCategoryList());
        } else {
            dispatch(fetchLargeCategoryList(filterStatus));
        }
    }, [filterStatus]);

    const handleLoadingState = (type, value) => {
        const newValue = { ...loadingState };
        newValue[type] = value;
        updateLoadingState(newValue);
    };

    const refetchAfterSubmit = ({ level }) => {
        if (level === CategoryLevel.LARGE) {
            // 편집 모드일 때는 중분류 업데이트
            if (modalType === CategoryModalType.EDIT) {
                dispatch(fetchMediumCategoryList(selectedData.currentId, filterStatus !== CategoryStatus.ALL && filterStatus));
                // clickLargeCategory(selectedData.currentId);
            }
        } else if (level === CategoryLevel.MEDIUM) {
            // 편집 모드일 때는 중분류, 소분류 모두 업데이트. 생성 모드는 중분류만 업데이트
            clickLargeCategory(selectedData[CategoryTypeKey.LARGE]);
            if (modalType === CategoryModalType.EDIT) {
                clickMediumCategory(selectedData.currentId);
            }
        }
        updateModalType(CategoryModalType.OFF);
    };

    const refetchAfterDelete = async ({ level }) => {
        if (level === CategoryLevel.MEDIUM) {
            // 삭제 후 중분류 업데이트
            const selectedParentId = selectedData[CategoryTypeKey.LARGE];
            await dispatch(
                fetchMediumCategoryList(
                    selectedParentId,
                    filterStatus !== CategoryStatus.ALL && filterStatus
                )
            );
            updateSelectedData({
                ...selectedData,
                [CategoryTypeKey.MEDIUM]: -1,
                [CategoryTypeKey.SMALL]: -1,
                currentId: selectedParentId,
                currentLevel: CategoryLevel.LARGE
            });
        } else if (level === CategoryLevel.SMALL) {
            // 삭제 후 소분류 업데이트
            const selectedParentId = selectedData[CategoryTypeKey.MEDIUM];
            await dispatch(
                fetchSmallCategoryList(
                    selectedParentId,
                    filterStatus !== CategoryStatus.ALL && filterStatus
                )
            );
            updateSelectedData({
                ...selectedData,
                [CategoryTypeKey.SMALL]: -1,
                currentId: selectedParentId,
                currentLevel: CategoryLevel.MEDIUM
            });
        }
        updateModalType(CategoryModalType.OFF);
    };

    const clickLargeCategory = id => {
        dispatch(fetchMediumCategoryList(id, filterStatus !== CategoryStatus.ALL && filterStatus));
        updateSelectedData({
            ...selectedData,
            [CategoryTypeKey.LARGE]: id,
            [CategoryTypeKey.MEDIUM]: -1,
            [CategoryTypeKey.SMALL]: -1,
            currentId: id,
            currentLevel: CategoryLevel.LARGE
        });
    };

    const clickMediumCategory = id => {
        updateSelectedData({
            ...selectedData,
            [CategoryTypeKey.MEDIUM]: id,
            [CategoryTypeKey.SMALL]: -1,
            currentId: id,
            currentLevel: CategoryLevel.MEDIUM
        });
        dispatch(fetchSmallCategoryList(id, filterStatus !== CategoryStatus.ALL && filterStatus));
    };

    const clickSmallCategory = id => {
        updateSelectedData({
            ...selectedData,
            [CategoryTypeKey.SMALL]: id,
            currentId: id,
            currentLevel: CategoryLevel.SMALL
        });
    };

    const openEditorModal = () => {
        if (selectedData.currentId === -1) {
            window.alert("선택된 카테고리가 없습니다");
            return;
        }
        updateModalType(CategoryModalType.EDIT);
    };

    const openCreatorModal = () => {
        updateModalType(CategoryModalType.CREATE);
    };

    const filterByStatus = ({ selectedValue }) => {
        const status = Number(selectedValue);
        updateFilterStatus(status);
        updateSelectedData({ ...initialSelectedState });
    };

    return (
        <div id="categoryBody">
            <div className="categoriesHeader">
                <div className="filterSelect">
                    <span className="filterTitle">상태</span>
                    <Select
                        selectedIndex={FILTER_DEFAULT_INDEX}
                        option={[
                            CategoryStatusText.ALL,
                            CategoryStatusText.USED,
                            CategoryStatusText.UNUSED,
                            CategoryStatusText.READY
                        ]}
                        values={[
                            CategoryStatus.ALL,
                            CategoryStatus.USED,
                            CategoryStatus.UNUSED,
                            CategoryStatus.READY
                        ]}
                        change={filterByStatus}
                        placeholder={"선택해주세요."}
                        width="140px"
                        border="solid 1px #dbdbdb"
                    />
                </div>

                <div className="btnContainer">
                    <Button
                        text="선택 카테고리 수정"
                        color="#f26c55"
                        hoverColor="#f26c55 !important"
                        background="#fff"
                        border="solid 1px #f26c55"
                        margin="0 10px 0 0"
                        click={openEditorModal}
                    />
                    <Button
                        text="+ 신규 카테고리 등록"
                        color="#fff"
                        hoverColor="#fff !important"
                        background="#f26c55"
                        click={openCreatorModal}
                    />
                    {modalType > CategoryModalType.OFF && (
                        <CreatorModal
                            modalType={modalType}
                            updateModalType={updateModalType}
                            id={selectedData.currentId}
                            level={selectedData.currentLevel}
                            submitCallback={refetchAfterSubmit}
                            deleteCallback={refetchAfterDelete}
                        />
                    )}
                </div>
            </div>

            <div className="categoriesContainer">
                <div className="categoryWrapper">
                    {loadingState[CategoryTypeKey.LARGE] && (
                        <div className="loadingContainer">
                            <Loader isInline />
                        </div>
                    )}
                    <h3>{CategoryTypeText.LARGE}</h3>
                    <LargeCategoryList
                        categories={largeCategory.items}
                        focusedId={selectedData.currentId}
                        selectedId={selectedData[CategoryTypeKey.LARGE]}
                        pending={largeCategory.pending}
                        updateLoadingState={handleLoadingState}
                        onClickCategory={clickLargeCategory}
                    />
                </div>
                <div className="categoryWrapper">
                    {loadingState[CategoryTypeKey.MEDIUM] && (
                        <div className="loadingContainer">
                            <Loader isInline />
                        </div>
                    )}
                    <h3>{CategoryTypeText.MEDIUM}</h3>
                    {selectedData[CategoryTypeKey.LARGE] > -1 && (
                        <MediumCategoryList
                            categories={mediumCategory.items}
                            focusedId={selectedData.currentId}
                            selectedId={selectedData[CategoryTypeKey.MEDIUM]}
                            pending={mediumCategory.pending}
                            updateLoadingState={handleLoadingState}
                            onClickCategory={clickMediumCategory}
                        />
                    )}
                </div>
                <div className="categoryWrapper">
                    {loadingState[CategoryTypeKey.SMALL] && (
                        <div className="loadingContainer">
                            <Loader isInline />
                        </div>
                    )}
                    <h3>{CategoryTypeText.SMALL}</h3>
                    {selectedData[CategoryTypeKey.MEDIUM] > -1 && (
                        <SmallCategoryList
                            categories={smallCategory.items}
                            focusedId={selectedData.currentId}
                            selectedId={selectedData[CategoryTypeKey.SMALL]}
                            pending={smallCategory.pending}
                            updateLoadingState={handleLoadingState}
                            onClickCategory={clickSmallCategory}
                        />
                    )}
                </div>
            </div>
            <style jsx>{GlobalStyles}</style>
            <style jsx>{AppStyles}</style>
        </div>
    );
};

export default App;
