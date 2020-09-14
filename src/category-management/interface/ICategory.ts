export interface ILargeCategory {
    code: number;
    name: string;
    status: any;
    level?: number;
    associateIds?: Array<number>;
}

export interface IMediumCategory extends ILargeCategory {
    parentCode: number;
    iconUrl?: string;
    file?: File;
    smallIds?: any;
}

export interface ISmallCategory {
    id: number;
    name: string;
    status: any;
    categoryGroupCodes: Array<number>
    level?: number;
    iconUrl?: string;
    file?: File;
    associateIds?: Array<number>;
}

export interface IFormDataLargeCategory {
    code?: number;
    level: number;
    status: number;
    name: string;
}

export interface IFormDataMediumCategory {
    code?: number;
    level: number;
    status: number;
    name: string;
    parentCode: number;
    iconUrl?: string;
    file?: any;
}

export interface IFormDataSmallCategory {
    id?: number;
    level: number;
    status: number;
    name: string;
    categoryGroupCodes: Array<number>
    iconUrl?: string;
    file?: any;
}