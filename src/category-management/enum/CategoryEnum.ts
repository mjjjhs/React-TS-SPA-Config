export enum CategoryCss {
    READY = 'ready',
    USED = 'used',
    UNUSED = 'unused'
}

export enum CategoryStatusText {
    READY = '준비중',
    USED = '사용',
    UNUSED = '미사용',
    ALL = '전체'
}

export enum CategoryStatus {
    READY = 0,
    USED = 1,
    UNUSED = 2,
    ALL = 9
}

export enum CategoryLevel {
    LARGE = 0,
    MEDIUM = 1,
    SMALL = 2
}

export enum CategoryTypeText {
    LARGE = '대분류',
    MEDIUM = '중분류',
    SMALL = '소분류'
}

export enum CategoryTypeKey {
    LARGE = 'large',
    MEDIUM = 'medium',
    SMALL = 'small'
}

export enum CategoryModalType {
    OFF = 0,
    CREATE = 1,
    EDIT = 2
}

export enum CategoryErrorText {
    DUPLICATE = '이미 사용 중인 카테고리명 입니다.',
    UNALLOW = '한글, 영문 대/소문자, 숫자, 슬래시(/), 괄호, 공백만 사용 가능합니다.',
    NOT_CONNECT_LARGE = '선택된 대분류가 없습니다.',
    NOT_CONNECT_MEDIUM = '선택된 중분류가 없습니다.'
}

export enum CategoryModalText {
    SAVE = '저장',
    CREATE = '등록',
    DELETE = '삭제하기'
}

export enum CategoryOptionText {
    ID = '카테고리 ID',
    TYPE = '분류',
    NAME = '카테고리명',
    ICON = '아이콘',
    CHOOSE = '선택',
    STATUS = '상태',
}