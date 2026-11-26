export type PageKey = 'hero' | 'gallery' | 'links';

export interface AlbumInfo {
  id: string;
  name: string;
  initialCount: number;
}

export interface PhotoItem {
  id: string;
  album: string;
  cap: string;
  file: string;
  src: string;
  isNew?: boolean;
}

/* 임시 로그인 정보: 실제 배포 전 Firebase 로그인으로 바꿀 것 */
export const AUTH = {
  id: 'ocean75',
  pw: 'dmaris03644!',
};

export const HERO = 1;
export const LINKS = 0;
export const MAX_PICKS = 10;

export const ALBUMS: AlbumInfo[] = [
  { id: 'wave', name: '웨이브홀', initialCount: 6 },
  { id: 'cl-lobby', name: 'CL컨벤션 로비', initialCount: 6 },
  { id: 'cl-photozone', name: 'CL컨벤션 포토존', initialCount: 4 },
  { id: 'cl-phototable', name: 'CL컨벤션 포토테이블', initialCount: 5 },
  { id: 'wave-bridal', name: '웨이브홀 신부대기실', initialCount: 2 },
  { id: 'covenant', name: '커버넌트홀', initialCount: 6 },
  { id: 'covenant-bridal', name: '커버넌트홀 신부대기실', initialCount: 2 },
  { id: 'covenant-phototable', name: '커버넌트홀 포토테이블', initialCount: 6 },
  { id: 'bliss', name: '블리스홀', initialCount: 4 },
  { id: 'consult-room', name: 'CL컨벤션 예약실', initialCount: 2 },
  { id: 'banquet', name: '가든홀 · 그레이스홀', initialCount: 9 },
  { id: 'facilities', name: '건물 · 로비 · 하객 편의 공간', initialCount: 9 },
  { id: 'dining', name: '웨딩 다이닝', initialCount: 13 },
];

export const PAGES: Record<PageKey, [string, string]> = {
  hero: ['메인사진 관리', '홈페이지 첫 화면 사진을 최대 3장까지 올리고 순서를 정합니다.'],
  gallery: ['갤러리 업로드', '앨범을 고르고 사진을 한 번에 최대 10장까지 올립니다. 설명, 순서, 삭제도 이곳에서 관리합니다.'],
  links: ['배너 링크 관리', '홈페이지 버튼에 연결되는 네이버블로그, 인스타그램, 카카오톡 주소를 바꿉니다.'],
};

const RAW_PHOTOS: [string, string, string][] = [
  ['wave', '웨이브홀 · 1', 'photos-20260917/wave-01.webp'],
  ['wave', '웨이브홀 · 2', 'photos-20260917/wave-02.webp'],
  ['wave', '웨이브홀 · 3', 'photos-20260917/wave-03.webp'],
  ['wave', '웨이브홀 · 4', 'photos-20260917/wave-04.webp'],
  ['wave', '웨이브홀 · 5', 'photos-20260917/wave-05.webp'],
  ['wave', '웨이브홀 · 6', 'photos-20260917/wave-06.webp'],
  ['cl-lobby', 'CL컨벤션 로비 · 1', 'photos-20260917/cl-lobby-01.webp'],
  ['cl-lobby', 'CL컨벤션 로비 · 2', 'photos-20260917/cl-lobby-02.webp'],
  ['cl-lobby', 'CL컨벤션 로비 · 3', 'photos-20260917/cl-lobby-03.webp'],
  ['cl-lobby', 'CL컨벤션 로비 · 4', 'photos-20260917/cl-lobby-04.webp'],
  ['cl-lobby', 'CL컨벤션 로비 · 5', 'photos-20260917/cl-lobby-05.webp'],
  ['cl-lobby', 'CL컨벤션 로비 · 6', 'photos-20260917/cl-lobby-06.webp'],
  ['cl-photozone', 'CL컨벤션 포토존 · 7', 'photos-20260917/cl-photozone-07.webp'],
  ['cl-photozone', 'CL컨벤션 포토존 · 8', 'photos-20260917/cl-photozone-08.webp'],
  ['cl-photozone', 'CL컨벤션 포토존 · 9', 'photos-20260917/cl-photozone-09.webp'],
  ['cl-photozone', 'CL컨벤션 포토존 · 10', 'photos-20260917/cl-photozone-10.webp'],
  ['cl-phototable', 'CL컨벤션 포토테이블 · 1', 'photos-20260917/cl-phototable-01.webp'],
  ['cl-phototable', 'CL컨벤션 포토테이블 · 2', 'photos-20260917/cl-phototable-02.webp'],
  ['cl-phototable', 'CL컨벤션 포토테이블 · 3', 'photos-20260917/cl-phototable-03.webp'],
  ['cl-phototable', 'CL컨벤션 포토테이블 · 4', 'photos-20260917/cl-phototable-04.webp'],
  ['cl-phototable', 'CL컨벤션 포토테이블 · 5', 'photos-20260917/cl-phototable-05.webp'],
  ['wave-bridal', '웨이브홀 신부대기실 · 1', 'photos-20260917/wave-bridal-01.webp'],
  ['wave-bridal', '웨이브홀 신부대기실 · 2', 'photos-20260917/wave-bridal-02.webp'],
  ['covenant', '커버넌트홀 · 1', 'photos-20260917/covenant-01.webp'],
  ['covenant', '커버넌트홀 · 2', 'photos-20260917/covenant-02.webp'],
  ['covenant', '커버넌트홀 · 3', 'photos-20260917/covenant-03.webp'],
  ['covenant', '커버넌트홀 · 4', 'photos-20260917/covenant-04.webp'],
  ['covenant', '커버넌트홀 · 5', 'photos-20260917/covenant-05.webp'],
  ['covenant', '커버넌트홀 · 6', 'photos-20260917/covenant-06.webp'],
  ['covenant-bridal', '커버넌트홀 신부대기실 · 1', 'photos-20260917/covenant-bridal-01.webp'],
  ['covenant-bridal', '커버넌트홀 신부대기실 · 2', 'photos-20260917/covenant-bridal-02.webp'],
  ['covenant-phototable', '커버넌트홀 포토테이블 · 1', 'photos-20260917/covenant-phototable-01.webp'],
  ['covenant-phototable', '커버넌트홀 포토테이블 · 2', 'photos-20260917/covenant-phototable-02.webp'],
  ['covenant-phototable', '커버넌트홀 포토테이블 · 3', 'photos-20260917/covenant-phototable-03.webp'],
  ['covenant-phototable', '커버넌트홀 포토테이블 · 4', 'photos-20260917/covenant-phototable-04.webp'],
  ['covenant-phototable', '커버넌트홀 포토테이블 · 5', 'photos-20260917/covenant-phototable-05.webp'],
  ['covenant-phototable', '커버넌트홀 포토테이블 · 6', 'photos-20260917/covenant-phototable-06.webp'],
  ['bliss', '블리스홀 · 1', 'photos-20260917/bliss-01.webp'],
  ['bliss', '블리스홀 · 2', 'photos-20260917/bliss-02.webp'],
  ['bliss', '블리스홀 · 3', 'photos-20260917/bliss-03.webp'],
  ['bliss', '블리스홀 · 4', 'photos-20260917/bliss-04.webp'],
  ['consult-room', 'CL컨벤션 예약실 · 1', 'photos-20260917/consult-room-01.webp'],
  ['consult-room', 'CL컨벤션 예약실 · 2', 'photos-20260917/consult-room-02.webp'],
  ['banquet', 'Garden Hall · 연회 공간', 'selected/selected-002.webp'],
  ['banquet', 'Garden Hall · 연회 공간', 'selected/selected-004.webp'],
  ['banquet', 'Garden Hall · 연회 공간', 'selected/selected-005.webp'],
  ['banquet', 'Garden Hall · 연회 공간', 'selected/selected-006.webp'],
  ['banquet', 'Garden Hall · 연회 공간', 'selected/selected-007.webp'],
  ['banquet', 'Grace Hall · 연회 공간', 'selected/selected-008.webp'],
  ['banquet', 'Grace Hall · 연회 공간', 'selected/selected-009.webp'],
  ['banquet', 'Grace Hall · 연회 공간', 'selected/selected-010.webp'],
  ['banquet', 'Grace Hall · 연회 공간', 'selected/selected-011.webp'],
  ['facilities', '건물 외관', 'selected/selected-001.webp'],
  ['facilities', '건물 외관', 'selected/selected-003.webp'],
  ['facilities', 'Bridge 36 · 하객 휴게 공간', 'selected/selected-012.webp'],
  ['facilities', 'Bridge 36 · 하객 휴게 공간', 'selected/selected-013.webp'],
  ['facilities', 'Bridge 36 · 로비', 'selected/selected-014.webp'],
  ['facilities', 'Bridge 36 · 하객 휴게 공간', 'selected/selected-015.webp'],
  ['facilities', 'Bridge 36 · 하객 휴게 공간', 'selected/selected-016.webp'],
  ['facilities', 'Bridge 36 · 포토 공간', 'selected/selected-017.webp'],
  ['facilities', '건물 외관', 'selected/selected-018.webp'],
  ['dining', 'Wedding Dining · 메뉴', 'selected/selected-045.webp'],
  ['dining', 'Wedding Dining · 메뉴', 'selected/selected-046.webp'],
  ['dining', 'Wedding Dining · 메뉴', 'selected/selected-047.webp'],
  ['dining', 'Wedding Dining · 메뉴', 'selected/selected-048.webp'],
  ['dining', 'Wedding Dining · 메뉴', 'selected/selected-049.webp'],
  ['dining', 'Wedding Dining · 메뉴', 'selected/selected-050.webp'],
  ['dining', 'Wedding Dining · 메뉴', 'selected/selected-051.webp'],
  ['dining', 'Wedding Dining · 메뉴', 'selected/selected-052.webp'],
  ['dining', 'Wedding Dining · 메뉴', 'selected/selected-053.webp'],
  ['dining', 'Wedding Dining · 메뉴', 'selected/selected-054.webp'],
  ['dining', 'Wedding Dining · 메뉴', 'selected/selected-055.webp'],
  ['dining', 'Wedding Dining · 메뉴', 'selected/selected-056.webp'],
  ['dining', 'Wedding Dining · 메뉴', 'selected/selected-057.webp'],
];

export const INITIAL_PHOTOS: PhotoItem[] = RAW_PHOTOS.map((p, i) => ({
  id: 'o' + i,
  album: p[0],
  cap: p[1],
  file: p[2],
  src: '',
}));

export function getAlbumName(id: string): string {
  return ALBUMS.find((a) => a.id === id)?.name ?? id;
}
