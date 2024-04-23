import MapStyle from './MapStyle';
import { getDistanceBetweenTwoAddresses } from './MapUtils';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useRef, useState } from 'react';
const { kakao } = window;
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import axios from 'axios';
import MainHeader from '@components/layout/MainHeader';
import Wrapper from '@components/layout/Wrapper';
import { useLocation } from 'react-router-dom';

function Map() {
  const mapRef = useRef(null);
  const infowindowRef = useRef(null);
  const curLatRef = useRef(null);
  const curLonRef = useRef(null);
  const customAxios = useCustomAxios();
  const [filteredCafeList, setFilteredCafeList] = useState([]);
  const [distanceToCafe, setDistanceToCafe] = useState([]);
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => customAxios.get(`/products`),
    select: response => response.data,
    suspense: true,
  });

  const location = useLocation();

  useEffect(() => {
    let receiveData = '';
    if (location.state && location.state.addressData) {
      receiveData = location.state?.addressData; // state에서 데이터를 검색합니다.
      // console.log(location.state?.addressData);
    }
    async function handleMapForCafe(receivedData) {
      const response = await axios.get(
        'https://dapi.kakao.com/v2/local/search/address.json',
        {
          params: { query: receivedData },
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
          },
        },
      );
      const { x, y } = response.data.documents[0];
      // console.log(x, y);
      const cafeX = Number(x).toFixed(7);
      const cafeY = Number(y).toFixed(7);

      const locPosition = new kakao.maps.LatLng(cafeY, cafeX); // geolocation으로 얻어온 좌표
      mapRef.current.setLevel(1, { animate: true });
      mapRef.current.panTo(locPosition);
      // console.log(location.state?.addressData);
      // console.log(wtmResponse2.data.documents[0]);
    }
    if (location.state && location.state.addressData) {
      handleMapForCafe(receiveData);
    }
    // console.log(handleMapForCafe(receivedData));
  }, [location.state?.addressData]);

  const cafeListCopy =
    data?.item?.map(item => ({
      active: item?.active ?? false,
      bookmarks: item?.bookmarks ?? [],
      extra: item?.extra,
      mainImages: item?.mainImages ?? [],
      name: item?.name,
      price: item?.price ?? 0,
      quantity: item?.quantity ?? 0,
      replies: item?.replies ?? [],
      seller_id: item?.seller_id,
      shippingFees: item?.shippingFees ?? 0,
      _id: item?._id,
      distance: distanceToCafe?.find(distance => distance._id === item._id)
        ?.res,
    })) || [];
  // console.log(cafeListCopy);

  const sortedAllCafeList = cafeListCopy.sort(
    (a, b) => a.distance - b.distance,
  );
  // console.log(sortedAllCafeList);
  currentLocation();

  function currentLocation() {
    // HTML5의 geolocation으로 사용할 수 있는지 확인
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻음
      navigator.geolocation.getCurrentPosition(async function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        curLatRef.current = lat;
        curLonRef.current = lon;
        // console.log(curLonRef.current, curLatRef.current);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 처리
      alert('현재 위치를 찾을 수 없습니다.');
    }
  }

  useEffect(() => {
    const distancePromises = cafeListCopy.map(item =>
      getDistanceBetweenTwoAddresses(
        item.extra.address,
        curLonRef.current,
        curLatRef.current,
      ).then(res => ({
        res: res,
        _id: item._id,
      })),
    );
    Promise.all(distancePromises).then(distances => {
      setDistanceToCafe(distances);
    });
  }, [mapRef.current]);

  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(curLatRef.current, curLonRef.current), // 지도의 중심좌표
      level: 6, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(container, options);
    mapRef.current = map;

    const markerImageSrc = '/markerImage.png';
    const coffeeMarkers = [];
    createCoffeeMarkers();

    // 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수
    function createMarkerImage(src, size, options) {
      const markerImage = new kakao.maps.MarkerImage(src, size, options);
      return markerImage;
    }

    // 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수
    function createMarker(position, image) {
      const marker = new kakao.maps.Marker({
        position: position,
        image: image,
      });

      return marker;
    }

    //마커 클릭시 인포윈도우 온 오프 기능을 위한 배열
    let infowindowArray = [];

    // 커피숍 마커를 생성하고 커피숍 마커 배열에 추가하는 함수
    function createCoffeeMarkers() {
      for (let i = 0; i < positions.length; i++) {
        const imageSize = new kakao.maps.Size(22, 26),
          imageOptions = {
            spriteOrigin: new kakao.maps.Point(0, 0),
            spriteSize: new kakao.maps.Size(24, 24),
          };

        // 마커이미지와 마커를 생성
        const markerImage = createMarkerImage(
            markerImageSrc,
            imageSize,
            imageOptions,
          ),
          marker = createMarker(positions[i].lating, markerImage);
        // 인포윈도우를 생성
        let infowindow = new kakao.maps.InfoWindow({
          content: positions[i].content,
          removable: true,
        });
        infowindowRef.current = infowindow;

        // 생성된 마커를 커피숍 마커 배열에 추가
        coffeeMarkers.push(marker);
        // 마커에 마우스클릭 이벤트를 등록
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

        if (infowindowArray[0] === infowindow) {
          infowindow.close();
          infowindowArray = [];
          // console.log(infowindowArray + 'if');
        } else {
          for (let i = 0; i < infowindowArray.length; i++) {
            infowindowArray[i].close();
            infowindowArray = [];
          }
          infowindow.open(map, marker);
          infowindowArray.push(infowindow);
          // console.log(infowindowArray + 'else');
        }
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

  useEffect(() => {
    const handleBoundsChanged = debounce(() => {
      // // 지도 영역정보를 얻어옴
      let bounds = mapRef.current.getBounds();
      // // 영역정보의 남서쪽 정보를 얻어옴
      let swLatlng = bounds.getSouthWest();
      // // 영역정보의 북동쪽 정보를 얻어옴
      let neLatlng = bounds.getNorthEast();
      let mapBounds = new kakao.maps.LatLngBounds(swLatlng, neLatlng); // 인자를 주지 않으면 빈 영역을 생성한다.
      // // 지도 영역정보를 얻어옴
      const filteredPositions = cafeListCopy
        .sort((a, b) => a.distance - b.distance)
        .filter(item => {
          const lating = new kakao.maps.LatLng(
            item.extra.location[0],
            item.extra.location[1],
          );
          return mapBounds.contain(lating);
        });
      setFilteredCafeList(filteredPositions);
      // console.log(cafeListCopy);
      // console.log(filteredPositions);
      // console.log(cafeListCopy);
      // console.log(sortedAllCafeList);
      // console.log(filteredPositions);
      // console.log(allCafeList);
      // console.log(mapBounds);
    }, 500);
    kakao.maps.event.addListener(
      mapRef.current,
      'bounds_changed',
      handleBoundsChanged,
    );

    return () => {
      handleBoundsChanged.cancel(); // 컴포넌트가 언마운트될 때 디바운스 함수를 취소합니다.
    };
  }, [distanceToCafe]);
  // console.log(data);
  // console.log(filteredCafeList);
  // data를 받아 지도 핀에 뿌려 줄 정보를 담은 positions 배열을 만든다.
  const positions = cafeListCopy.map(item => ({
    content: `
    <div class="info_wrapper">
    <a  href="/boards/cafeDetail/${item._id}">
    <h1 class="info_name">${item.name} </h1>
    <div class="info_cover">
    <img class="info_thumb" src=${import.meta.env.VITE_API_SERVER}/files/${
      import.meta.env.VITE_CLIENT_ID
    }/${item.mainImages[0]?.name} alt="${item.name} 사진"
    /><img class="info_thumb" src=${import.meta.env.VITE_API_SERVER}/files/${
      import.meta.env.VITE_CLIENT_ID
    }/${item.mainImages[1]?.name} alt="${item.name} 사진"
  />
  <img class="info_thumb" src=${import.meta.env.VITE_API_SERVER}/files/${
      import.meta.env.VITE_CLIENT_ID
    }/${item.mainImages[2]?.name} alt="${item.name} 사진"
  />
    </div>
    </a>
        <p class="info_adress">${item.extra.address}</P>
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
        mapRef.current.setLevel(6, { animate: true });
        mapRef.current.panTo(locPosition); // geolocation으로 얻어온 좌표로 이동
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 처리
      alert('현재 위치를 찾을 수 없습니다.');
    }
  }

  //페이지 로드 시 현재 위치로
  useEffect(() => {
    handleCurrentLocation(); // 현재 위치로
  }, []);

  //줌 아웃 함수
  function handleZoomOut() {
    const initPosition = new kakao.maps.LatLng(
      36.349396783484984,
      127.76185524802845,
    );
    mapRef.current.panTo(initPosition);
    mapRef.current.setLevel(15, { animate: true });
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
  //거리 정보가 추가 된 데이터 복사본

  // console.log(data.item);
  // console.log(cafeListCopy);
  // console.log(sortedCafeList);
  const allCafeList = sortedAllCafeList.map(item => (
    <li
      className="cafe-list_item"
      key={item._id}
      onClick={handleSelectLocation(item)}
    >
      <div className="cafe-list_item-cover">
        <img
          className="cafe-list_item-cover-thumb"
          src={
            import.meta.env.VITE_API_SERVER +
            '/files/' +
            import.meta.env.VITE_CLIENT_ID +
            '/' +
            item.mainImages[0].name
          }
          alt="카페사진"
        />
      </div>
      <div className="cafe-list_item-detail">
        <div className="cafe-list_item-layout">
          <span className="cafe-list_item-title">{item.name}</span>
        </div>
        <div>
          <span className="cafe-list_item-address-item">
            {item.extra.address}
          </span>
        </div>
      </div>
      <span className="cafe-list_item-distance">
        {distanceToCafe?.map(distance =>
          item._id === distance._id ? `${distance.res}km` : '',
        )}
      </span>
    </li>
  ));

  //지도영역 안의 카페 리스트 불러오기
  const changedCafeList = filteredCafeList?.map(item => (
    <li
      className="cafe-list_item"
      key={item._id}
      onClick={handleSelectLocation(item)}
    >
      <div className="cafe-list_item-cover">
        <img
          className="cafe-list_item-cover-thumb"
          src={
            import.meta.env.VITE_API_SERVER +
            '/files/' +
            import.meta.env.VITE_CLIENT_ID +
            '/' +
            item.mainImages[0].name
          }
          alt="카페사진"
        />
      </div>
      <div className="cafe-list_item-detail">
        <div className="cafe-list_item-layout">
          <span className="cafe-list_item-title">{item.name}</span>
        </div>
        <div>
          <span className="cafe-list_item-address-item">
            {item.extra.address}
          </span>
        </div>
      </div>
      <span className="cafe-list_item-distance">
        {distanceToCafe?.map(distance =>
          item._id === distance._id ? `${distance.res}km` : '',
        )}
      </span>
    </li>
  ));

  // console.log(changedCafeList);
  // console.log(allCafeList);
  // console.log(sortedCafeList);
  // console.log(sortedChangedCafeList);
  return (
    <>
      <MainHeader />
      <Wrapper>
        <MapStyle>
          <div className="wrapper">
            <div id="map" style={{ width: '100%', minHeight: '100%' }} />
            <button className="btn-map current" onClick={handleCurrentLocation}>
              <img src="/map_current-position.svg" alt="" />
            </button>
            <button className="btn-map zoom-out" onClick={handleZoomOut}>
              <img src="/map_zoom-out.svg" alt="" />
            </button>
          </div>
          <div className="cafe-wrapper">
            <div className="cafe-header">
              {/* <button className="cafe-expand">//확장버튼
              <img src="/expand-up-and-down.svg" alt="" />
            </button> */}
              <h1 className="cafe-header_title">카페 리스트</h1>
            </div>
            {filteredCafeList.length === 0 ? (
              <ul>{allCafeList}</ul>
            ) : (
              <ul>{changedCafeList}</ul>
            )}
          </div>
        </MapStyle>
      </Wrapper>
    </>
  );
}

export default Map;
