import { AdminResource, SiteConfig } from './types';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  brandName: "상상력 점포",
  heroTitle: "당신의 상상이\n현실이 되는 곳",
  heroSubtitle: "우리는 보이지 않는 아이디어를 유형의 가치로 바꿉니다. 상상력을 구매하고, 영감을 소유하세요.",
  primaryColor: "#8B5CF6",
  accentColor: "#F59E0B",
};

export const INITIAL_RESOURCES: AdminResource[] = [
  {
    id: '1',
    title: '새벽의 푸른 꿈',
    category: 'dream',
    description: '고요한 새벽녘, 맑은 정신으로 꾸는 창의적인 꿈의 파편들.',
    date: '2024-03-29',
  },
  {
    id: '2',
    title: '잊혀진 도시의 지도',
    category: 'idea',
    description: '상상 속에서만 존재하는 고대 도시의 정교한 설계도와 역사.',
    date: '2024-03-28',
  },
  {
    id: '3',
    title: '시간을 걷는 소리',
    category: 'sound',
    description: '과거와 미래가 교차하는 순간의 소리를 담은 오디오 에센스.',
    date: '2024-03-27',
  },
  {
    id: '4',
    title: '무지개 끝의 조각',
    category: 'object',
    description: '희망과 약속을 상징하는 무지개의 마지막 색채 조각.',
    date: '2024-03-26',
  },
  {
    id: '5',
    title: '우주를 담은 유리병',
    category: 'object',
    description: '작은 병 안에 갇힌 은하수의 반짝임과 무한한 가능성.',
    date: '2024-03-25',
  },
];
