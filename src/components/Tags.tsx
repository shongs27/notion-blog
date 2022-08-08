import { useAppDispatch } from "@/hooks/redux";
import { setTag } from "@/stores/slice";

import styles from "./tags.module.scss";

export default function Tags({ tags = [] }) {
  const dispatch = useAppDispatch();

  const handleClick = (e) => {
    dispatch(setTag(e.currentTarget.textContent));
  };

  return (
    <ul className={styles.category}>
      <li>
        <button type="button" onClick={handleClick} data-tag={"전체"}>
          전체
        </button>
      </li>

      {tags.map(({ name, color, count }) => (
        <li key={name}>
          <button type="button" onClick={handleClick} data-tag={name}>
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
}