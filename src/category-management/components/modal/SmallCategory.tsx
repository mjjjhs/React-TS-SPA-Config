import React, { useEffect, useMemo, useState } from "react";
import {
    Button,
    Checkbox,
    IAddingFileErrorType,
    ICheckBoxProps,
    Input,
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
import SmallCategoryModalStyle from "../../styles/SmallCategoryModalStyle";
import AddingFile from "@lqt/lqt-ui/lib/components/AddingFile";
import { RootState } from "../../modules";
import { fetchAllMediumCategoryList } from "../../modules/category";
import { IFormDataSmallCategory } from "../../interface/ICategory";
import { IModal } from "../../interface/IModal";
import { UploadConditionType } from "../../enum/UploadEnum";
import { typeOptions, typeValues, UPLOAD_LIMITED_SIZE } from "../../config";

let _isUnMounted = false;
const SmallCategoryModal = ({
    onSubmit,
    onDelete,
    onValidate,
    editMode,
    title,
    datas,
    updateCurrentLevel,
    isShown,
    updateIsShown,
    children
}: IModal) => {
    const parentItems: any = useSelector((state: RootState) => {
        const items = Object.keys(state.category[CategoryTypeKey.MEDIUM].byId).map(
            key => state.category[CategoryTypeKey.MEDIUM].byId[key]
        );
        return { items, pending: state.category[CategoryTypeKey.MEDIUM].pending };
    });
    const [errors, updateErrors] = useState({
        isError: false,
        message: ""
    });
    const [formData, updateFormData] = useState<IFormDataSmallCategory>({
        level: CategoryLevel.SMALL,
        name: "",
        status: CategoryStatus.READY,
        categoryGroupCodes: [],
        iconUrl: "",
        file: null
    });
    const canSumbit = useMemo(() => {
        return (
            formData.name.trim() &&
            formData.status > -1 &&
            formData.level === CategoryLevel.SMALL &&
            formData.categoryGroupCodes.length > 0
        );
    }, [formData.status, formData.name, formData.level, formData.categoryGroupCodes]);
    const dispatch = useDispatch();

    useEffect(() => {
        _isUnMounted = false;
        dispatch(fetchAllMediumCategoryList());
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

    const associateWithParent = ({ id, isChecked }: ICheckBoxProps) => {
        const code = Number(id);
        const prevCodes = [...formData.categoryGroupCodes];
        const index = formData.categoryGroupCodes.indexOf(code);
        if (!isChecked && index > -1) {
            prevCodes.splice(index, 1);
        } else {
            prevCodes.push(code);
        }
        updateFormData({
            ...formData,
            categoryGroupCodes: prevCodes
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
        const isError = await checkDuplication();
        if (isError) {
            window.alert(CategoryErrorText.DUPLICATE);
            return;
        }
        if (formData.categoryGroupCodes.length === 0) {
            window.alert(CategoryErrorText.NOT_CONNECT_MEDIUM);
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
                maxHeight={"744px"}
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
                                <strong>{formData.id}</strong>
                            </div>
                        </div>
                    )}
                    <div className="row">
                        <div className="rowTitle center">
                            <span>
                                {CategoryOptionText.TYPE} <strong>*</strong>
                            </span>
                        </div>
                        <div className="rowContent">
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
                            <span>
                                {CategoryOptionText.NAME} <strong>*</strong>
                            </span>
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
                            <span>
                                {CategoryTypeText.MEDIUM} {CategoryOptionText.CHOOSE}
                                <strong>&nbsp;*</strong>
                            </span>
                        </div>
                        <div className="rowContent">
                            {parentItems.pending ? (
                                <div className="loadingWrapper">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="mediumCheckbox">
                                                    <span className="text">
                                                        {CategoryOptionText.CHOOSE}
                                                    </span>
                                                </th>
                                                <th className="mediumId">
                                                    <span className="text">
                                                        {CategoryOptionText.ID}
                                                    </span>
                                                </th>
                                                <th className="mediumName">
                                                    <span className="text">
                                                        {CategoryOptionText.NAME}
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div className="loadingBtn">
                                        <Loader isInline />
                                    </div>
                                </div>
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="mediumCheckbox">
                                                <span className="text">
                                                    {CategoryOptionText.CHOOSE}
                                                </span>
                                            </th>
                                            <th className="mediumId">
                                                <span className="text">
                                                    {CategoryOptionText.ID}
                                                </span>
                                            </th>
                                            <th className="mediumName">
                                                <span className="text">
                                                    {CategoryOptionText.NAME}
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {parentItems.items.map(item => (
                                            <tr key={`medium-${item.code}`}>
                                                <td>
                                                    <Checkbox
                                                        change={associateWithParent}
                                                        id={item.code}
                                                        isChecked={formData.categoryGroupCodes.includes(
                                                            item.code
                                                        )}
                                                        labelMargin={"0"}
                                                    />
                                                </td>
                                                <td>
                                                    <span>{item.code}</span>
                                                </td>
                                                <td>
                                                    <span>{item.name}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="rowTitle">
                            <span>
                                {CategoryOptionText.STATUS} <strong>*</strong>
                            </span>
                        </div>
                        <div className="rowContent">
                            <Radio
                                name={"status"}
                                value={CategoryStatus.READY.toString()}
                                text={CategoryStatusText.READY}
                                isChecked={formData.status === CategoryStatus.READY}
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
                                change={changeCategoryStatus}
                                checkedBackground={"#f26c55"}
                                checkedBorder={"1px solid #f26c55"}
                            />
                        </div>
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
            <style jsx>{SmallCategoryModalStyle}</style>
        </>
    );
};

export default SmallCategoryModal;
