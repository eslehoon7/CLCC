import { useCallback, useEffect, useRef, useState } from 'react';
import GalleryUploadPage from './components/GalleryUploadPage';
import LoginScreen from './components/LoginScreen';
import PlaceholderPage from './components/PlaceholderPage';
import { HERO, INITIAL_PHOTOS, LINKS, type PageKey, type PhotoItem } from './data/galleryData';

function readSessionAuth(): boolean {
  try {
    return Boolean(sessionStorage.getItem('cl-admin'));
  } catch {
    return false;
  }
}

function writeSessionAuth(active: boolean) {
  try {
    if (active) {
      sessionStorage.setItem('cl-admin', '1');
    } else {
      sessionStorage.removeItem('cl-admin');
    }
  } catch {
    // ignore storage errors
  }
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => readSessionAuth());
  const [activePage, setActivePage] = useState<PageKey>('hero');
  const [photos, setPhotos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = useCallback((msg: string) => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToastMsg(msg);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMsg(null);
      toastTimerRef.current = null;
    }, 2400);
  }, []);

  function handleLoginSuccess() {
    writeSessionAuth(true);
    setActivePage('hero');
    setIsLoggedIn(true);
  }

  function handleLogout() {
    writeSessionAuth(false);
    setIsLoggedIn(false);
  }

  function handleAddPhotos(added: PhotoItem[]) {
    setPhotos((prev) => [...added, ...prev]);
  }

  function handleDeletePhoto(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <>
      <div id="app">
        <header className="head">
          <span className="badge">CL MASTER</span>
          <h1>CL컨벤션 · 브릿지36 통합 어드민 센터</h1>
          <span className="sp"></span>
          <button type="button" className="hbtn" id="logout" onClick={handleLogout}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M10 16l-4-4 4-4M6 12h10" />
            </svg>
            로그아웃
          </button>
          <a
            className="hbtn solid"
            href="https://clcc.co.kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            홈페이지 가기
          </a>
        </header>

        <div className="body">
          <aside className="side">
            <div className="cap">MENU</div>
            <button
              type="button"
              className={`nav${activePage === 'hero' ? ' on' : ''}`}
              onClick={() => setActivePage('hero')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 16l5-5 4 4 3-3 6 6" />
              </svg>
              <span id="nHero">메인사진 관리 ({HERO})</span>
            </button>
            <button
              type="button"
              className={`nav${activePage === 'gallery' ? ' on' : ''}`}
              onClick={() => setActivePage('gallery')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              <span id="nGal">갤러리 업로드 ({photos.length})</span>
            </button>
            <button
              type="button"
              className={`nav${activePage === 'links' ? ' on' : ''}`}
              onClick={() => setActivePage('links')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M10 14a4 4 0 005.6 0l3-3a4 4 0 00-5.6-5.6l-1 1" />
                <path d="M14 10a4 4 0 00-5.6 0l-3 3a4 4 0 005.6 5.6l1-1" />
              </svg>
              <span id="nLink">배너 링크 관리 ({LINKS}/3)</span>
            </button>
            <div className="grow"></div>
            <div className="note">
              <b>관리자 안내</b>이 화면에서 저장한 메인 사진, 갤러리, 배너 링크는 홈페이지에 바로
              반영됩니다.
            </div>
          </aside>

          <main className="main" id="view">
            {activePage === 'gallery' ? (
              <GalleryUploadPage
                photos={photos}
                onAddPhotos={handleAddPhotos}
                onDeletePhoto={handleDeletePhoto}
                onToast={showToast}
              />
            ) : (
              <PlaceholderPage page={activePage} />
            )}
          </main>
        </div>
      </div>

      {toastMsg && <div className="toast">{toastMsg}</div>}
    </>
  );
}
