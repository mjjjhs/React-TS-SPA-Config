import {
    IFormDataLargeCategory,
    IFormDataMediumCategory,
    IFormDataSmallCategory
} from './ICategory';
import { ReactNode } from 'react';

export interface ICreatorModal {
    id: number;
    level: number;
    modalType: number;
    updateModalType: (...args: any[]) => any;
    submitCallback: (...args: any[]) => any;
    deleteCallback: (...args: any[]) => any;
}

export interface IModal {
    id: number;
    editMode: boolean;
    title: string;
    datas: IFormDataLargeCategory & IFormDataMediumCategory & IFormDataSmallCategory;
    updateCurrentLevel: any;
    isShown: boolean;
    updateIsShown: any;
    onSubmit: (...args: any[]) => any;
    onDelete?: (...args: any[]) => any;
    onValidate?: (...args: any[]) => any;
    children?: ReactNode;
}
