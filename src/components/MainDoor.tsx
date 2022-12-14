import Link from 'next/link';
import Image from 'next/image';

import styles from './mainDoor.module.scss';
import { useRouter } from 'next/router';

export default function MainDoor() {
  const router = useRouter();

  function handleClick() {
    router.push('/about');
  }

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <span>작업과 기록의 블로그</span>
        <h1>
          안녕하세요! <br />
          프론트엔드 개발자 <br />
          <strong>홍원배</strong>입니다
        </h1>
        <p>제가 공부한 내용을 정리하여 공유하는 블로그입니다</p>

        <button type="button" onClick={handleClick}>
          About Me
        </button>
      </div>

      <div className={styles.githubImage}>
        <a href="https://github.com/shongs27" target="_blank" rel="noreferrer" title="깃허브">
          <div className={styles.imageWrapper}>
            <Image
              src="https://avatars.githubusercontent.com/u/55541745?v=4"
              alt="릭앤모티 모티"
              width={380}
              height={380}
            />
          </div>
        </a>
      </div>
    </div>
  );
}
