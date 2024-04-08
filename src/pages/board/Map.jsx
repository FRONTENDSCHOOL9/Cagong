import { useEffect, useRef } from 'react';
const { kakao } = window;

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(container, options);
    mapRef.current = map;
  }, []);

  function handleCurrentLocation() {
    // HTML5의 geolocation으로 사용할 수 있는지 확인
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻음
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        const locPosition = new kakao.maps.LatLng(lat, lon); // geolocation으로 얻어온 좌표
        mapRef.current.panTo(locPosition); // geolocation으로 얻어온 좌표로 이동
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 처리
      alert('현재 위치를 찾을 수 없습니다.');
    }
  }

  return (
    <div>
      <div id="map" style={{ width: '355px', height: '355px' }} />
      <button onClick={handleCurrentLocation}>현재 위치</button>
    </div>
  );
}

export default Map;
