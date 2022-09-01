import styles from './tableOfContents.module.scss';

import useElements from '@/hooks/useElements';
import useObserveTOC from '@/hooks/useObserveTOC';

interface IPostId {
  postId: string;
}

export default function TableOfContents({ postId }: IPostId) {
  const elements = useElements(postId);

  const { activeId } = useObserveTOC();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string | undefined) {
    e.preventDefault();

    const targetElement = document.querySelector(`[data-id="${id}"]`);

    targetElement
      ? targetElement.scrollIntoView({
          behavior: 'smooth',
        })
      : window.scrollTo(0, 0);
  }

  return (
    <nav className={styles.container}>
      <ul>
        {elements.map(({ id, title, level }) => (
          <li
            key={`${id}-${title}`}
            style={{
              marginLeft: `${level - 1}em`,
              fontWeight: activeId === id ? 'bold' : 'normal',
              color: activeId === id ? '#8d99ff' : 'inherit',
            }}
          >
            <a href={`/#${id}`} onClick={(e) => handleClick(e, id)}>
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
