import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useRef, useState } from 'react';
const { kakao } = window;
import { useQuery } from '@tanstack/react-query';

function Map() {
  const mapRef = useRef(null);
  const infowindowRef = useRef(null);
  const axios = useCustomAxios();

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get(`/products`),
    select: response => response.data,
    suspense: true,
  });

  const [filteredCafeList, setFilteredCafeList] = useState([]);

  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(36.349396783484984, 127.76185524802845), // 지도의 중심좌표
      level: 15, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(container, options);
    mapRef.current = map;

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
      for (let i = 0; i < positions.length; i++) {
        const imageSize = new kakao.maps.Size(22, 26),
          imageOptions = {
            spriteOrigin: new kakao.maps.Point(0, 0),
            spriteSize: new kakao.maps.Size(24, 24),
          };

        // 마커이미지와 마커를 생성합니다
        const markerImage = createMarkerImage(
            markerImageSrc,
            imageSize,
            imageOptions,
          ),
          marker = createMarker(positions[i].lating, markerImage);
        // 인포윈도우를 생성합니다
        let infowindow = new kakao.maps.InfoWindow({
          content: positions[i].content,
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

    kakao.maps.event.addListener(map, 'bounds_changed', () => {
      // // 지도 영역정보를 얻어옵니다
      let bounds = map.getBounds();
      // // 영역정보의 남서쪽 정보를 얻어옵니다
      let swLatlng = bounds.getSouthWest();
      // // 영역정보의 북동쪽 정보를 얻어옵니다
      let neLatlng = bounds.getNorthEast();
      let mapBounds = new kakao.maps.LatLngBounds(swLatlng, neLatlng); // 인자를 주지 않으면 빈 영역을 생성한다.
      // // 지도 영역정보를 얻어옵니다
      const filteredPositions = data?.item?.filter(item => {
        const lating = new kakao.maps.LatLng(
          item.extra.location[0],
          item.extra.location[1],
        );
        return mapBounds.contain(lating);
      });
      // console.log(mapBounds);

      //필터링 된 카페리스트들을 map함수로 state에 담기
      setFilteredCafeList(
        filteredPositions.map(item => ({
          content: `
        <div style="width:200px; height:100px;, position:absolute; top:0px; padding:10px" class="wrapper">
          <div>
            <a href="/boards/cafeDetail/${item._id}">
              <h1 style="font-size:1px;">${item.name} </h1>
            </a>
            <img style="width:50px;" src=${
              import.meta.env.VITE_API_SERVER
            }/files/${import.meta.env.VITE_CLIENT_ID}/${
            item.mainImages[0].name
          } alt="${item.name} 사진"
        />
            <p style="font-size:12px">${item.extra.address}</P>
          </div>
        </div>
        `,
          extra: item.extra,
          _id: item._id,
          mainImages: item.mainImages,
          name: item.name,
        })),
      );
    });

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
        console.log(infowindowArray);
      };
    }

    // 커피숍 마커들의 지도 표시 여부를 설정하는 함수입니다
    function setCoffeeMarkers(map) {
      for (let i = 0; i < coffeeMarkers.length; i++) {
        coffeeMarkers[i].setMap(map);
      }
    }

    setCoffeeMarkers(mapRef.current);
  }, [data]);
  // console.log(data);
  // console.log(filteredCafeList);
  // data를 받아 지도 핀에 뿌려 줄 정보를 담은 positions 배열을 만든다.
  const positions = data?.item?.map(item => ({
    content: `
  <div style="width:200px; height:100px;, position:absolute; top:0px; padding:10px" class="wrapper">
    <div>
      <a href="/boards/cafeDetail/${item._id}">
        <h1 style="font-size:1px;">${item.name} </h1>
      </a>
      <img style="width:50px;" src=${import.meta.env.VITE_API_SERVER}/files/${
      import.meta.env.VITE_CLIENT_ID
    }/${item.mainImages[0].name} alt="${item.name} 사진"
  />
      <p style="font-size:12px">${item.extra.address}</P>
    </div>
  </div>
  
  `,
    lating: new kakao.maps.LatLng(
      item.extra.location[0],
      item.extra.location[1],
    ),
    _id: item._id,
    mainImages: item.mainImages,
    name: item.name,
  }));

  // console.log(positions);

  //현재 사용자 위치로 가는 함수
  function handleCurrentLocation() {
    // HTML5의 geolocation으로 사용할 수 있는지 확인
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻음
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        const locPosition = new kakao.maps.LatLng(lat, lon); // geolocation으로 얻어온 좌표

        mapRef.current.setLevel(4);
        mapRef.current.panTo(locPosition); // geolocation으로 얻어온 좌표로 이동
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 처리
      alert('현재 위치를 찾을 수 없습니다.');
    }
  }

  //초기 위치로 돌아가는 함수
  function handleInitLocation() {
    const initPosition = new kakao.maps.LatLng(
      36.349396783484984,
      127.76185524802845,
    );
    mapRef.current.panTo(initPosition);
    mapRef.current.setLevel(15);
    // mapRef.current.setCenter(36.349396783484984, 127.76185524802845);

    // center: new kakao.maps.LatLng(36.349396783484984, 127.76185524802845), // 지도의 중심좌표
    // level: 15, // 지도의 확대 레벨
  }
  //리스트에서 해당 가게 클릭시 지도에서 위치 이동
  function handleSelectLocation(item) {
    return function () {
      const cafePosition = new kakao.maps.LatLng(
        item.extra.location[0],
        item.extra.location[1],
      );

      //지도 확대
      let level = mapRef.current.getLevel();
      mapRef.current.setLevel(level - 11);
      mapRef.current.panTo(cafePosition);
      //상단으로 이동
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  }

  // 카페 리스트 받아오기
  const allCafeList = data?.item?.map(item => (
    <li
      style={{ cursor: 'pointer', width: '200px' }}
      key={item._id}
      onClick={handleSelectLocation(item)}
    >
      {item.name}
      <img
        style={{ width: '200px' }}
        src={
          import.meta.env.VITE_API_SERVER +
          '/files/05-cagong/' +
          item.mainImages[0].name
        }
        alt="카페사진"
      />
    </li>
  ));

  //카페 리스트 받아오기
  const changedCafeList = filteredCafeList?.map(item => (
    <li
      style={{ cursor: 'pointer', width: '200px' }}
      key={item._id}
      onClick={handleSelectLocation(item)}
    >
      {item.name}
      <img
        style={{ width: '200px' }}
        src={
          import.meta.env.VITE_API_SERVER +
          '/files/05-cagong/' +
          item.mainImages[0].name
        }
        alt="카페사진"
      />
    </li>
  ));
  // console.log(changedCafeList);

  return (
    <>
      <div>
        <div id="map" style={{ width: '355px', height: '355px' }} />
        <button onClick={handleCurrentLocation}>현재 위치</button>
        <button onClick={handleInitLocation}>초기 화면</button>
      </div>
      <h1>카페 리스트</h1>
      {filteredCafeList.length === 0 ? (
        <ul>{allCafeList}</ul>
      ) : (
        <ul>{changedCafeList}</ul>
      )}
    </>
  );
}

export default Map;
