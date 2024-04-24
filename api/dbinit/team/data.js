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
        price: 7900,
        shippingFees: 0,
        show: true,
        active: true,
        name: '스퀘어81',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'square81_01.jpg',
            path: 'square81_01.jpg',
          },
          {
            name: 'square81_02.jpg',
            path: 'square81_02.jpg',
          },
          {
            name: 'square81_03.jpg',
            path: 'square81_03.jpg',
          },
          {
            name: 'square81_04.jpg',
            path: 'square81_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [37.66674156122624, 126.7662235139006],
          address: '경기 고양시 일산서구 중앙로 1371 뉴서울프라자 3층',
          description:
            '넓은 좌석과 쾌적한 환경에서 집중력 높여 공부하기 좋아요. 카페에 무료 와이파이, 프린터 등 편의시설을 갖추고 있어 편리해요. 24시간 운영으로 언제든지 공부할 수 있어요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 8500,
        shippingFees: 0,
        show: true,
        active: true,
        name: '카페카탈로그',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'catalog_01.jpg',
            path: 'catalog_01.jpg',
          },
          {
            name: 'catalog_02.jpg',
            path: 'catalog_02.jpg',
          },
          {
            name: 'catalog_03.jpg',
            path: 'catalog_03.jpg',
          },
          {
            name: 'catalog_04.jpg',
            path: 'catalog_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [37.27896339637319, 127.04294109725822],
          address: '경기 수원시 팔달구 아주로47번길 13 2층',
          description:
            '도시의 소음을 멀리하고 싶을 때 찾아가기 딱 좋아요. 아늑한 분위기와 신선한 공기가 어우러진 곳에서 한잔의 향긋한 커피를 즐기며 책을 읽거나 생각에 잠길 수 있어요. 그린이 가득한 인테리어는 마음을 차분하게 만들어줄 거예요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 8800,
        shippingFees: 0,
        show: true,
        active: true,
        name: '무드 이너프',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'mood_01.jpg',
            path: 'mood_01.jpg',
          },
          {
            name: 'mood_02.jpg',
            path: 'mood_02.jpg',
          },
          {
            name: 'mood_03.jpg',
            path: 'mood_03.jpg',
          },
          {
            name: 'mood_04.jpg',
            path: 'mood_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [36.99447203025383, 127.12687864054746],
          address: '경기 평택시 용죽5길 57 1층 102호',
          description:
            '책과 커피를 함께 즐길 수 있는 공간으로, 고요한 분위기와 편안한 의자가 준비되어 있어요. 책장에는 다양한 장르의 책들이 가득해 공부하는 동안에도 영감을 받을 수 있어요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 7000,
        shippingFees: 0,
        show: true,
        active: true,
        name: '이디야 용죽점',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'ediya_01.jpg',
            path: 'ediya_01.jpg',
          },
          {
            name: 'ediya_02.jpg',
            path: 'ediya_02.jpg',
          },
          {
            name: 'ediya_03.jpg',
            path: 'ediya_03.jpg',
          },
          {
            name: 'ediya_04.jpg',
            path: 'ediya_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [36.994147680093334, 127.12684159248758],
          address: '경기 평택시 용죽5길 5-9',
          description:
            '조용한 분위기와 창문 너머로 펼쳐지는 풍경이 공부하는 분들에게 평화로움을 선사할 거예요. 또한, 다양한 종류의 차와 커피가 준비되어 있어 공부에 활력을 더할 수 있어요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 8200,
        shippingFees: 0,
        show: true,
        active: true,
        name: '코쿠',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'koku_01.jpg',
            path: 'koku_01.jpg',
          },
          {
            name: 'koku_02.jpg',
            path: 'koku_02.jpg',
          },
          {
            name: 'koku_03.jpg',
            path: 'koku_03.jpg',
          },
          {
            name: 'koku_04.jpg',
            path: 'koku_04.jpg',
          },
          {
            name: 'koku_05.jpg',
            path: 'koku_05.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [35.86631723090858, 128.60244477112175],
          address: '대구광역시 중구 공평로8길 46 2층, 3층',
          description:
            '편안한 분위기와 고급스러운 인테리어가 특징인 곳이에요. 공부하는 동안에도 편안함을 느낄 수 있어요. 달콤한 디저트와 다양한 종류의 라테, 에스프레소가 맛있게 준비되어 있습니다.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 7000,
        shippingFees: 0,
        show: true,
        active: true,
        name: '카페남주',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'namju_01.jpg',
            path: 'namju_01.jpg',
          },
          {
            name: 'namju_02.jpg',
            path: 'namju_02.jpg',
          },
          {
            name: 'namju_03.jpg',
            path: 'namju_03.jpg',
          },
          {
            name: 'namju_04.jpg',
            path: 'namju_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [37.26868438032256, 126.95598241016837],
          address: '경기 수원시 권선구 금호로 36 1층',
          description:
            '커다란 대형 테이블에 콘센트가 각 테이블마다 갖춰져 있어요. 너무 크지 않은 음악 소리와 커피 향기에 집중하기 좋으며, 다양한 디저트도 준비되어 있습니다.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 6700,
        shippingFees: 0,
        show: true,
        active: true,
        name: '베러띵스',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'betterthings_01.jpg',
            path: 'betterthings_01.jpg',
          },
          {
            name: 'betterthings_02.jpg',
            path: 'betterthings_02.jpg',
          },
          {
            name: 'betterthings_03.jpg',
            path: 'betterthings_03.jpg',
          },
          {
            name: 'betterthings_04.jpg',
            path: 'betterthings_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [37.26857423996337, 126.95662510701123],
          address:
            '경기도 수원시 권선구 매실로53번길 10-17 1층, 카페 베러띵스(호매실동, 미덕빌라)',
          description:
            '밝고 환한 분위기가 특징인 곳으로, 공부하기에 좋은 조건을 갖추고 있어요. 차분한 피아노곡이 흘러 집중하기 좋은 환경이에요. 산뜻한 인테리어와 햇살 가득한 창가에서 공부하며 에너지를 얻을 수 있어요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 8000,
        shippingFees: 0,
        show: true,
        active: true,
        name: '디벙크',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'thebunk_01.jpg',
            path: 'thebunk_01.jpg',
          },
          {
            name: 'thebunk_02.jpg',
            path: 'thebunk_02.jpg',
          },
          {
            name: 'thebunk_03.jpg',
            path: 'thebunk_03.jpg',
          },
          {
            name: 'thebunk_04.jpg',
            path: 'thebunk_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [37.5478882002726, 126.91512573194758],
          address: '서울특별시 마포구 성지1길 30 더보이드빌딩 지하1층',
          description:
            '도서관과 같은 조용하고 평온한 분위기를 제공하는 곳이에요. 커피를 마시며 책을 읽거나 공부하면 마음을 진정시키고 집중력을 높여줄 거예요. 조용한 환경과 편안한 시설 덕분에 학생들에게 인기가 많아요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 7800,
        shippingFees: 0,
        show: true,
        active: true,
        name: '스테디커피 경대북문점',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'steady_01.jpg',
            path: 'steady_01.jpg',
          },
          {
            name: 'steady_02.jpg',
            path: 'steady_02.jpg',
          },
          {
            name: 'steady_03.jpg',
            path: 'steady_03.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [35.89333533973914, 128.60988040027888],
          address: '대구 북구 대학로 91 1층',
          description:
            '대학 근처에 위치해 학생들이 공부하기 편리한 카페예요. 조용한 분위기와 고속 와이파이가 제공되고, 역세권 위치로 단골이 많고, 대학생들에게 많을 사랑을 받고 있어요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 9200,
        shippingFees: 0,
        show: true,
        active: true,
        name: '에이바우트커피 스타디움점',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'a_boutstadium_01.jpg',
            path: 'a_boutstadium_01.jpg',
          },
          {
            name: 'a_boutstadium_02.jpg',
            path: 'a_boutstadium_02.jpg',
          },
          {
            name: 'a_boutstadium_03.jpg',
            path: 'a_boutstadium_03.jpg',
          },
          {
            name: 'a_boutstadium_04.jpg',
            path: 'a_boutstadium_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [33.50494556394446, 126.56425645153126],
          address: '제주 제주시 거로남4길 57-15 1층 에이바우트스타디움',
          description:
            '푸른 식물들이 어우러진 인테리어가 눈에 띄는 곳이에요. 조용한 분위기와 함께, 공부하기에 안성맞춤인 편안한 의자와 테이블이 준비되어 있어요. 마음을 가다듬고 집중력을 높일 수 있을 거예요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 5800,
        shippingFees: 0,
        show: true,
        active: true,
        name: '더벤티 여수소호점',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'theventi_01.jpg',
            path: 'theventi_01.jpg',
          },
          {
            name: 'theventi_02.jpg',
            path: 'theventi_02.jpg',
          },
          {
            name: 'theventi_03.jpg',
            path: 'theventi_03.jpg',
          },
          {
            name: 'theventi_04.jpg',
            path: 'theventi_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [34.744759642904874, 127.65229132412806],
          address: '전남 여수시 소호로 469 1층',
          description:
            '새벽 6시부터 공부를 시작하는 이들을 위한 공간이에요. 일찍부터 공부와 커피를 함께 즐길 수 있어요. 조용한 분위기와 잔잔한 피아노곡은 카페의 특유의 감성을 선물해요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 6500,
        shippingFees: 0,
        show: true,
        active: true,
        name: '스몰굿커피 부산대점',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'smallgood_01.jpg',
            path: 'smallgood_01.jpg',
          },
          {
            name: 'smallgood_02.jpg',
            path: 'smallgood_02.jpg',
          },
          {
            name: 'smallgood_03.jpg',
            path: 'smallgood_03.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [35.23008136095, 129.085102681038],
          address: '부산 금정구 금강로 248-6 1층',
          description:
            '일하고, 공부하는 사람들에게 유명한 곳이에요. 다양한 스터디 존과 시설이 마련되어 있어, 효율적으로 공부할 수 있도록 도와줘요. 고급스러운 분위기와 함께, 집중력을 높여줄 맛있는 커피도 준비되어 있어요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 8000,
        shippingFees: 0,
        show: true,
        active: true,
        name: '힌터그룬트 부산대점',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'hinter_01.jpg',
            path: 'hinter_01.jpg',
          },
          {
            name: 'hinter_02.jpg',
            path: 'hinter_02.jpg',
          },
          {
            name: 'hinter_03.jpg',
            path: 'hinter_03.jpg',
          },
          {
            name: 'hinter_04.jpg',
            path: 'hinter_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [35.2307585481568, 129.08803045567203],
          address: '부산 금정구 부산대학로 29 1층',
          description:
            '차 한 잔과 함께 들리는 음악의 조화가 공부하기에 안성맞춤이에요. 부드러운 음악과 함께, 고급스러운 차와 디저트를 즐길 수 있어요. 차분한 분위기 속에서 당신의 공부 시간을 달콤하게 만들어줄 거예요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 7000,
        shippingFees: 0,
        show: true,
        active: true,
        name: '모리사코',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'morisaco_01.jpg',
            path: 'morisaco_01.jpg',
          },
          {
            name: 'morisaco_02.jpg',
            path: 'morisaco_02.jpg',
          },
          {
            name: 'morisaco_03.jpg',
            path: 'morisaco_03.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [35.17138234449267, 126.89985448391478],
          address: '광주광역시 북구 신안동 473-8',
          description:
            '넓고 쾌적한 공간으로 스트레스 없이 집중할 수 있어요. 편안한 의자와 테이블로 장시간 머무르기에도 좋습니다. 조용하고 아늑한 분위기 속에서 공부하실 수 있어요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 6800,
        shippingFees: 0,
        show: true,
        active: true,
        name: '코클맨션',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'coclemansion_01.jpg',
            path: 'coclemansion_01.jpg',
          },
          {
            name: 'coclemansion_02.jpg',
            path: 'coclemansion_02.jpg',
          },
          {
            name: 'coclemansion_03.jpg',
            path: 'coclemansion_03.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [34.84615769439143, 127.34808533582131],
          address: '전남 보성군 벌교읍 벌교상고길 20-1',
          description:
            '책과 바람이 만나는 특별한 공간으로, 창가로부터 들어오는 바람 소리와 함께 책을 읽는 즐거움을 느낄 수 있어요. 여유로운 시간을 보내며 공부하는 동안에도 편안함을 느낄 수 있을 거예요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 6500,
        shippingFees: 0,
        show: true,
        active: true,
        name: '할리스 전주시네마점',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'hollysjun_01.jpg',
            path: 'hollysjun_01.jpg',
          },
          {
            name: 'hollysjun_02.jpg',
            path: 'hollysjun_02.jpg',
          },
          {
            name: 'hollysjun_03.jpg',
            path: 'hollysjun_03.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [35.820163942149186, 127.14140517523542],
          address: '전북 전주시 완산구 전주객사3길 67',
          description:
            '밤늦게까지 영업하여 늦게 공부하기에 최적의 곳이에요 밝은 조명 아래에서 공부할 수 있는 편안한 공간이 마련되어 있어요. 집중력을 높이고 효율적으로 공부할 수 있을 거예요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 5500,
        shippingFees: 0,
        show: true,
        active: true,
        name: '라플라타',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'laflata_01.jpg',
            path: 'laflata_01.jpg',
          },
          {
            name: 'laflata_02.jpg',
            path: 'laflata_02.jpg',
          },
          {
            name: 'laflata_03.jpg',
            path: 'laflata_03.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [35.18573563001879, 127.4653511814445],
          address: '전남 구례군 구례읍 산업로 270 라플라타 카페',
          description:
            '문학적인 감성이 돋보이는 곳이에요. 책과 함께하는 밤의 시간은 상상력을 자극해 창의성을 높여줄 거예요. 다채로운 디저트들은 빵순이들의 취향을 저격해요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 7500,
        shippingFees: 0,
        show: true,
        active: true,
        name: '로아 카페',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'roa_01.jpg',
            path: 'roa_01.jpg',
          },
          {
            name: 'roa_02.jpg',
            path: 'roa_02.jpg',
          },
          {
            name: 'roa_03.jpg',
            path: 'roa_03.jpg',
          },
          {
            name: 'roa_04.jpg',
            path: 'roa_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [36.08048843632554, 129.3992698357665],
          address: '경북 포항시 북구 천마로46번길 22 LOA 카페',
          description:
            '조용한 분위기에서 공부에 몰입할 수 있는 편안한 환경을 제공해요. 넓은 테이블과 편안한 의자로 공부하는 동안 편안한 자세를 유지할 수 있어요. 또한, 다양한 차와 커피 메뉴는 에너지를 공급하여 공부에 집중하는 데 도움을 줘요. 필요한 책이나 자료를 무료로 이용할 수 있어요. 무료 와이파이도 제공돼서 학업에 필요한 모든 것을 갖추고 있어요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 7700,
        shippingFees: 0,
        show: true,
        active: true,
        name: '카페 히어리스트',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'cafe_herelist_01.jpg',
            path: 'cafe_herelist_01.jpg',
          },
          {
            name: 'cafe_herelist_02.jpg',
            path: 'cafe_herelist_02.jpg',
          },
          {
            name: 'cafe_herelist_03.jpg',
            path: 'cafe_herelist_03.jpg',
          },
          {
            name: 'cafe_herelist_04.jpg',
            path: 'cafe_herelist_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [34.57653817575231, 126.59353446295222],
          address: '전남 해남군 해남읍 북부순환로 176',
          description:
            '학업에 집중하는 이들을 위한 아늑한 카페예요. 조용한 분위기와 편안한 시설은 공부하기에 최적화돼 있어요. 다양한 차와 커피 메뉴로 에너지를 보충하고, 무료 와이파이로 인터넷에 연결할 수 있어요. 필요한 책이나 자료를 무료로 이용할 수 있어요. 함께 공부하는 친구들과 함께 시간을 보낼 수 있어요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 8000,
        shippingFees: 0,
        show: true,
        active: true,
        name: '카페 베드로',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'cafe_peter_01.jpg',
            path: 'cafe_peter_01.jpg',
          },
          {
            name: 'cafe_peter_02.jpg',
            path: 'cafe_peter_02.jpg',
          },
          {
            name: 'cafe_peter_03.jpg',
            path: 'cafe_peter_03.jpg',
          },
          {
            name: 'cafe_peter_04.jpg',
            path: 'cafe_peter_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [37.86564771669682, 127.7351062615937],
          address: '강원 춘천시 공지로 268 1층',
          description:
            '친구들과 함께 모여서 공부하기에 최적의 곳이에요. 수다 떨며 공부하기에 딱 좋은 분위기를 제공해요. 편안한 소파와 의자가 마련되어 있어요. 다양한 주제로 수다 떨면서도 공부에 집중할 수 있는 공간이에요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 6500,
        shippingFees: 0,
        show: true,
        active: true,
        name: '지로스터 신부점 ',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'groaster_01.jpg',
            path: 'groaster_01.jpg',
          },
          {
            name: 'groaster_02.jpg',
            path: 'groaster_02.jpg',
          },
          {
            name: 'groaster_03.jpg',
            path: 'groaster_03.jpg',
          },
          {
            name: 'groaster_04.jpg',
            path: 'groaster_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [36.81663053474405, 127.1579462127389],
          address: '충남 천안시 동남구 충절로 26',
          description:
            '너무 크지 않은 음악 소리와 커피향기에 집중하기 좋으며, 다양한 디저트도 준비돼 있습니다.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 7500,
        shippingFees: 0,
        show: true,
        active: true,
        name: '카페리플리',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'reply_01.jpg',
            path: 'reply_01.jpg',
          },
          {
            name: 'reply_02.jpg',
            path: 'reply_02.jpg',
          },
          {
            name: 'reply_03.jpg',
            path: 'reply_03.jpg',
          },
          {
            name: 'reply_04.jpg',
            path: 'reply_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [36.33880592411024, 127.44929798286547],
          address: '대전 동구 백룡로 5번길 61 1층',
          description:
            '차분한 클래식 곡이 흘러 공부에 집중하기 좋아요. 창가에서 공부하며 잠깐 멍 때리면서 힐링할 수도 있어요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 8800,
        shippingFees: 0,
        show: true,
        active: true,
        name: '카페인더문',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'cafemoon_01.jpg',
            path: 'cafemoon_01.jpg',
          },
          {
            name: 'cafemoon_02.jpg',
            path: 'cafemoon_02.jpg',
          },
          {
            name: 'cafemoon_03.jpg',
            path: 'cafemoon_03.jpg',
          },
          {
            name: 'cafemoon_04.jpg',
            path: 'cafemoon_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [36.651802965686095, 127.4892428967031],
          address: '충북 청주시 청원구 대성로 304 1층',
          description:
            '깔끔하고 편안한 분위기에서 공부에 집중할 수 있어요. 커피를 마시며 책을 읽거나 공부하면 마음을 진정시키고 집중력을 높여줄 거예요. 조용한 환경과 편안한 시설 덕분에 학생들에게 인기가 많아요.',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 6400,
        shippingFees: 0,
        show: true,
        active: true,
        name: '카페삼층',
        quantity: 999,
        buyQuantity: 1,
        mainImages: [
          {
            name: 'samcheung_01.jpg',
            path: 'samcheung_01.jpg',
          },
          {
            name: 'samcheung_02.jpg',
            path: 'samcheung_02.jpg',
          },
          {
            name: 'samcheung_03.jpg',
            path: 'samcheung_03.jpg',
          },
          {
            name: 'samcheung_04.jpg',
            path: 'samcheung_04.jpg',
          },
        ],
        content: '1 커피 + 1 디저트',
        createdAt: '2024.04.09 09:50:56',
        updatedAt: '2024.04.09 04:44:29',
        extra: {
          location: [37.45199003948839, 126.65438234124238],
          address: '인천광역시 미추홀구 인하로 53',
          description:
            '아는 사람만 아는 숨은 카공 맛집! 제공하는 무료 와이파이는 속도도 빨라 노트북이나 태블릿으로 온라인 작업하기에도 최적입니다. 커피 맛은 보장드릴 테니 짐 챙겨서 카공하러 가 보실까요?',
        },
      },
    ],

    // 주문
    order: [
      {
        _id: await nextSeq('order'),
        user_id: 3,
        state: 'completed',
        products: [
          {
            _id: 1,
            seller_id: 1,
            price: 7900,
            shippingFees: 0,
            show: true,
            active: true,
            name: '스퀘어81',
            quantity: 999,
            buyQuantity: 1,
            mainImages: [
              {
                name: 'square81_01.jpg',
                path: 'square81_01.jpg',
              },
              {
                name: 'square81_02.jpg',
                path: 'square81_02.jpg',
              },
              {
                name: 'square81_03.jpg',
                path: 'square81_03.jpg',
              },
              {
                name: 'square81_04.jpg',
                path: 'square81_04.jpg',
              },
            ],
            content: '1 커피 + 1 디저트',
            createdAt: '2024.04.09 09:50:56',
            updatedAt: '2024.04.09 04:44:29',
            extra: {
              location: [37.66674156122624, 126.7662235139006],
              address: '경기 고양시 일산서구 중앙로 1371 뉴서울프라자 3층',
              description:
                '넓은 좌석과 쾌적한 환경에서 집중력 높여 공부하기 좋아요. 카페에 무료 와이파이, 프린터 등 편의시설을 갖추고 있어 편리해요. 24시간 운영으로 언제든지 공부할 수 있어요.',
            },
          },
        ],
        cost: {
          products: 7900,
          shippingFees: 0,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 7900,
        },
        address: {
          name: '회사',
          value: '서울시 강남구 신사동 234',
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 3,
        state: 'completed',
        products: [
          {
            _id: 2,
            seller_id: 1,
            price: 8500,
            shippingFees: 0,
            show: true,
            active: true,
            name: '카페카탈로그',
            quantity: 999,
            buyQuantity: 1,
            mainImages: [
              {
                name: 'catalog_01.jpg',
                path: 'catalog_01.jpg',
              },
              {
                name: 'catalog_02.jpg',
                path: 'catalog_02.jpg',
              },
              {
                name: 'catalog_03.jpg',
                path: 'catalog_03.jpg',
              },
              {
                name: 'catalog_04.jpg',
                path: 'catalog_04.jpg',
              },
            ],
            content: '1 커피 + 1 디저트',
            createdAt: '2024.04.09 09:50:56',
            updatedAt: '2024.04.09 04:44:29',
            extra: {
              location: [37.27896339637319, 127.04294109725822],
              address: '경기 수원시 팔달구 아주로47번길 13 2층',
              description:
                '도시의 소음을 멀리하고 싶을 때 찾아가기 딱 좋아요. 아늑한 분위기와 신선한 공기가 어우러진 곳에서 한잔의 향긋한 커피를 즐기며 책을 읽거나 생각에 잠길 수 있어요. 그린이 가득한 인테리어는 마음을 차분하게 만들어줄 거예요.',
            },
          },
        ],
        cost: {
          products: 8500,
          shippingFees: 0,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 8500,
        },
        address: {
          name: '회사',
          value: '서울시 강남구 신사동 234',
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 3,
        state: 'love',
        products: [
          {
            _id: 3,
            seller_id: 1,
            price: 8800,
            shippingFees: 0,
            show: true,
            active: true,
            name: '무드 이너프',
            quantity: 999,
            buyQuantity: 1,
            mainImages: [
              {
                name: 'mood_01.jpg',
                path: 'mood_01.jpg',
              },
              {
                name: 'mood_02.jpg',
                path: 'mood_02.jpg',
              },
              {
                name: 'mood_03.jpg',
                path: 'mood_03.jpg',
              },
              {
                name: 'mood_04.jpg',
                path: 'mood_04.jpg',
              },
            ],
            content: '1 커피 + 1 디저트',
            createdAt: '2024.04.09 09:50:56',
            updatedAt: '2024.04.09 04:44:29',
            extra: {
              location: [36.99447203025383, 127.12687864054746],
              address: '경기 평택시 용죽5길 57 1층 102호',
              description:
                '책과 커피를 함께 즐길 수 있는 공간으로, 고요한 분위기와 편안한 의자가 준비되어 있어요. 책장에는 다양한 장르의 책들이 가득해 공부하는 동안에도 영감을 받을 수 있어요.',
            },
          },
        ],
        cost: {
          products: 8800,
          shippingFees: 0,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 8800,
        },
        address: {
          name: '회사',
          value: '서울시 강남구 신사동 234',
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 3,
        state: 'completed',
        products: [
          {
            _id: 24,
            seller_id: 1,
            price: 6400,
            shippingFees: 0,
            show: true,
            active: true,
            name: '카페삼층',
            quantity: 999,
            buyQuantity: 1,
            mainImages: [
              {
                name: 'samcheung_01.jpg',
                path: 'samcheung_01.jpg',
              },
              {
                name: 'samcheung_02.jpg',
                path: 'samcheung_02.jpg',
              },
              {
                name: 'samcheung_03.jpg',
                path: 'samcheung_03.jpg',
              },
              {
                name: 'samcheung_04.jpg',
                path: 'samcheung_04.jpg',
              },
            ],
            content: '1 커피 + 1 디저트',
            createdAt: '2024.04.09 09:50:56',
            updatedAt: '2024.04.09 04:44:29',
            extra: {
              location: [37.45199003948839, 126.65438234124238],
              address: '인천광역시 미추홀구 인하로 53',
              description:
                '아는 사람만 아는 숨은 카공 맛집! 제공하는 무료 와이파이는 속도도 빨라 노트북이나 태블릿으로 온라인 작업하기에도 최적입니다. 커피 맛은 보장드릴 테니 짐 챙겨서 카공하러 가 보실까요?',
            },
          },
        ],
        cost: {
          products: 8800,
          shippingFees: 0,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 8800,
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
      // {
      //   _id: await nextSeq('reply'),
      //   user_id: 3,
      //   order_id: 1,
      //   product_id: 1,
      //   rating: 5,
      //   content: '공부하기 좋네요. 잔잔한 음악 소리가 제 스타일이에요.',
      //   createdAt: getTime(-4, -60 * 60 * 12),
      // },
      // {
      //   _id: await nextSeq('reply'),
      //   user_id: 3,
      //   order_id: 2,
      //   product_id: 2,
      //   rating: 5,
      //   content: '너무 편안해요... 이 감성!! 성적 오를 거 같아요',
      //   createdAt: getTime(-4, -60 * 60 * 12),
      // },
      // {
      //   _id: await nextSeq('reply'),
      //   user_id: 3,
      //   order_id: 3,
      //   product_id: 3,
      //   rating: 5,
      //   content: '카공 맛집이에요. 특히 케이크 맛도리 그자체',
      //   createdAt: getTime(-4, -60 * 60 * 12),
      // },
      // {
      //   _id: await nextSeq('reply'),
      //   user_id: 3,
      //   order_id: 4,
      //   product_id: 4,
      //   rating: 5,
      //   content: '대학교 근처에 있어서 매일 이곳으로 출근합니다. 또 올거예요!!',
      //   createdAt: getTime(-4, -60 * 60 * 12),
      // },
      // {
      //   _id: await nextSeq('reply'),
      //   user_id: 1,
      //   order_id: 5,
      //   product_id: 5,
      //   rating: 5,
      //   content: '외근 나와서 들렀는데 식사하고 갔어요.',
      //   createdAt: getTime(-4, -60 * 60 * 12),
      // },
    ],
    // 장바구니
    cart: [],
    // 즐겨찾기/북마크
    bookmark: [
      {
        type: 'product',
        user_id: 3,
        target_id: 1,
        memo: '시험기간에 가기 좋을듯',
        _id: await nextSeq('bookmark'),
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        type: 'product',
        user_id: 3,
        target_id: 2,
        memo: '시험기간에 가기 좋을듯',
        _id: await nextSeq('bookmark'),
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        type: 'product',
        user_id: 3,
        target_id: 3,
        memo: '시험기간에 가기 좋을듯',
        _id: await nextSeq('bookmark'),
        createdAt: getTime(-3, -60 * 60 * 2),
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
