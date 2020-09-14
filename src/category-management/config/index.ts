import {CategoryCss, CategoryLevel, CategoryStatusText, CategoryTypeText} from "../enum/CategoryEnum";

export const statusCategory = {
    0: CategoryCss.READY,
    1: CategoryCss.USED,
    2: CategoryCss.UNUSED
};

export const statusCategoryText = {
    0: CategoryStatusText.READY,
    1: CategoryStatusText.USED,
    2: CategoryStatusText.UNUSED
};

export const typeOptions = [CategoryTypeText.LARGE, CategoryTypeText.MEDIUM, CategoryTypeText.SMALL];
export const typeValues = [CategoryLevel.LARGE, CategoryLevel.MEDIUM, CategoryLevel.SMALL];

export const ALL_GROUPS_LIST_URL = "/api/v1/yanolja/category/groups?level=0";
export const GROUP_LIST_URL = "/api/v1/yanolja/category/groups?level=1&parentCode=";
export const GROUPS_URL = "/api/v1/yanolja/category/groups";
export const ALL_GROUP_LIST_URL = "/api/v1/yanolja/category/groups?level=1";
export const GROUP_URL = "/api/v1/yanolja/category/groups";
export const TYPE_LIST_URL = "/api/v1/yanolja/category/types?categoryGroupCode=";
export const TYPE_URL = "/api/v1/yanolja/category/types";
export const GROUPS_VALIDATE_URL = "/api/v1/yanolja/category/groups/validate";
export const TYPE_VALIDATE_URL = "/api/v1/yanolja/category/types/validate";

export const FILTER_DEFAULT_INDEX = 0;

export const UPLOAD_LIMITED_SIZE = 152;

export const SPINNER_THRESHOLD = 1000;
