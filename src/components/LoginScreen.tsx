import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AUTH } from '../data/galleryData';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [uid, setUid] = useState('');
  const [upw, setUpw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const failsRef = useRef(0);
  const lockUntilRef = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const uidRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    uidRef.current?.focus();
  }, []);

  function fail(msg: string) {
    setErrMsg(msg);
    const formEl = formRef.current;
    if (formEl) {
      formEl.classList.remove('shake');
      void formEl.offsetWidth;
      formEl.classList.add('shake');
    }
    setUpw('');
    pwRef.current?.focus();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const now = Date.now();
    if (now < lockUntilRef.current) {
      setErrMsg(
        `로그인을 여러 번 실패했습니다. ${Math.ceil((lockUntilRef.current - now) / 1000)}초 후 다시 시도해 주세요.`,
      );
      return;
    }

    const id = uid.trim();
    const p = upw;
    if (!id || !p) {
      fail('아이디와 비밀번호를 모두 입력해 주세요.');
      return;
    }

    if (id === AUTH.id && p === AUTH.pw) {
      failsRef.current = 0;
      setErrMsg('');
      setUid('');
      setUpw('');
      onLoginSuccess();
      return;
    }

    failsRef.current += 1;
    if (failsRef.current >= 5) {
      lockUntilRef.current = now + 30000;
      failsRef.current = 0;
      fail('로그인을 5번 실패해 30초 동안 잠겼습니다.');
    } else {
      fail('아이디 또는 비밀번호가 틀렸습니다.');
    }
  }

  return (
    <section id="login" aria-label="관리자 로그인">
      <form className="lcard" id="loginForm" ref={formRef} onSubmit={handleSubmit} noValidate>
        <span className="badge">CL MASTER</span>
        <h1>CL컨벤션 관리자 로그인</h1>
        <p className="lead">홈페이지 메인 사진, 갤러리, 배너 링크를 관리합니다.</p>
        <div className="field">
          <label htmlFor="uid">아이디</label>
          <input
            ref={uidRef}
            id="uid"
            name="uid"
            autoComplete="username"
            required
            value={uid}
            onChange={(e) => {
              setUid(e.target.value);
              setErrMsg('');
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="upw">비밀번호</label>
          <input
            ref={pwRef}
            id="upw"
            name="upw"
            type={showPw ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={upw}
            onChange={(e) => {
              setUpw(e.target.value);
              setErrMsg('');
            }}
          />
          <button
            type="button"
            className="eye"
            id="eye"
            aria-label="비밀번호 보기"
            onClick={() => setShowPw((prev) => !prev)}
          >
            {showPw ? '숨기기' : '보기'}
          </button>
        </div>
        <button className="btn" type="submit">
          로그인
        </button>
        <div id="loginErr" role="alert" aria-live="assertive">
          {errMsg}
        </div>
        <div className="lnote">계정 문의는 온브랜디움으로 연락해 주세요.</div>
      </form>
    </section>
  );
}
