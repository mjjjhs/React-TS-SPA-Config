export interface IResponse {
    success: boolean;
    status: number;
    body: any;
    alert?: boolean;
    error?: IResponseError;
    message?: string;
    redirect?: string;
    timestamp?: number;
}

interface IResponseError {
    exception: string;
    code: string;
    message: string;
    path: string;
    trace: string;
}
