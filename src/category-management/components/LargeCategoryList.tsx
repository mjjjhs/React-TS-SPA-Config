import React, { useEffect, useMemo } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import CategoryItemStyle from "../styles/CategoryItemStyle";
import { SPINNER_THRESHOLD, statusCategory, statusCategoryText } from "../config";
import { CategoryTypeKey } from "../enum/CategoryEnum";

const LargeCategoryListItem = ({
    id,
    name,
    focusedId,
    selectedId,
    openSubCategory,
    status
}: any) => {
    const title = useMemo(() => {
        return `[${id.toString().slice(0, 4)}] ${name}`;
    }, [id, name]);
    const statusText = useMemo(() => {
        return statusCategoryText[status];
    }, [status]);

    let itemClassNames = id === selectedId ? "selected" : "";
    itemClassNames += " ";
    itemClassNames += id === focusedId ? "focused" : "";
    itemClassNames.trim();

    return (
        <li>
            <a
                className={itemClassNames}
                onClick={openSubCategory}
                data-category-uid={id}
                href="#none"
            >
                <span className="titleText">{title}</span>
                <span className={`statusText ${statusCategory[status]}`}>{statusText}</span>
            </a>
            <style jsx>{CategoryItemStyle}</style>
        </li>
    );
};

const LargeCategoryList = ({
    categories,
    focusedId,
    selectedId,
    pending,
    updateLoadingState,
    onClickCategory
}: any) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            updateLoadingState(CategoryTypeKey.LARGE, true);
        }, SPINNER_THRESHOLD);

        if (!pending) {
            updateLoadingState(CategoryTypeKey.LARGE, false);
            clearTimeout(timer);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [pending]);

    const openSubCategory = (e: any, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        onClickCategory(id);
    };

    return (
        <Scrollbars style={{height: 538}}>
            <ul className="categoryList">
                {categories.length > 0 ? (
                    categories.map(item => (
                        <LargeCategoryListItem
                            key={`large-${item.code}`}
                            id={item.code}
                            name={item.name}
                            status={item.status}
                            focusedId={focusedId}
                            selectedId={selectedId}
                            openSubCategory={e => openSubCategory(e, item.code)}
                        />
                    ))
                ) : (
                    <li>
                        {!pending && (
                            <a onClick={e => e.preventDefault()} href="#none">
                                존재하는 대분류가 없습니다.
                            </a>
                        )}
                    </li>
                )}
                <style jsx>{CategoryItemStyle}</style>
            </ul>
        </Scrollbars>
    );
};

export default LargeCategoryList;
