import React, { useEffect, useMemo, useState } from "react";
import { Button, Input, Modal, Radio, Select } from "@lqt/lqt-ui";
import {
    CategoryErrorText,
    CategoryLevel,
    CategoryModalText,
    CategoryOptionText,
    CategoryStatus,
    CategoryStatusText
} from "../../enum/CategoryEnum";
import ModalStyle from "../../styles/ModalStyle";
import { IFormDataLargeCategory } from "../../interface/ICategory";
import { IModal } from "../../interface/IModal";
import { typeOptions, typeValues } from "../../config";

let _isUnMounted = false;
const LargeCategoryModal = ({
    onSubmit,
    onDelete,
    onValidate,
    id,
    editMode,
    title,
    datas,
    updateCurrentLevel,
    isShown,
    updateIsShown,
    children
}: IModal) => {
    const [formData, updateFormData] = useState<IFormDataLargeCategory>({
        code: id,
        level: CategoryLevel.LARGE,
        name: "",
        status: CategoryStatus.READY
    });
    const [errors, updateErrors] = useState({
        isError: false,
        message: ""
    });
    const canSumbit = useMemo(() => {
        return (
            formData.name.trim() && formData.status > -1 && formData.level === CategoryLevel.LARGE
        );
    }, [formData.status, formData.name, formData.level]);

    useEffect(() => {
        _isUnMounted = false;
        return () => {
            _isUnMounted = true;
        };
    }, []);

    useEffect(() => {
        if (datas) {
            updateFormData({
                ...formData,
                ...datas
            });
        }
    }, [datas]);

    const changeCategoryLevel = ({ selectedValue: value }) => {
        const level: number = Number(value);
        updateCurrentLevel(level);
    };

    const changeCategoryName = ({ value }) => {
        updateFormData({
            ...formData,
            name: value
        });
    };

    const changeCategoryStatus = ({ value }) => {
        const status: number = Number(value);
        updateFormData({
            ...formData,
            status
        });
    };

    const checkDuplication = async () => {
        const { isError, message } = await onValidate(formData.name);
        if (!_isUnMounted) {
            updateErrors({
                isError,
                message
            });
        }
        return isError;
    };

    const submit = async () => {
        if (editMode && formData.status !== CategoryStatus.USED) {
            let statusText = "";
            if (formData.status === CategoryStatus.READY) {
                statusText = CategoryStatusText.READY;
            } else if (formData.status === CategoryStatus.UNUSED) {
                statusText = CategoryStatusText.UNUSED;
            }
            const alertText = `${formData.name} 카테고리 및 연결된 중분류와 소분류의 상태가 모두 '${statusText}'으로 변경됩니다. 상태를 변경하시겠습니까?`;
            if (!window.confirm(alertText)) {
                return;
            }
        }

        const isError = await checkDuplication();
        if (isError) {
            window.alert(CategoryErrorText.DUPLICATE);
            return;
        }
        onSubmit(formData);
    };

    return (
        <>
            <Modal
                title={title}
                isShowed={isShown}
                onCloseClick={() => {
                    updateIsShown(false);
                }}
                width={"620px"}
                padding={"0px"}
                zIndex={300}
            >
                {children}
                <div className={`content ${editMode && "edit"}`}>
                    {editMode && (
                        <div className="row">
                            <div className="rowTitle">
                                <span>{CategoryOptionText.ID}</span>
                            </div>
                            <div>
                                <strong>{formData.code}</strong>
                            </div>
                        </div>
                    )}
                    <div className="row">
                        <div className="rowTitle center">
                            <span>{CategoryOptionText.TYPE}</span>
                            <strong>*</strong>
                        </div>
                        <div>
                            <Select
                                selectedIndex={formData && typeValues.indexOf(formData.level)}
                                option={typeOptions}
                                values={typeValues}
                                isDisabled={editMode}
                                change={changeCategoryLevel}
                            />
                        </div>
                    </div>

                    <div className={errors.isError ? "row error" : "row"}>
                        <div className="rowTitle center">
                            <span>{CategoryOptionText.NAME}</span>
                            <strong>*</strong>
                        </div>
                        <div>
                            <Input
                                name={"name"}
                                value={formData.name}
                                placeholder={CategoryErrorText.UNALLOW}
                                isUseCharacterCounter
                                maxCount={10}
                                change={changeCategoryName}
                                blur={checkDuplication}
                                width={"473px"}
                                characterCounterColor={"#f26c55"}
                                isError={errors.isError}
                            />
                            {errors.isError && <p className="errorText">{errors.message}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="rowTitle center">
                            <span>{CategoryOptionText.STATUS}</span>
                            <strong>*</strong>
                        </div>
                        <Radio
                            name={"status"}
                            value={CategoryStatus.READY.toString()}
                            text={CategoryStatusText.READY}
                            isChecked={formData.status === CategoryStatus.READY}
                            isDisabled={!editMode}
                            change={changeCategoryStatus}
                            margin={"0 20px 0 0"}
                            checkedBackground={"#f26c55"}
                            checkedBorder={"1px solid #f26c55"}
                        />
                        <Radio
                            name={"status"}
                            value={CategoryStatus.USED.toString()}
                            text={CategoryStatusText.USED}
                            isChecked={formData.status === CategoryStatus.USED}
                            isDisabled={!editMode}
                            change={changeCategoryStatus}
                            margin={"0 20px 0 0"}
                            checkedBackground={"#f26c55"}
                            checkedBorder={"1px solid #f26c55"}
                        />
                        <Radio
                            name={"status"}
                            value={CategoryStatus.UNUSED.toString()}
                            text={CategoryStatusText.UNUSED}
                            isChecked={formData.status === CategoryStatus.UNUSED}
                            isDisabled={!editMode}
                            change={changeCategoryStatus}
                            checkedBackground={"#f26c55"}
                            checkedBorder={"1px solid #f26c55"}
                        />
                    </div>

                    <div className="row">
                        {editMode && (
                            <Button
                                text={CategoryModalText.DELETE}
                                textDecoration={"underline"}
                                padding={"0"}
                                color={"#000"}
                                background={"transparent"}
                                click={onDelete}
                            />
                        )}

                        <Button
                            text={editMode ? CategoryModalText.SAVE : CategoryModalText.CREATE}
                            padding={"0 32px"}
                            background={"#f26c55"}
                            isDisabled={!canSumbit}
                            click={submit}
                        />
                    </div>
                </div>
            </Modal>
            <style jsx>{ModalStyle}</style>
        </>
    );
};

export default LargeCategoryModal;
