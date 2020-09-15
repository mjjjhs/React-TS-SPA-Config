import {ADD_USER, REMOVE_USER} from "../actions/User";
import {IUserInfo} from "../interfaces/User";

const userReducer = (state: IUserInfo[] = [], action: {type: string, payload: any}) => {
    switch (action.type) {
        case ADD_USER:
            return state.concat(action.payload);
        case REMOVE_USER:
            return state.filter(user => user.id !== action.payload);
        default:
            return state;
    }
};

export {userReducer};