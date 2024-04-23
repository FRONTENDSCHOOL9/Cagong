import styled from 'styled-components';

const MapStyle = styled.div`
  //스크롤바 숨기기
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  height: 100vh;

  margin: 0;
  font-family: 'NanumSquareRound';
  min-height: 100%;
  max-width: 1000px;
  position: fixed;
  overflow: hidden;
  touch-action: none;
  width: 100%;
  scroll: no;

  #map {
    // min-height: 300px;
  }

  .wrapper {
    height: 45%;
    position: relative;
  }

  .btn-map {
    position: absolute;
    cursor: pointer;
    border-radius: 8px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-contents: center;
    width: 33px;
    height: 33px;
    border: none;
  }

  .btn-map.current {
    bottom: 70px;
    right: 15px;
    z-index: 9999;
  }

  .btn-map.zoom-out {
    bottom: 35px;
    right: 15px;
    z-index: 9999;
  }

  .btn-map.current img {
    width: 100%;
  }

  .btn-map.zoom-out img {
    width: 100%;
  }

  .info_wrapper {
    width: 330px;
    position: relative;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .info_name {
    text-align: center;
    font-size: 1.8rem;
    color: #222222;
    font-weight: 600;
  }

  .info_cover {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 100px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .info_thumb {
    display: block;
    // position: absolute;
    left: 10%;
    width: 32%;
    // height: 100px;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 8px;
    vertical-align: bottom;
    box-shadow: 0px 8px 6px -6px #666;
  }

  .info_adress {
    text-align: center;
    padding: 10px;
    font-size: 1.2rem;
  }

  .cafe-wrapper {
    display: flex;
    // display: none;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    position: relative;
    background-color: white;
    top: -30px;
    height: 45%;
    max-height: 620px;
    border-radius: 20px 20px 0 0;
    overflow: auto;
    z-index: 1;
  }

  .cafe-header {
    width: 100%;
    max-width: 1000px;
    text-align: center;
    border-radius: 20px 20px 0 0;
    padding: 22px 0 18px 0;
    position: fixed;
    background-color: white;
  }

  .cafe-header_title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2rem;
    font-weight: 800;
  }

  //카페리스트 확장 버튼
  // .cafe-expand {
  //   position: absolute;
  //   border: none;
  //   width: 33px;
  //   height: 33px;
  //   right: 15px;
  //   top: 15px;
  //   z-index: 9999;
  //   cursor: pointer;
  //   border-radius: 8px;
  //   background-color: white;
  // }

  /*카페리스트*/

  .cafe-list_item {
    display: flex;
    cursor: pointer;
    padding: 0 10px;
    margin-bottom: 8px;
    // align-items: center;
    min-width: 350px;
    width: 350px;
  }

  .cafe-list_item:first-child {
    margin-top: 67px;
  }

  .cafe-list_item:last-child {
    margin-bottom: 57px;
  }

  .cafe-list_item-cover {
    text-align: center;
    min-width: 20%;
    width: 30px;
    box-shadow: 0px 8px 6px -6px #666;
    border-radius: 8px;
    margin: 0 5px 5px 0;
  }

  .cafe-list_item-cover-thumb {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 8px;
    vertical-align: bottom;
  }

  .cafe-list_item-detail {
    flex-grow: 1;
    padding: 5px 0 0 5px;
  }

  .cafe-list_item-layout {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 5px;
  }

  .cafe-list_item-title {
    font-size: 1.6rem;
    font-weight: 600;
    width: 200px;
    border-bottom: 3px double #ffa931;
    padding-bottom: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cafe-list_item-distance {
    display: block;
    padding-top: 21px;
    padding-left: 10px;
    color: #888888;
    font-size: 1.2rem;
  }

  .cafe-list_item-address-item {
    font-size: 1.4rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (min-width: 650px) {
    .cafe-list_item {
      width: 100%;
    }
    .cafe-list_item-title {
      width: 100%;
    }
  }
`;

export default MapStyle;
