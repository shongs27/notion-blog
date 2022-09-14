import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { changeContactForm, sendContact } from '@/stores/slice';
import { useRouter } from 'next/router';

import styles from './contact.module.scss';

export default function Contact() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { name, email, message } = useAppSelector((state) => state.contactForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;
    dispatch(changeContactForm({ name, value }));
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(sendContact());
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <h1>Contact</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.forminputs}>
          <div className={styles.forminput}>
            <label htmlFor="name">이름</label>
            <input type="text" id="name" name="name" placeholder="이름" onChange={handleChange} value={name} />
          </div>

          <div className={styles.forminput}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="이메일 주소"
              onChange={handleChange}
              value={email}
            />
          </div>
        </div>

        <div className={styles.formText}>
          <label htmlFor="message">메시지</label>
          <textarea
            id="message"
            name="message"
            placeholder="메시지를 입력하세요"
            onChange={handleChange}
            value={message}
          />
        </div>

        <div className={styles.formButton}>
          <button type="submit">전송</button>
        </div>
      </form>
    </div>
  );
}
