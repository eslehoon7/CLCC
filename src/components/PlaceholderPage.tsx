import { HERO, LINKS, PAGES, type PageKey } from '../data/galleryData';

interface PlaceholderPageProps {
  page: Exclude<PageKey, 'gallery'>;
}

export default function PlaceholderPage({ page }: PlaceholderPageProps) {
  const [title, desc] = PAGES[page];

  return (
    <>
      <div className="top">
        <div>
          <h1>{title}</h1>
          <p>{desc}</p>
        </div>
        <div className="pills">
          {page === 'hero' ? (
            <div className="pill">
              등록된 사진: <em>{HERO} / 3장</em>
            </div>
          ) : (
            <div className="pill">
              연결된 링크: <em className={LINKS < 3 ? 'warn' : ''}>{LINKS} / 3개</em>
            </div>
          )}
        </div>
      </div>
      <div className="empty">
        <h2>화면 준비 중입니다</h2>
        <p>다음 단계에서 이 화면을 만듭니다.</p>
      </div>
    </>
  );
}
