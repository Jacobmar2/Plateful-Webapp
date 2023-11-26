import { Pagination as BsPagination } from "react-bootstrap";

import "./Pagination.css";

export function Pagination({ pageCount, currentPage, window, onPageClick }) {
    let paginationItems = [];

    let pageInt = Number(currentPage);

    paginationItems.push(
        <BsPagination.First
            key="pgFirst"
            disabled={pageInt <= 1}
            onClick={() => onPageClick(1)}
        />
    );

    paginationItems.push(
        <BsPagination.Prev
            key="pgPrev"
            disabled={pageInt <= 1}
            onClick={() => {
                onPageClick(pageInt - 1);
            }}
        />
    );

    const [pageStart, pageEnd] = calcPageBounds(
        pageInt,
        1,
        pageCount,
        window || 7
    );

    if (pageStart > 1) {
        paginationItems.push(
            <BsPagination.Ellipsis
                key="pgElipL"
                disabled
                className="ellipsis"
            />
        );
    }

    for (let pgNum = pageStart; pgNum <= pageEnd; pgNum++) {
        paginationItems.push(
            <BsPagination.Item
                key={"pg" + pgNum}
                active={pgNum === pageInt}
                onClick={pgNum === pageInt ? null : () => onPageClick(pgNum)}
            >
                {pgNum}
            </BsPagination.Item>
        );
    }

    if (pageEnd < pageCount) {
        paginationItems.push(
            <BsPagination.Ellipsis
                key="pgElipR"
                disabled
                className="ellipsis"
            />
        );
    }

    paginationItems.push(
        <BsPagination.Next
            key="pgNext"
            disabled={currentPage >= pageCount}
            onClick={() => onPageClick(pageInt + 1)}
        />
    );

    paginationItems.push(
        <BsPagination.Last
            key="pgLast"
            disabled={currentPage >= pageCount}
            onClick={() => onPageClick(pageCount)}
        />
    );

    return (
        <BsPagination id="pagination" className="d-flex justify-content-center">
            {paginationItems}
        </BsPagination>
    );
}

export default Pagination;

function calcPageBounds(page, pageFirst, pageLast, window) {
    let halfWindow = Math.floor(window / 2);

    let pageStart = Math.max(
        Math.min(page + halfWindow, pageLast) - 2 * halfWindow,
        pageFirst
    );
    let pageEnd = Math.min(
        Math.max(page - halfWindow, pageFirst) + 2 * halfWindow,
        pageLast
    );
    return [pageStart, pageEnd];
}
