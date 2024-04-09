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
    product: [
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 5000,
        shippingFees: 0,
        show: true,
        active: true,
        name: '코쿠',
        quantity: 4,
        buyQuantity: 1,
        mainImages: [
          {
            originalname: 'koku_01.jpg',
            name: 'hYcDzWDIv.jpg',
            path: '/files/hYcDzWDIv.jpg',
          },
          {
            originalname: 'koku_02.jpg',
            name: 'TnUHAnFJSV.jpg',
            path: '/files/TnUHAnFJSV.jpg',
          },
          {
            originalname: 'koku_03.jpg',
            name: 'fm5xjWkjMk.jpg',
            path: '/files/fm5xjWkjMk.jpg',
          },
          {
            originalname: 'koku_04.jpg',
            name: 'kK3YhgZ0y5.jpg',
            path: '/files/kK3YhgZ0y5.jpg',
          },
          {
            originalname: 'koku_05.jpg',
            name: 'uNZZQDPar.jpg',
            path: '/files/uNZZQDPar.jpg',
          },
        ],
        content: '대구 중구 공평로8길 46 2층, 3층',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: ['35.86631723090858', '128.60244477112175'],
        },
      },
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
        mainImages: [
          {
            originalname: 'namju_01.png',
            name: 'RnIPCiOTL.png',
            path: '/files/RnIPCiOTL.png',
          },
          {
            originalname: 'namju_02.png',
            name: 'TRgjOqrQf.png',
            path: '/files/TRgjOqrQf.png',
          },
          {
            originalname: 'namju_03.png',
            name: 'a7H5e0b8x.png',
            path: '/files/a7H5e0b8x.png',
          },
          {
            originalname: 'namju_04.png',
            name: 'rHjYFXd8N.png',
            path: '/files/rHjYFXd8N.png',
          },
        ],
        content: '경기 수원시 권선구 금호로 36 1층',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [37.26868438032256, 126.95598241016837],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 7000,
        shippingFees: 0,
        show: true,
        active: true,
        name: '베러띵스',
        quantity: 5,
        buyQuantity: 2,
        mainImages: [
          {
            originalname: 'betterthings_01.png',
            name: 'neM-AJh6Y.png',
            path: '/files/neM-AJh6Y.png',
          },
          {
            originalname: 'betterthings_02.png',
            name: '_FEq0lZNt.png',
            path: '/files/_FEq0lZNt.png',
          },
          {
            originalname: 'betterthings_03.png',
            name: 'JqEGBKkxG.png',
            path: '/files/JqEGBKkxG.png',
          },
          {
            originalname: 'betterthings_04.png',
            name: 'SyW9OA16uc.png',
            path: '/files/SyW9OA16uc.png',
          },
        ],
        content:
          '경기 수원시 권선구 매실로53번길 10-17 1층, 카페 베러띵스(호매실동, 미덕빌라)',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [37.26868438032256, 126.95598241016837],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 7000,
        shippingFees: 0,
        show: true,
        active: true,
        name: '디벙크',
        quantity: 10,
        buyQuantity: 3,
        mainImages: [
          {
            originalname: 'thebunk_01.jpg',
            name: '3zE8KUYc_.jpg',
            path: '/files/3zE8KUYc_.jpg',
          },
          {
            originalname: 'thebunk_02.jpg',
            name: 'BpDOauWbGC.jpg',
            path: '/files/BpDOauWbGC.jpg',
          },
          {
            originalname: 'thebunk_03.jpg',
            name: 'ytVUyjXTqg.jpg',
            path: '/files/ytVUyjXTqg.jpg',
          },
          {
            originalname: 'thebunk_04.jpg',
            name: '1m6Gv9cJj.jpg',
            path: '/files/1m6Gv9cJj.jpg',
          },
        ],
        content: '대서울 마포구 성지1길 30 더보이드빌딩 지하1층',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [37.5478882002726, 126.91512573194758],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 5000,
        shippingFees: 0,
        show: true,
        active: true,
        name: '스퀘어81',
        quantity: 4,
        buyQuantity: 1,
        mainImages: [
          {
            originalname: 'square81_01.jpg',
            name: 'VBhKZbgtE.jpg',
            path: '/files/VBhKZbgtE.jpg',
          },
          {
            originalname: 'square81_02.jpg',
            name: 'JZE0gNE34s.jpg',
            path: '/files/JZE0gNE34s.jpg',
          },
          {
            originalname: 'square81_03.jpg',
            name: 'in1bjz9XrE.jpg',
            path: '/files/in1bjz9XrE.jpg',
          },
          {
            originalname: 'square81_04.jpg',
            name: 'EN_BpYZLP.jpg',
            path: '/files/EN_BpYZLP.jpg',
          },
        ],
        content: '경기 고양시 일산서구 중앙로 1371 뉴서울프라자 3층',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [37.66674156122624, 126.7662235139006],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 5000,
        shippingFees: 0,
        show: true,
        active: true,
        name: '카페카탈로그',
        quantity: 4,
        buyQuantity: 1,
        mainImages: [
          {
            originalname: 'catalog_01.jpg',
            name: 'n5aUjbPXiA.jpg',
            path: '/files/n5aUjbPXiA.jpg',
          },
          {
            originalname: 'catalog_02.jpg',
            name: 'KIYN7WYBcj.jpg',
            path: '/files/KIYN7WYBcj.jpg',
          },
          {
            originalname: 'catalog_03.jpg',
            name: '7h2HIG-nGl.jpg',
            path: '/files/7h2HIG-nGl.jpg',
          },
          {
            originalname: 'catalog_04.jpg',
            name: 'o3Sqm186iO.jpg',
            path: '/files/o3Sqm186iO.jpg',
          },
        ],
        content: '경기 수원시 팔달구 아주로47번길 13 2층',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [37.27896339637319, 127.04294109725822],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 3900,
        shippingFees: 0,
        show: true,
        active: true,
        name: '이디야 용죽점',
        quantity: 5,
        buyQuantity: 1,
        mainImages: [
          {
            originalname: 'ediya_01.png',
            name: 'VpWp85-nBT.png',
            path: '/files/VpWp85-nBT.png',
          },
          {
            originalname: 'ediya_02.png',
            name: 'zRDhr3FSWb.png',
            path: '/files/zRDhr3FSWb.png',
          },
          {
            originalname: 'ediya_03.png',
            name: 'h85b_LIoxa.png',
            path: '/files/h85b_LIoxa.png',
          },
          {
            originalname: 'ediya_04.png',
            name: 'Ch5aKnApR6.png',
            path: '/files/Ch5aKnApR6.png',
          },
        ],
        content: '평택시 용죽5길 5-9',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: ['36.994147680093334', '127.12684159248758'],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 4500,
        shippingFees: 0,
        show: true,
        active: true,
        name: '무드이너프',
        quantity: 3,
        buyQuantity: 1,
        mainImages: [
          {
            originalname: 'mood-01.png',
            name: 'VcGuMVepD.png',
            path: '/files/VcGuMVepD.png',
          },
          {
            originalname: 'mood-02.png',
            name: 't07Rz5Ldwn.png',
            path: '/files/t07Rz5Ldwn.png',
          },
          {
            originalname: 'mood-03.png',
            name: 'yCtoFsECS7.png',
            path: '/files/yCtoFsECS7.png',
          },
          {
            originalname: 'mood-04.png',
            name: 'Vssj5-n74.png',
            path: '/files/Vssj5-n74.png',
          },
        ],
        content: '평택시 용죽5길 57',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: ['36.99447203025383', '127.12687864054746'],
        },
      },
    ],
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
