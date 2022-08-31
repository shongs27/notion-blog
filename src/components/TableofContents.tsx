import styles from './tableOfContents.module.scss';

import useElements from '@/hooks/useElements';

export default function TableOfContents() {
  //   const elements = [{ id: 1, title: '그에게 주어지는 합격목걸이', level: 1 }];
  const elements = useElements();

  return (
    <div className={styles.container}>
      <ul>
        {elements.map(({ id, title, level }) => (
          <li key={`${id}-${title}`} style={{ paddingLeft: `${level - 1}em` }}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}
