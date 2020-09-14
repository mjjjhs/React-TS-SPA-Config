import {
    Button,
    IAddingFileErrorType,
    IAddingFileReturnType,
    IInputReturnData,
    Input,
    IRadioReturnData,
    ITextareaReturnData,
    Radio,
    SelectedFile,
    Textarea
} from "@lqt/lqt-ui";
import * as React from "react";
import {useEffect, useState} from "react";
import cloneDeep from 'lodash-es/cloneDeep';
import uniqueId from 'lodash-es/uniqueId';
import {Scrollbars} from 'react-custom-scrollbars';
import {alertErr, axiosInstance} from "../helper";
import {IBrandDetail, IBrandImage} from '../interface/IBrandMngData';
import brandAddModDelModalContentStyles from '../styles/brandAddModDelModalContentStyles';
import AddingFile from "@lqt/lqt-ui/lib/components/AddingFile";
import {AxiosResponse} from "axios";
import {ApiEnums} from "../enums/BrandManagement";
import {
    IBrandAddModDelModalContentProps, IImgDimension,
    INoticeAddDelCallbackData
} from "../interface/IBrandMngCommon";

const initBody: IBrandDetail = {
    brandNm: '',
    image: {
        logo: null,
        main: null
    },
    information: '',
    notice: [''],
    activeYn: 'Y',
    id: null
};

const fixedMaxNoticeLength: number = 10;

function BrandAddModDelModalContent(
    {
        body,
        propsBrandNmErr,
        onClickBrandRegisterBtnInModal,
        onClickBrandModifyBtnInModal,
        onClickBrandDelBtnInModal,
        onBlurBrandNm,
        onSetErrorBrandNm
    }: IBrandAddModDelModalContentProps
): JSX.Element {

    const detailInfo = () => {
        let propsBody: IBrandDetail;
        if(body) {
            propsBody = cloneDeep(body);
            if (!propsBody?.notice) {
                propsBody.notice = [''];
            } else if (propsBody?.notice && !propsBody?.notice.length) {
                propsBody.notice =  propsBody.notice.concat('');
            }
            if (!propsBody?.information) {
                propsBody.information = '';
            }
            if(!propsBody?.image) {
                propsBody.image = {
                    logo: null,
                    main: null
                }
            }
        } else {
            propsBody = cloneDeep(initBody);
        }
        return propsBody;
    };

    const [brandDetailInfo, setBrandDetailInfo] = useState<IBrandDetail>(detailInfo());
    const [isFormValid, setIsFormValid] = useState<boolean>(!!body);
    const [imageBase64, setImageBase64] = useState<IBrandImage>({
        logo: brandDetailInfo.image.logo,
        main: brandDetailInfo.image.main
    });
    const [changedImg, setChangedImg] = useState<IBrandImage>(null);

    useEffect(() => {
        const {brandNm, image, activeYn} = brandDetailInfo;
        if (
            brandNm.trim() &&
            image.logo &&
            image.main &&
            (typeof activeYn === 'string' && activeYn.trim()) &&
            !propsBrandNmErr.isErr
        ) {
            onSetErrorBrandNm({
                ...propsBrandNmErr,
                isErr: false,
                msg: ''
            });
            setIsFormValid(true);
            return;
        }
        setIsFormValid(false);
    }, [brandDetailInfo.image, brandDetailInfo.brandNm, brandDetailInfo.activeYn, propsBrandNmErr.isErr]);

    useEffect(() => {
        onSetErrorBrandNm({
            ...propsBrandNmErr,
            isErr: false,
            msg: ''
        });
    }, [brandDetailInfo.brandNm]);

    const handleChangeBrandName = ({value}: IInputReturnData): void => {
        setBrandDetailInfo({
            ...brandDetailInfo,
            brandNm: value.toString()
        });
    };

    const handleChangeBrandNotice = ({value, callbackData}: IInputReturnData): void => {
        brandDetailInfo.notice[callbackData] = value.toString();
    };

    const handleChangeActivatedFilterRadio = ({value}: IRadioReturnData): void => {
        setBrandDetailInfo({
            ...brandDetailInfo,
            activeYn: value
        });
    };

    const handleChangeInfo = ({value}: ITextareaReturnData): void => {
        setBrandDetailInfo({
            ...brandDetailInfo,
            information: value.toString()
        });
    };

    const handleClickBrandRegisterBtnInModal = (): void => {
        onClickBrandRegisterBtnInModal(brandDetailInfo);
    };

    const handleClickBrandModifyBtnInModal = (): void => {
        onClickBrandModifyBtnInModal(brandDetailInfo, changedImg);
    };

    const handleClickNoticeDelBtn = (e: React.SyntheticEvent, callbackData: INoticeAddDelCallbackData): void => {
        if (brandDetailInfo.notice.length <= 1) {
            return;
        }

        const {idx} = callbackData;

        setBrandDetailInfo({
            ...brandDetailInfo,
            notice: brandDetailInfo.notice.filter((noticeItem, itmIdx) => idx !== itmIdx)
        });
    };

    const handleClickNoticeAddBtn = (e: React.SyntheticEvent, callbackData: INoticeAddDelCallbackData): void => {
        if (brandDetailInfo.notice.length >= fixedMaxNoticeLength) {
            alert('공지사항은 최대 10개까지 입력 가능합니다.');
            return;
        }

        const {idx} = callbackData;

        const cloneNotice = [...brandDetailInfo.notice];
        cloneNotice.splice(idx + 1, 0, '');

        setBrandDetailInfo({
            ...brandDetailInfo,
            notice: cloneNotice
        });
    };

    const handleBlurBrandNm = ({value}: IInputReturnData): void => {
        const stringValue = value.toString();
        if (!stringValue.trim() || (body && stringValue.trim() === body.brandNm)) {
            return;
        }

        onBlurBrandNm(stringValue);
    };

    const handleAddingFileResponseError = (data: IAddingFileErrorType): void => {
        const {errors, callbackData} = data;
        switch (errors[0].type) {
            case 'unsupportedFileType':
                const msg: string = callbackData === 'logo' ? 'PNG' : 'PNG, JPEG(JPG)';
                alert(`파일 형식이 ${msg}인 이미지만 첨부 가능합니다.`);
                break;
            case 'maxSizeExceeded':
                alert(`700kb 이하 용량의 이미지만 첨부 가능합니다.`);
                break;
            case 'multipleNotAllowed':
                alert('다중 업로드는 지원하지 않습니다.');
                break;
        }
    };

    const setBase64 = (type: string, files: SelectedFile[] | any) => {
        setImageBase64({
            ...imageBase64,
            [type]: files ? files[0].src.base64 : null
        })
    };

    const setFiles = (type: string, files: SelectedFile[]): void => {
        if (type === 'logo') {
            setBrandDetailInfo({
                ...brandDetailInfo,
                image: {
                    logo: files ? files[0].src.file : null,
                    main: brandDetailInfo.image.main
                }
            });
        } else {
            setBrandDetailInfo({
                ...brandDetailInfo,
                image: {
                    main: files ? files[0].src.file : null,
                    logo: brandDetailInfo.image.logo
                }
            });
        }
        setBase64(type, files);
    };

    const getImgRatioValid = ({width, height}: IImgDimension): boolean =>
        width * 2 / 3 === height;

    const getImageSizeValid = (type: string, imgFiles: SelectedFile[]): boolean => {
        const {width, height} = imgFiles[0];
        if (type === 'logo') {
            return width === 300 && height === 300 || width === 400 && height === 400;
        } else {
            return (width >= 1440 && height >= 960) && getImgRatioValid({width, height});
        }
    }

    const handleAddImgFile = (rv: IAddingFileReturnType): void => {
        const {callbackData, files}: { callbackData: string, files: SelectedFile[] } = rv;
        let cloneFiles: SelectedFile[] = files ? [...files] : null;

        if (cloneFiles) {
            const imgSizeValid = getImageSizeValid(callbackData, cloneFiles);
            if (!imgSizeValid) {
                if (callbackData === 'logo') {
                    alert('300 x 300 또는 400 x 400 규격의 정방형 이미지만 첨부 가능합니다.');
                } else {
                    alert('1440 x 960 (3:2 비율) 이상 규격의 이미지만 첨부 가능합니다.');
                }
                return;
            }
            changedImg ?
                setChangedImg({
                    ...changedImg,
                    [callbackData]: cloneFiles[0].src.file
                }) :
                setChangedImg({
                    [callbackData]: cloneFiles[0].src.file
                });
        }
        setFiles(callbackData, cloneFiles);
    };

    const handleDelImgFile = (rv: IAddingFileReturnType): void => {
        handleAddImgFile(rv);
    };

    const handleModImgFile = (rv: IAddingFileReturnType): void => {
        handleAddImgFile(rv);
    };

    const ShowErrMsg = ({brandNmErr}): JSX.Element => {
        if (brandNmErr.isErr) {
            return (
                <p className={'input-error-msg'}>
                    {brandNmErr.msg}
                    <style jsx={'true'}>{brandAddModDelModalContentStyles}</style>
                </p>
            );

        }
        return null;
    };

    const getRelationDealListReqUrl = (brandId: number) => `/${ApiEnums.BRAND}/${brandId}/deals`;

    const handleClickDelBtnInModal = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        const reqUrl = getRelationDealListReqUrl(brandDetailInfo.id);
        try {
            const res: AxiosResponse = await axiosInstance.get(reqUrl);

            if (!res) {
                return;
            }

            const {list} = res.data;

            if (list && list.length) {
                alert(`브랜드를 삭제할 수 없습니다. 딜 정보관리에서 브랜드 연결 해제 후 삭제하세요.`);
            } else {
                const confirm = window.confirm(`${brandDetailInfo.brandNm} 을/를 삭제하시겠습니까?`);
                if (confirm) {
                    onClickBrandDelBtnInModal(brandDetailInfo.id);
                }
            }
        } catch (e) {
            alertErr(e);
        }
    };

    const brandNameInputClassName: string = `row${propsBrandNmErr.isErr ? ' is-error' : ''}`;

    const getImgFiles = (type: string): string[] => {
        return imageBase64?.[type] ? [imageBase64[type].toString()] : [];
    };

    const textAreaValue: string = brandDetailInfo?.information ? brandDetailInfo.information.replace(/<br\s?\/?>/g, '\n') : '';

    const getBtnWrapperClassName = (isMinus: boolean, idx: number): string => {
        if(isMinus) {
            return `notice-btn ${brandDetailInfo.notice.length === 1 && idx === 0 ? 'disabled' : ''}`
        } else {
            return `notice-btn ${brandDetailInfo.notice.length === fixedMaxNoticeLength ? 'disabled' : ''}`;
        }
    };

    const getIsDisable = (isMinus: boolean, idx: number): boolean => {
        if(isMinus) {
            return brandDetailInfo?.notice?.length === 1 && idx === 0;
        } else {
            return brandDetailInfo?.notice?.length === fixedMaxNoticeLength;
        }
    };

    const getIsChecked = (activeValue: string): boolean => {
        return brandDetailInfo.activeYn === activeValue;
    };

    const btnHandler = !body ? handleClickBrandRegisterBtnInModal : handleClickBrandModifyBtnInModal;
    const btnText: string = !body ? '등록' : '저장';
    const modalEnabledScrollHeight: number = 758;
    const isBrandIdShow: string = `row${!!body ? ' show' : ''}`;

    return (
        <Scrollbars
            style={{height: modalEnabledScrollHeight}}
        >
            <div className={'modal-content-wrap'}>
                <div className={isBrandIdShow}>
                    <span>브랜드 ID</span>
                    <div>
                        <p>{brandDetailInfo?.id}</p>
                    </div>
                </div>
                <div className={brandNameInputClassName}>
                    <span>브랜드명</span><span> *</span>
                    <div>
                        <Input
                            name={'branNm'}
                            placeholder={'한글, 영문 대/소문자, 숫자, 슬래시(/), underscore(_), 괄호, 공백만 입력 가능합니다.'}
                            value={brandDetailInfo?.brandNm}
                            maxCount={30}
                            isUseCharacterCounter={true}
                            focusedBorderColor={'#a8a8a8'}
                            characterCounterColor={'#757575'}
                            width={'656px'}
                            height={'36px'}
                            background={'fff'}
                            border={'1px solid #dbdbdb'}
                            isError={propsBrandNmErr?.isErr}
                            margin={'0 0 0 0'}
                            blur={handleBlurBrandNm}
                            change={handleChangeBrandName}
                        />
                        <ShowErrMsg brandNmErr={propsBrandNmErr}/>
                    </div>
                </div>
                <div className={'row'}>
                    <div>
                        <span>로고</span><span> *</span>
                        <div className={'adding-file-wrap'}>
                            <AddingFile
                                files={getImgFiles('logo')}
                                maxSize={'700kb'}
                                handleFiles={handleAddImgFile}
                                title={'+추가하기'}
                                deleteFile={handleDelImgFile}
                                modifyFile={handleModImgFile}
                                onError={handleAddingFileResponseError}
                                accept={['image/png']}
                                callbackData={'logo'}
                            />
                        </div>
                    </div>
                    <p>이미지 규격 : 300 x 300 or 400 x 400 / 용량 : 700kb이하 / 파일형식 : PNG</p>
                </div>
                <div className={'row'}>
                    <div>
                        <span>대표 이미지</span><span> *</span>
                        <div className={'adding-file-wrap'}>
                            <AddingFile
                                files={getImgFiles('main')}
                                maxSize={'700kb'}
                                width={'201px'}
                                handleFiles={handleAddImgFile}
                                title={'+추가하기'}
                                deleteFile={handleDelImgFile}
                                modifyFile={handleModImgFile}
                                onError={handleAddingFileResponseError}
                                accept={['image/jpeg', 'image/png']}
                                callbackData={'main'}
                            />
                        </div>
                    </div>
                    <p>이미지 규격 : 1440 x 960 이상 (3:2 비율) / 용량 : 700kb이하 / 파일형식 : PNG, JPEG(JPG)</p>
                </div>
                <div className={'row'}>
                    <span>소개글</span>
                    <div>
                        <Textarea
                            value={textAreaValue}
                            isError={false}
                            wrapperWidth={'656px'}
                            height={'96px'}
                            maxCount={100}
                            change={handleChangeInfo}
                        />
                    </div>
                </div>
                <div className={'row'}>
                    <span>공지사항</span>
                    <div className={'column-wrap'}>
                        {
                            brandDetailInfo?.notice &&
                            brandDetailInfo.notice.map((notice, idx) =>
                                <div key={uniqueId('key_')}>
                                    <Input
                                        name={`notice_${idx}`}
                                        value={notice}
                                        maxCount={100}
                                        isUseCharacterCounter={true}
                                        characterCounterColor={'#757575'}
                                        width={'576px'}
                                        height={'36px'}
                                        background={'#fff'}
                                        border={'1px solid #dbdbdb'}
                                        margin={'0 0 0 0'}
                                        change={handleChangeBrandNotice}
                                        callbackData={idx}
                                    />
                                    <span
                                        className={getBtnWrapperClassName(true, idx)}>
                                                <Button
                                                    imgUrl={'/static/ui/gajago/images/brand-management/minus-on@3x.png'}
                                                    width={'36px'}
                                                    height={'36px'}
                                                    background={'#fff'}
                                                    imgWidth={'15px'}
                                                    imgHeight={'2px'}
                                                    margin={'-1px'}
                                                    borderRadius={'0'}
                                                    color={'#f26c55'}
                                                    border={'none'}
                                                    isDisabled={getIsDisable(true, idx)}
                                                    disabledBackground={'#fff'}
                                                    disabledOpacity={'0.15'}
                                                    click={handleClickNoticeDelBtn}
                                                    callbackData={{type: 'DEL', idx}}
                                                />
                                            </span>
                                    <span
                                        className={getBtnWrapperClassName(false, idx)}>
                                                <Button
                                                    imgUrl={'/static/ui/gajago/images/brand-management/plus-on@3x.png'}
                                                    width={'36px'}
                                                    height={'36px'}
                                                    background={'#fff'}
                                                    imgWidth={'15px'}
                                                    imgHeight={'15px'}
                                                    borderRadius={'0'}
                                                    margin={'-1px'}
                                                    color={'#f26c55'}
                                                    border={'none'}
                                                    isDisabled={getIsDisable(false, idx)}
                                                    disabledBackground={'#fff'}
                                                    disabledOpacity={'0.15'}
                                                    click={handleClickNoticeAddBtn}
                                                    callbackData={{type: 'ADD', idx}}
                                                />
                                            </span>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={'row'}>
                    <span>활성화 여부</span><span> *</span>
                    <span>
                        <Radio
                            name={'activateFilterInModal'}
                            value={'Y'}
                            isChecked={getIsChecked('Y')}
                            text={'Y'}
                            callbackData={{
                                index: 0
                            }}
                            change={handleChangeActivatedFilterRadio}
                            checkedBackground={'#f26c55'}
                            checkedBorder={'1px solid #f26c55'}
                            margin={'0 20px 0 0'}
                            fontSize={'12px'}
                            labelMargin={'-1px 0 0 8px'}
                        />
                        <Radio
                            name={'activateFilterInModal'}
                            value={'N'}
                            isChecked={getIsChecked('N')}
                            text={'N'}
                            callbackData={{
                                index: 1
                            }}
                            change={handleChangeActivatedFilterRadio}
                            checkedBackground={'#f26c55'}
                            checkedBorder={'1px solid #f26c55'}
                            margin={'0 20px 0 0'}
                            fontSize={'12px'}
                            labelMargin={'-1px 0 0 8px'}
                        />
                    </span>
                </div>
                <div className={'row'}>
                    {
                        body &&
                        <a
                            className={'brand-del-btn'}
                            href={'#'}
                            onClick={handleClickDelBtnInModal}
                        >
                            삭제하기
                        </a>
                    }
                    <div>
                        <Button
                            width={'89px'}
                            height={'36px'}
                            padding={'0 32px'}
                            borderRadius={'4px'}
                            background={'#f26c55'}
                            isDisabled={!isFormValid}
                            text={btnText}
                            textTop={'0'}
                            click={btnHandler}
                        />
                    </div>
                </div>
            </div>
            <style jsx={'true'}>{brandAddModDelModalContentStyles}</style>
        </Scrollbars>
    )
}

export default BrandAddModDelModalContent;