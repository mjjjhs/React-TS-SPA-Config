export interface IUserInfo {
    id: number,
    name: string
}
export interface IRemoveUser {
    (id: number): {type:string, payload: number}
}
export interface IAddUser {
    (userInfo: IUserInfo): {type: string, payload: IUserInfo}
}