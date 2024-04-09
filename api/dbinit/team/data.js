import moment from 'moment';

function getDay(day = 0) {
  return moment().add(day, 'days').format('YYYY.MM.DD');
}
function getTime(day = 0, second = 0) {
  return moment()
    .add(day, 'days')
    .add(second, 'seconds')
    .format('YYYY.MM.DD HH:mm:ss');
}

export const initData = async nextSeq => {
  return {
    // 회원
    user: [
      {
        _id: await nextSeq('user'),
        email: 'admin@market.com',
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '무지',
        phone: '01011112222',
        address: '서울시 강남구 역삼동 123',
        type: 'admin',
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('user'),
        email: 'cagong@market.com',
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '카공',
        phone: '01022223333',
        address: '서울시 강남구 삼성동 456',
        type: 'seller',
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('user'),
        email: 'u1@market.com',
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '데이지',
        phone: '01044445555',
        address: '서울시 강남구 논현동 222',
        type: 'user',
        createdAt: getTime(-20, -60 * 30),
        updatedAt: getTime(-10, -60 * 60 * 12),
      },
    ],
    // 상품
    product: [],
    // 주문
    order: [
      {
        _id: await nextSeq('order'),
        user_id: 4,
        state: 'OS020',
        products: [
          {
            _id: await nextSeq('product'),
            seller_id: 1,
            price: 4800,
            shippingFees: 0,
            show: true,
            active: true,
            name: '카페남주',
            quantity: 4,
            buyQuantity: 1,
            mainImages: [],
            content: '경기 수원시 권선구 금호로 36 1층',
            createdAt: '2024.04.09 09:50:56',
            updatedAt: '2024.04.09 04:44:29',
            extra: {
              location: [37.26868438032256, 126.95598241016837],
            },
          },
        ],
        cost: {
          products: 4800,
          shippingFees: 0,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 4800,
        },
        address: {
          name: '회사',
          value: '서울시 강남구 신사동 234',
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
    ],
    // 후기
    reply: [
      {
        _id: await nextSeq('reply'),
        user_id: 1,
        order_id: 1,
        product_id: 1,
        rating: 5,
        content: '공부하기 좋아요.',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
    ],
    // 장바구니
    cart: [],
    // 즐겨찾기/북마크
    bookmark: [
      {
        _id: await nextSeq('bookmark'),
        user_id: 1,
        product_id: 1,
        memo: '첫째 크리스마스 선물.',
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('bookmark'),
        user_id: 1,
        product_id: 1,
        memo: '둘째 입학 선물',
        createdAt: getTime(-2, -60 * 60 * 20),
      },
    ],
    // QnA, 공지사항, 게시판
    post: [],
    // 코드
    code: [],
    // 설정
    config: [],
  };
};
