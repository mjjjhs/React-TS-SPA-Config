import {IUserInfo} from "../interfaces/User";

export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const addUser = (userInfo: IUserInfo): {type: string, payload: IUserInfo} => ({type: ADD_USER, payload: userInfo});
export const removeUser = (id: number): {type: string, payload: number} => ({type: REMOVE_USER, payload: id});
