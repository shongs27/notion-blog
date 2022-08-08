import React, { memo } from "react";
import styles from "./pageNation.module.scss";

interface IpageNation {
  currentPage: number;
  totalPage: number;
  handlePage: (move: string | undefined) => void;
}

export default memo(function PageNation({
  currentPage,
  totalPage,
  handlePage,
}: IpageNation) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const {
      currentTarget: {
        dataset: { page },
      },
    } = e;

    handlePage(page);
  }

  return (
    <div className={styles.pageNation}>
      <span>
        Page {currentPage}/{totalPage}
      </span>

      <button
        type="button"
        data-page="1"
        onClick={handleClick}
        disabled={currentPage === 1}
      >
        &lt;&lt; First
      </button>

      <button
        type="button"
        data-page="prev"
        onClick={handleClick}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {Array.from({ length: totalPage }).map((_, i) => (
        <button
          key={i}
          type="button"
          data-page={i + 1}
          onClick={handleClick}
          aria-current={currentPage === i + 1 ? "page" : false}
        >
          {i + 1}
        </button>
      ))}

      <button
        type="button"
        data-page="next"
        onClick={handleClick}
        disabled={currentPage === totalPage}
      >
        Next
      </button>

      <button
        type="button"
        data-page={totalPage}
        onClick={handleClick}
        disabled={currentPage === totalPage}
      >
        Last &gt;&gt;
      </button>
    </div>
  );
});
