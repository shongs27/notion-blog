import styles from "./pageNation.module.scss";

export default function PageNation({ page, totalPage, handlePage }) {
  function handleClick(e) {
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
        Page {page}/{totalPage}
      </span>

      <button
        type="button"
        data-page="1"
        onClick={handleClick}
        disabled={page === 1}
      >
        &lt;&lt; First
      </button>

      <button
        type="button"
        data-page="prev"
        onClick={handleClick}
        disabled={page === 1}
      >
        Prev
      </button>

      {Array(totalPage)
        .fill()
        .map((_, i) => (
          <button
            key={i}
            type="button"
            data-page={i + 1}
            onClick={handleClick}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </button>
        ))}

      <button
        type="button"
        data-page="next"
        onClick={handleClick}
        disabled={page === totalPage}
      >
        Next
      </button>

      <button
        type="button"
        data-page={totalPage}
        onClick={handleClick}
        disabled={page === totalPage}
      >
        Last &gt; &gt;
      </button>
    </div>
  );
}
