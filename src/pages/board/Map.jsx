import { useEffect } from 'react';
const { kakao } = window;

const App = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '500px', height: '400px' }} />
    </div>
  );
};

export default App;
