import React, { useEffect, useMemo, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import {
    Button,
    IAddingFileErrorType,
    Input,
    ISelectReturnData,
    Loader,
    Modal,
    Radio,
    Select
} from "@lqt/lqt-ui";
import { useDispatch, useSelector } from "react-redux";
import {
    CategoryErrorText,
    CategoryLevel,
    CategoryModalText,
    CategoryOptionText,
    CategoryStatus,
    CategoryStatusText,
    CategoryTypeKey,
    CategoryTypeText
} from "../../enum/CategoryEnum";
import ModalStyle from "../../styles/ModalStyle";
import AddingFile from "@lqt/lqt-ui/lib/components/AddingFile";
import { RootState } from "../../modules";
import { IFormDataMediumCategory, ILargeCategory } from "../../interface/ICategory";
import { IModal } from "../../interface/IModal";
import { UploadConditionType } from "../../enum/UploadEnum";
import { fetchLargeCategoryList } from "../../modules/category";
import { typeOptions, typeValues, UPLOAD_LIMITED_SIZE } from "../../config";

let _isUnMounted = false;
const MediumCategoryModal = ({
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
    const parentItems: any = useSelector((state: RootState) => {
        const items = Object.keys(state.category[CategoryTypeKey.LARGE].byId).map(
            key => state.category[CategoryTypeKey.LARGE].byId[key]
        );
        return { items, pending: state.category[CategoryTypeKey.LARGE].pending };
    });
    const options = useMemo(() => {
        return parentItems.items.map(item => {
            return item.name;
        });
    }, [parentItems.items]);
    const values = useMemo(() => {
        return parentItems.items.map((item: ILargeCategory) => {
            return item.code;
        });
    }, [parentItems.items]);
    const [formData, updateFormData] = useState<IFormDataMediumCategory>({
        code: id,
        level: CategoryLevel.MEDIUM,
        name: "",
        status: CategoryStatus.READY,
        parentCode: -1,
        iconUrl: "",
        file: null
    });
    const [errors, updateErrors] = useState({
        isError: false,
        message: ""
    });
    const canSumbit = useMemo(() => {
        return (
            formData.name.trim() &&
            formData.status > -1 &&
            formData.level === CategoryLevel.MEDIUM &&
            formData.parentCode > -1 &&
            formData.iconUrl.trim()
        );
    }, [formData.status, formData.name, formData.level, formData.parentCode, formData.iconUrl]);
    const dispatch = useDispatch();

    useEffect(() => {
        _isUnMounted = false;
        dispatch(fetchLargeCategoryList());
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

    const associateWithParent = ({ selectedIndex, selectedValue }: ISelectReturnData) => {
        updateFormData({
            ...formData,
            parentCode: selectedValue
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
            const alertText = `${formData.name} 카테고리 및 연결된 소분류의 상태가 모두 '${statusText}'으로 변경됩니다. 상태를 변경하시겠습니까?`;
            if (!window.confirm(alertText)) {
                return;
            }
        }

        const isError = await checkDuplication();
        if (isError) {
            window.alert(CategoryErrorText.DUPLICATE);
            return;
        }
        if (formData.parentCode === -1) {
            window.alert(CategoryErrorText.NOT_CONNECT_LARGE);
            return;
        }
        onSubmit(formData);
    };

    const addFile = async ({ files }) => {
        const addedFile = files[0];
        const { base64, file } = addedFile.src;
        const { width, height } = addedFile;
        if (!(width >= UPLOAD_LIMITED_SIZE && height >= UPLOAD_LIMITED_SIZE && width === height)) {
            window.alert(UploadConditionType.LOGO_SIZE);
            return;
        }
        updateFormData({
            ...formData,
            iconUrl: base64,
            file
        });
    };

    const deleteFile = () => {
        updateFormData({
            ...formData,
            iconUrl: "",
            file: null
        });
    };

    const onErrorFile = (data: IAddingFileErrorType): void => {
        const { errors } = data;
        switch (errors[0].type) {
            case "unsupportedFileType":
                window.alert(UploadConditionType.PNG);
                break;
            case "maxSizeExceeded":
                window.alert(UploadConditionType.MAX_SIZE);
                break;
            case "multipleNotAllowed":
                window.alert(UploadConditionType.NO_SUPPORT_MULTI);
                break;
        }
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
                maxHeight={"537px"}
                padding={"0px"}
                zIndex={300}
            >
                {children}
                <Scrollbars style={{ height: editMode ? 537 : 497 }}>
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

                        <div className="row">
                            <div className="rowTitle center">
                                <span>
                                    {CategoryTypeText.LARGE} {CategoryOptionText.CHOOSE}
                                </span>
                                <strong>&nbsp;*</strong>
                            </div>
                            {parentItems.pending ? (
                                <div className="loadingWrapper">
                                    <Select option={[]} values={[]} />
                                    <div className="loadingBtn">
                                        <Loader isInline />
                                    </div>
                                </div>
                            ) : (
                                <Select
                                    selectedIndex={formData && values.indexOf(formData.parentCode)}
                                    option={options}
                                    values={values}
                                    visibleOptionCount={5}
                                    change={associateWithParent}
                                />
                            )}
                        </div>

                        <div className="row">
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
                            <div className="rowTitle">
                                <span>{CategoryOptionText.ICON}</span>
                                <strong>*</strong>
                            </div>
                            <div className="rowContent">
                                <AddingFile
                                    files={formData.iconUrl ? [formData.iconUrl] : []}
                                    maxSize={"700kb"}
                                    title={"+추가하기"}
                                    onError={onErrorFile}
                                    accept={["image/png"]}
                                    handleFiles={addFile}
                                    modifyFile={addFile}
                                    deleteFile={deleteFile}
                                />
                                <span className="addFileText">
                                    {UploadConditionType.UPLOAD_SUPPORT}
                                </span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="rowTitle">
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
                </Scrollbars>
            </Modal>
            <style jsx>{ModalStyle}</style>
        </>
    );
};

export default MediumCategoryModal;
