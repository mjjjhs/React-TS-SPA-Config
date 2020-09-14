import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LargeCategoryModal from "./modal/LargeCategory";
import MediumCategoryModal from "./modal/MediumCategory";
import SmallCategoryModal from "./modal/SmallCategory";
import { CategoryErrorText, CategoryLevel, CategoryModalType } from "../enum/CategoryEnum";
import {
    deleteCategory,
    postLargeCategory,
    postMediumCategory,
    postSmallCategory,
    postValidation,
    putLargeCategory,
    putMediumCategory,
    putSmallCategory
} from "../modules/category";
import { fetchCategoryDetails } from "../modules/categoryDetails";
import {
    IFormDataLargeCategory,
    IFormDataMediumCategory,
    IFormDataSmallCategory
} from "../interface/ICategory";
import { Loader } from "@lqt/lqt-ui";
import { ICreatorModal } from "../interface/IModal";
import { modalDatasSelector } from "../js/selectors";

const components = {
    0: LargeCategoryModal,
    1: MediumCategoryModal,
    2: SmallCategoryModal
};

const CreatorModal = ({
    id,
    level,
    modalType,
    updateModalType,
    submitCallback,
    deleteCallback
}: ICreatorModal) => {
    const [currentLevel, updateCurrentLevel] = useState(level === -1 ? CategoryLevel.LARGE : level);
    const [isShown, updateIsShown] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const modalDatas = useSelector(state =>
        modalDatasSelector(state, { modalType, originLevel: level, currentLevel, id })
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (modalType === CategoryModalType.EDIT) {
            dispatch(
                fetchCategoryDetails({
                    id,
                    level: currentLevel
                })
            );
        }
    }, []);

    useEffect(() => {
        if (modalDatas) {
            setIsLoaded(modalDatas.pending);
        }
    }, [modalDatas]);

    useEffect(() => {
        // 선택된 상위 카테고리 있으면, 분류값은 하위 카테고리로 자동 지정
        if (modalType === CategoryModalType.CREATE) {
            let newLevel = CategoryLevel.LARGE;
            if (level === CategoryLevel.LARGE) {
                newLevel = CategoryLevel.MEDIUM;
            } else if (level === CategoryLevel.MEDIUM) {
                newLevel = CategoryLevel.SMALL;
            }
            updateCurrentLevel(newLevel);
        }
    }, [level]);

    useEffect(() => {
        if (!isShown) {
            updateModalType(0);
        }
    }, [isShown]);

    const checkValidName = async (name: string) => {
        const trimmingText = name.trim();

        if (!/^[가-힣a-zA-Z0-9\s+/+(+)+\[+\]+{+}]+$/.test(trimmingText)) {
            return {
                isError: true,
                message: CategoryErrorText.UNALLOW
            };
        }

        if (modalType === CategoryModalType.EDIT && modalDatas.datas.name === trimmingText) {
            // 수정일 경우에는 현재 카테고리 명은 배제
            return {
                isError: false,
                message: ""
            };
        } else {
            const isValid = await dispatch(
                postValidation({ name: trimmingText, level: currentLevel })
            );
            if (!isValid) {
                return {
                    isError: true,
                    message: CategoryErrorText.DUPLICATE
                };
            }
        }

        return {
            isError: false,
            message: ""
        };
    };

    const onSubmit = async (
        datas: IFormDataLargeCategory & IFormDataMediumCategory & IFormDataSmallCategory
    ) => {
        let success = false;
        setIsLoaded(true);
        if (modalType === CategoryModalType.CREATE) {
            if (currentLevel === CategoryLevel.LARGE) {
                success = await dispatch(postLargeCategory(datas));
            } else if (currentLevel === CategoryLevel.MEDIUM) {
                success = await dispatch(postMediumCategory(datas));
            } else {
                success = await dispatch(postSmallCategory(datas));
            }
        } else {
            // 수정 후 선택된 카테고리가 없을 경우에 대한 처리 필요
            if (currentLevel === CategoryLevel.LARGE) {
                success = await dispatch(putLargeCategory(datas));
            } else if (currentLevel === CategoryLevel.MEDIUM) {
                success = await dispatch(putMediumCategory(datas));
            } else {
                success = await dispatch(putSmallCategory(datas));
            }
        }
        if (success) {
            if (submitCallback) {
                submitCallback({
                    level: currentLevel
                });
            }
        } else {
            setIsLoaded(false);
        }
    };

    const onDelete = () => {
        const confirmed = window.confirm("정말 삭제하시겠습니까?");
        if (confirmed) {
            dispatch(deleteCategory({ id, level: currentLevel }));
            if (deleteCallback) {
                deleteCallback({
                    level: currentLevel
                });
            }
        }
    };

    const TypeComponent = components[currentLevel];
    return (
        <>
            <TypeComponent
                onDelete={onDelete}
                onSubmit={onSubmit}
                onValidate={checkValidName}
                id={id}
                title={
                    modalType === CategoryModalType.CREATE ? "신규 카테고리 등록" : "카테고리 수정"
                }
                editMode={modalType === CategoryModalType.EDIT}
                datas={modalDatas && modalDatas.datas}
                updateCurrentLevel={updateCurrentLevel}
                isShown={isShown}
                updateIsShown={updateIsShown}
            >
                {isLoaded && (
                    <div
                        style={{
                            position: "absolute",
                            display: "flex",
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 9
                        }}
                    >
                        <Loader />
                    </div>
                )}
            </TypeComponent>
        </>
    );
};

export default CreatorModal;
