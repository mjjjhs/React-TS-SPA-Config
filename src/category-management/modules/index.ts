import { combineReducers } from 'redux';
import category from "./category";
import categoryDetails from "./categoryDetails";

const rootReducer: any = combineReducers({
    category,
    categoryDetails
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

