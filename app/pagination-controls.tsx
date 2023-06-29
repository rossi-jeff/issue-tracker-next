import { useEffect, useState } from "react";

export default function PaginationControls({
  offset,
  limit,
  count,
  pageChanged,
  limitChanged,
}: {
  offset: number;
  limit: number;
  count: number;
  pageChanged: Function;
  limitChanged: Function;
}) {
  const [pages, setPages] = useState<number[]>([]);
  const [current, setCurrent] = useState<{
    page: number;
    perPage: number;
    first: number;
    last: number;
  }>({
    page: 1,
    perPage: 10,
    first: 0,
    last: 0,
  });
  const perPageOptions: number[] = [5, 10, 25];

  const firstPage = () => {
    pageChanged(1);
  };

  const previousPage = () => {
    if (current.page == 1) return;
    pageChanged(current.page - 1);
  };

  const nextPage = () => {
    if (current.page + 1 > pages[pages.length - 1]) return;
    pageChanged(current.page + 1);
  };

  const lastPage = () => {
    pageChanged(pages[pages.length - 1]);
  };

  const pageSelectChanged = (ev: any) => {
    const idx = ev.target.selectedIndex;
    pageChanged(pages[idx]);
  };

  const perPageSelectChanged = (ev: any) => {
    const idx = ev.target.selectedIndex;
    limitChanged(perPageOptions[idx]);
  };

  useEffect(() => {
    const pageArray: number[] = [];
    let counter = 0;
    let page = 1;
    while (counter < count) {
      pageArray.push(page);
      counter += limit;
      page++;
    }
    setPages(pageArray);
    let currentPage = Math.floor(offset / limit) + 1;
    setCurrent({
      page: currentPage,
      perPage: limit,
      first: (currentPage - 1) * limit + 1,
      last: Math.min((currentPage - 1) * limit + limit, count),
    });
  }, [offset, limit, count]);
  return (
    <div className="card" id="pagination-controls">
      <div className="flex flex-wrap justify-between">
        <div>
          <button onClick={firstPage}>First</button>
        </div>
        <div>
          <button onClick={previousPage}>Previous</button>
        </div>
        <div>
          <label htmlFor="PerPage">Per Page</label>
          <select name="PerPage" onChange={perPageSelectChanged}>
            {perPageOptions.map((p) => (
              <option key={p} value={p} selected={p == current.perPage}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <strong>{current.first}</strong> to <strong>{current.last}</strong> of{" "}
          <strong>{count}</strong>
        </div>
        <div>
          <label htmlFor="Page">Page</label>
          <select name="Page" onChange={pageSelectChanged}>
            {pages.map((p) => (
              <option key={p} value={p} selected={p == current.page}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={nextPage}>Next</button>
        </div>
        <div>
          <button onClick={lastPage}>Last</button>
        </div>
      </div>
    </div>
  );
}
