import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useRef, useState } from 'react';
const { kakao } = window;

function Map() {
  const mapRef = useRef(null);
  const infowindowRef = useRef(null);
  const [data, setData] = useState([]);

  const axios = useCustomAxios();
  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(36.994147680093334, 127.12684159248758), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(container, options);
    mapRef.current = map;

    axios.get(`${import.meta.env.VITE_API_SERVER}/products`).then(res => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  const [cafe, setCafe] = useState([]);
  useEffect(() => {
    let positions = [
      {
        content: `<div style="padding:5px;">
      <h1>이디야 용죽점</h1>
      <img style="width:100px;"
        src="https://market-lion.koyeb.app/api/files/05-cagong/J7rcO2nrn.png"
        alt="이디야 용죽점 사진"
      />
      <p>카페 소개글</P>
      </div>`,
        lating: new kakao.maps.LatLng(36.994147680093334, 127.12684159248758),
      }, //이디야 용죽점
      {
        content: `<div style="padding:5px;">
        <h1>카페카탈로그</h1>
        <img style="width:100px;" src="https://market-lion.koyeb.app/api/files/05-cagong/TKLCUN09e.jpg" alt="카페카탈로그 사진"/>
        <p>카페 소개글</P>
        </div>`,
        lating: new kakao.maps.LatLng(37.27896339637319, 127.04294109725822),
      }, //카페카탈로그
      {
        content: `<div style="padding:5px;">
          <h1>better things</h1>
          <img style="width:100px;" src="https://market-lion.koyeb.app/api/files/05-cagong/KhIAHFN_F.png" alt="better things 사진"/>
          <p>카페 소개글</P>
          </div>`,
        lating: new kakao.maps.LatLng(37.26868438032256, 126.95598241016837),
      }, //better things
      {
        content: `<div style="padding:5px;">
          <h1>디벙크</h1>
          <img style="width:100px;" src="https://market-lion.koyeb.app/api/files/05-cagong/m64h3uSyx.jpg" alt="디벙크 사진"/>
          <p>카페 소개글</P>
          </div>`,
        lating: new kakao.maps.LatLng(37.5478882002726, 126.91512573194758),
      }, //디벙크
      {
        content: `<div style="padding:5px;">
          <h1>스퀘어81</h1>
          <img style="width:100px;" src="https://market-lion.koyeb.app/api/files/05-cagong/TItObHGPOw.jpg" alt="스퀘어81 사진"/>
          <p>카페 소개글</P>
          </div>`,
        lating: new kakao.maps.LatLng(37.66674156122624, 126.7662235139006),
      }, //스퀘어81
      {
        content: `<div style="padding:5px;">
          <h1>무드이너프</h1>
          <img style="width:100px;" src="https://market-lion.koyeb.app/api/files/05-cagong/uZohUyg30.png" alt="무드이너프 사진"/>
          <p>카페 소개글</P>
          </div>`,
        lating: new kakao.maps.LatLng(36.99447203025383, 127.12687864054746),
      }, //무드이너프
      {
        content: `<div style="padding:5px;">
          <h1>카페남주</h1>
          <img style="width:100px;" src="https://market-lion.koyeb.app/api/files/05-cagong/Mx7Dguvpj.png" alt="카페남주 사진"/>
          <p>카페 소개글</P>
          </div>`,
        lating: new kakao.maps.LatLng(37.26868438032256, 126.95598241016837),
      }, //카페남주
      {
        content: `<div style="padding:5px;">
          <h1>코쿠</h1>
          <img style="width:100px;" src="https://market-lion.koyeb.app/api/files/05-cagong/hilYRCwCe.jpg" alt="코쿠 사진"/>
          <p>카페 소개글</P>
          </div>`,
        lating: new kakao.maps.LatLng(35.86631723090858, 128.60244477112175),
      }, //코쿠
    ];
    setCafe(positions);
    let copyCafe = [...cafe];
    // 데이터를 바꿔주는 for문
    for (let i = 0; i < copyCafe.length; i++) {
      console.log(copyCafe[i]);
      copyCafe[i].content = `<div style="padding:5px;">
      <h1>${data.item[i].name} </h1>
      <img style="width:100px;" src=${import.meta.env.VITE_API_SERVER}/files/${
        import.meta.env.VITE_CLIENT_ID
      }/${data?.item[i]?.mainImages[0].name} alt="${data.item[i].name} 사진"
      />
      <p>카페 소개글</P>
      </div>`;
    }
    //아직 구현 못 함
    // setCafe(copyCafe);
    // console.log(cafe);
  }, [data]);

  const markerImageSrc = `${import.meta.env.VITE_API_SERVER}/files/${
    import.meta.env.VITE_CLIENT_ID
  }/M766aDPww.png`;
  const coffeeMarkers = [];
  createCoffeeMarkers();

  // 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수입니다
  function createMarkerImage(src, size, options) {
    const markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;
  }

  // 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
  function createMarker(position, image) {
    const marker = new kakao.maps.Marker({
      position: position,
      image: image,
    });

    return marker;
  }
  let infowindowArray = []; //마커 클릭시 인포윈도우 온 오프 기능을 위한 배열
  // 커피숍 마커를 생성하고 커피숍 마커 배열에 추가하는 함수입니다
  function createCoffeeMarkers() {
    for (let i = 0; i < cafe.length; i++) {
      const imageSize = new kakao.maps.Size(22, 26),
        imageOptions = {
          spriteOrigin: new kakao.maps.Point(0, 0),
          spriteSize: new kakao.maps.Size(20, 20),
        };

      // 마커이미지와 마커를 생성합니다
      const markerImage = createMarkerImage(
          markerImageSrc,
          imageSize,
          imageOptions,
        ),
        marker = createMarker(cafe[i].lating, markerImage);
      // 인포윈도우를 생성합니다
      let infowindow = new kakao.maps.InfoWindow({
        content: cafe[i].content,
        removable: true,
      });
      infowindowRef.current = infowindow;

      // 생성된 마커를 커피숍 마커 배열에 추가합니다
      coffeeMarkers.push(marker);
      // 마커에 마우스클릭 이벤트를 등록합니다
      kakao.maps.event.addListener(
        marker,
        'click',
        makeClickListener(mapRef.current, marker, infowindow),
      );
    }
  }

  function makeClickListener(map, marker, infowindow) {
    return function () {
      //마커 클릭시 인포윈도우 열고 닫기

      if (infowindowArray.length !== 0) {
        infowindow.close(map, marker);
        infowindowArray = [];
      } else {
        infowindow.open(map, marker);
        infowindowArray.push(infowindow);
      }
      // console.log(infowindowArray);
    };
  }

  // 커피숍 마커들의 지도 표시 여부를 설정하는 함수입니다
  function setCoffeeMarkers(map) {
    for (let i = 0; i < coffeeMarkers.length; i++) {
      coffeeMarkers[i].setMap(map);
    }
  }

  setCoffeeMarkers(mapRef.current);

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
  //카페 리스트 받아오기
  const cafeList = data?.item?.map(item => (
    <li key={item._id}>
      {item.name}
      <img
        src={
          import.meta.env.VITE_API_SERVER +
          '/files/05-cagong/' +
          item.mainImages[0].name
        }
        alt="카페사진"
      />
    </li>
  ));
  return (
    <>
      <div>
        <div id="map" style={{ width: '355px', height: '355px' }} />
        <button onClick={handleCurrentLocation}>현재 위치</button>
      </div>
      <h1>카페 리스트</h1>
      <ul>{cafeList}</ul>
    </>
  );
}

export default Map;
