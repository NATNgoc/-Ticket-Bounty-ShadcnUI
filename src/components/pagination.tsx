import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface PaginationMeta {
  total: number;
  curPage: number;
  totalPage: number;
  next: boolean;
  previous: boolean;
  limit: number;
}

export interface PaginationProps {
  paginationMeta: PaginationMeta;
  onPageChange: (page: number) => void;
  className?: string;
}

export function PaginationComponent(props: PaginationProps) {
  const { curPage, totalPage, next, previous } = props.paginationMeta;
  const onPageChange = props.onPageChange;
  const renderPageNumbers = () => {
    const pages = [];

    // Nếu tổng số trang nhỏ hơn hoặc bằng 5, hiển thị tất cả
    if (totalPage <= 5) {
      for (let i = 0; i <= totalPage - 1; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === curPage}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Nếu số trang nhiều, hiển thị dạng "sẽ cắt bớt" (ellipsis)
      if (curPage <= 2) {
        // Trang đầu đến trang 3, sau đó ellipsis và trang cuối
        for (let i = 0; i <= 3 - 1; i++) {
          pages.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={i === curPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(i);
                }}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key={totalPage - 1}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(totalPage - 1);
              }}
            >
              {totalPage - 1}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (curPage >= totalPage - 1 - 2) {
        // Trang đầu, ellipsis và 3 trang cuối
        pages.push(
          <PaginationItem key={0}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(0);
              }}
            >
              0
            </PaginationLink>
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
        for (let i = totalPage - 2 - 1; i <= totalPage - 1; i++) {
          pages.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={i === curPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(i);
                }}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        // Trường hợp trang hiện tại nằm giữa: hiển thị trang đầu, ellipsis, (curPage-1, curPage, curPage+1), ellipsis, trang cuối
        pages.push(
          <PaginationItem key={0}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(0);
              }}
            >
              0
            </PaginationLink>
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
        for (let i = curPage - 1; i <= curPage + 1; i++) {
          pages.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={i === curPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(i);
                }}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key={totalPage - 1}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(totalPage - 1);
              }}
            >
              {totalPage - 1}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    return pages;
  };

  return (
    <Pagination className={props.className}>
      <PaginationContent className="grid grid-cols-[100px_1fr_100px] w-full">
        {previous ? (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(curPage - 1);
              }}
            />
          </PaginationItem>
        ) : (
          <div></div>
        )}

        <div className="flex w-full justify-center">{renderPageNumbers()}</div>

        {next ? (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(curPage + 1);
              }}
            />
          </PaginationItem>
        ) : (
          <div></div>
        )}
      </PaginationContent>
    </Pagination>
  );
}
