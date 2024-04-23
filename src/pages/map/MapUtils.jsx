import axios from 'axios';

function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

//카카오 로컬 API

//첫번 째는 받아오는 주소, 두,세 번째는 현재 위치 (좌표)
async function getDistanceBetweenTwoAddresses(addr, curLon, curLat) {
  try {
    //입력한 첫 주소를 WTM 좌표로 변환
    const response1 = await axios.get(
      'https://dapi.kakao.com/v2/local/search/address.json',
      {
        params: { query: addr },
        headers: {
          Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
        },
      },
    );

    const { x: x1, y: y1 } = response1.data.documents[0];

    const requestInterval = 1000;

    let wtmResponse1;
    try {
      await new Promise(resolve => setTimeout(resolve, requestInterval)); // 요청 간격 지연
      wtmResponse1 = await axios.get(
        'https://dapi.kakao.com/v2/local/geo/transcoord.json',
        {
          params: { x: x1, y: y1, output_coord: 'WTM' },
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
          },
        },
      );
    } catch (error) {
      console.error('주소를 가져오지 못 했습니다.', error);
      return null;
    }

    const { x: wtmX1, y: wtmY1 } = wtmResponse1.data.documents[0];
    // console.log(wtmResponse1.data.documents[0]);

    let wtmResponse2;
    try {
      await new Promise(resolve => setTimeout(resolve, requestInterval)); // 요청 간격 지연
      wtmResponse2 = await axios.get(
        'https://dapi.kakao.com/v2/local/geo/transcoord.json',
        {
          params: {
            x: curLon ? curLon : 127.76185524802845,
            y: curLat ? curLat : 36.349396783484984,
            input_coord: 'WGS84',
            output_coord: 'WTM',
          },
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
          },
        },
      );
    } catch (error) {
      console.error('주소를 가져오지 못 했습니다.', error);
      return null;
    }
    const { x: wtmX2, y: wtmY2 } = wtmResponse2.data.documents[0];
    // console.log(wtmResponse2.data.documents[0]);

    //최단거리 계산 후 distance에 담음
    const distance = calculateDistance(wtmX1, wtmY1, wtmX2, wtmY2);
    //미터 단위를 1km부터 킬로미터 단위로 변환
    const formattedDistance = (distance / 1000).toFixed(2);
    return formattedDistance;
  } catch (error) {
    console.error('주소를 가져오지 못 했습니다.', error);
    return null;
  }
}

export { getDistanceBetweenTwoAddresses };
