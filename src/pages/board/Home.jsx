import { Link } from 'react-router-dom';
function Home() {
  return (
    <>
      <h1>home</h1>
      <Link to="/boards/CafeList">카공 인기 카페</Link>
      <div>
        <ul>
          <li>cafe 1</li>
          <li>cafe 2</li>
          <li>cafe 3</li>
        </ul>
      </div>
      {console.log(1)}
    </>
  );
}

export default Home;
