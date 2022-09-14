import { useAppDispatch } from '@/hooks/redux';
import { changeCurrentPage, setTag } from '@/stores/slice';
import { Itag } from '@/types/index';

import styles from './tags.module.scss';

interface ITags {
  tags: Itag[];
}

export default function Tags({ tags }: ITags) {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(changeCurrentPage(1));
    dispatch(setTag(e.currentTarget.textContent!));
  };

  return (
    <ul className={styles.container}>
      <li>
        <button type="button" onClick={handleClick} data-testid={'전체'}>
          전체
        </button>
      </li>

      {tags?.map(({ name, color }) => (
        <li key={name}>
          <button type="button" onClick={handleClick} data-testid={name} style={{ backgroundColor: color }}>
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
}
