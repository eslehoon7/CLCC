import { useEffect, useRef, useState, type DragEvent, type FormEvent, type KeyboardEvent } from 'react';
import { ALBUMS, MAX_PICKS, getAlbumName, type PhotoItem } from '../data/galleryData';
import { compressImage, type CompressedPick } from '../utils/imageCompress';

interface GalleryUploadPageProps {
  photos: PhotoItem[];
  onAddPhotos: (added: PhotoItem[]) => void;
  onDeletePhoto: (id: string) => void;
  onToast: (msg: string) => void;
}

export default function GalleryUploadPage({
  photos,
  onAddPhotos,
  onDeletePhoto,
  onToast,
}: GalleryUploadPageProps) {
  const [album, setAlbum] = useState('');
  const [cap, setCap] = useState('');
  const [gErr, setGErr] = useState('');
  const [picks, setPicks] = useState<CompressedPick[]>([]);
  const [galFilter, setGalFilter] = useState('all');
  const [isDragOver, setIsDragOver] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState<PhotoItem | null>(null);

  const albumSelectRef = useRef<HTMLSelectElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (confirmTarget) {
      cancelBtnRef.current?.focus();
    }
  }, [confirmTarget]);

  const countByAlbum = (albumId: string) => photos.filter((p) => p.album === albumId).length;

  async function addFiles(list: FileList | null) {
    if (!list) return;
    setGErr('');
    let files = Array.from(list).filter((f) => f.type.startsWith('image/'));
    if (!files.length) {
      setGErr('사진 파일만 올릴 수 있습니다.');
      return;
    }
    const room = MAX_PICKS - picks.length;
    if (room <= 0) {
      setGErr(`한 번에 최대 ${MAX_PICKS}장까지 올릴 수 있습니다.`);
      return;
    }
    if (files.length > room) {
      setGErr(`한 번에 최대 ${MAX_PICKS}장까지 올릴 수 있어서 ${room}장만 추가했습니다.`);
      files = files.slice(0, room);
    }
    const compressed = (await Promise.all(files.map(compressImage))).filter(
      (item): item is CompressedPick => item !== null,
    );
    setPicks((prev) => [...prev, ...compressed]);
  }

  function handleDropzoneKeyDown(e: KeyboardEvent<HTMLLabelElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  }

  function handleDragOver(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave() {
    setIsDragOver(false);
  }

  function handleDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setIsDragOver(false);
    void addFiles(e.dataTransfer.files);
  }

  function handleRemovePick(index: number) {
    setPicks((prev) => prev.filter((_, idx) => idx !== index));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!album) {
      setGErr('앨범을 먼저 선택해 주세요.');
      albumSelectRef.current?.focus();
      return;
    }
    if (!picks.length) {
      setGErr('올릴 사진을 선택해 주세요.');
      return;
    }

    const trimmedCap = cap.trim();
    let n = countByAlbum(album);
    const albumLabel = getAlbumName(album);
    const added: PhotoItem[] = picks.map((p) => ({
      id: 'n' + Date.now() + Math.random(),
      album,
      cap: trimmedCap || `${albumLabel} · ${++n}`,
      file: p.name,
      src: p.url,
      isNew: true,
    }));

    onAddPhotos(added);
    setPicks([]);
    setAlbum('');
    setCap('');
    setGErr('');
    setGalFilter(album);
    onToast(`${albumLabel}에 ${added.length}장을 등록했습니다.`);
  }

  const filteredPhotos = photos.filter((p) => galFilter === 'all' || p.album === galFilter);

  const chips: [string, string, number][] = [
    ['all', '전체', photos.length],
    ...ALBUMS.map((a): [string, string, number] => [a.id, a.name, countByAlbum(a.id)]),
  ];

  return (
    <div className="gwrap">
      <form className="card" id="gForm" onSubmit={handleSubmit} noValidate>
        <h2>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 16l5-5 4 4 3-3 6 6" />
          </svg>
          갤러리 사진 추가
        </h2>
        <p className="desc">홈페이지 갤러리(GALLERY) 페이지의 앨범에 사진을 올립니다.</p>

        <div className="f">
          <div className="row">
            <label htmlFor="gAlbum">앨범 선택</label>
            <span className="hint">필수</span>
          </div>
          <select
            ref={albumSelectRef}
            id="gAlbum"
            value={album}
            onChange={(e) => {
              setAlbum(e.target.value);
              setGErr('');
            }}
          >
            <option value="">앨범을 선택하세요</option>
            {ALBUMS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({countByAlbum(a.id)}장)
              </option>
            ))}
          </select>
        </div>

        <div className="f">
          <label htmlFor="gCap">사진 설명</label>
          <input
            type="text"
            id="gCap"
            placeholder="비워두면 '앨범 이름 · 번호'로 자동 입력됩니다"
            maxLength={40}
            value={cap}
            onChange={(e) => setCap(e.target.value)}
          />
        </div>

        <div className="f">
          <div className="row">
            <label>사진 파일</label>
            <span className="hint">한 번에 최대 {MAX_PICKS}장</span>
          </div>
          <label
            className={`drop${isDragOver ? ' over' : ''}`}
            id="gDrop"
            tabIndex={0}
            onKeyDown={handleDropzoneKeyDown}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M12 9v6M9 12h6" />
            </svg>
            <b>컴퓨터에서 사진 선택 (최대 {MAX_PICKS}장)</b>
            <small>여기로 사진을 끌어다 놓아도 됩니다. 큰 사진은 자동으로 줄여서 올립니다.</small>
            <input
              ref={fileInputRef}
              type="file"
              id="gFile"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                void addFiles(e.target.files);
                e.target.value = '';
              }}
            />
          </label>
          <div className="ferr" id="gErr" role="alert">
            {gErr}
          </div>
          <div className="picks" id="gPicks">
            {picks.map((p, i) => (
              <div key={`${p.name}-${i}`}>
                <img src={p.url} alt="" />
                <button
                  type="button"
                  aria-label="선택 취소"
                  onClick={() => handleRemovePick(i)}
                >
                  ×
                </button>
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="btn gbtn" id="gBtn" type="submit">
          {picks.length ? `갤러리 사진 ${picks.length}장 등록하기` : '갤러리 사진 등록하기'}
        </button>
        <p className="demo">지금은 화면 미리보기입니다. 실제 저장은 Firebase 연결 후 작동합니다.</p>
      </form>

      <section>
        <div className="gtop">
          <h2>
            홈페이지 갤러리 등록 사진 (<span id="gCount">{photos.length}</span>장)
          </h2>
          <small>삭제하면 홈페이지에서도 바로 사라집니다</small>
        </div>

        <div className="chips" id="gChips">
          {chips.map(([id, label, count]) => (
            <button
              key={id}
              type="button"
              className={`chip${galFilter === id ? ' on' : ''}`}
              onClick={() => setGalFilter(id)}
            >
              {label} {count}
            </button>
          ))}
        </div>

        <div className="grid" id="gGrid">
          {filteredPhotos.length ? (
            filteredPhotos.map((p) => (
              <figure key={p.id} className="ph">
                {p.src ? (
                  <img src={p.src} alt={p.cap} />
                ) : (
                  <div className="ph0">{p.file}</div>
                )}
                {p.isNew && <span className="new">NEW</span>}
                <figcaption>{p.cap}</figcaption>
                <span className="ab">{getAlbumName(p.album)}</span>
                <button
                  type="button"
                  className="del"
                  aria-label={`${p.cap} 삭제`}
                  onClick={() => setConfirmTarget(p)}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                  </svg>
                </button>
              </figure>
            ))
          ) : (
            <p className="empty-album-msg">이 앨범에는 아직 사진이 없습니다.</p>
          )}
        </div>
      </section>

      {confirmTarget && (
        <div
          className="modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setConfirmTarget(null);
            }
          }}
        >
          <div className="mbox" role="dialog" aria-modal="true">
            <h3>사진을 삭제할까요?</h3>
            <p>&quot;{confirmTarget.cap}&quot; 사진을 삭제하면 홈페이지 갤러리에서도 사라집니다.</p>
            <div className="mbtns">
              <button
                ref={cancelBtnRef}
                type="button"
                onClick={() => setConfirmTarget(null)}
              >
                취소
              </button>
              <button
                type="button"
                className="danger"
                onClick={() => {
                  onDeletePhoto(confirmTarget.id);
                  setConfirmTarget(null);
                  onToast('사진을 삭제했습니다.');
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
