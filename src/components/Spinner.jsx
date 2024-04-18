import styled from 'styled-components'

const SpinnerStyle = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
img{
  width: 100px;
}
`

function Spinner(){

    return (
      <SpinnerStyle>
        <img src="/cagong_spin.gif" alt="잠시만 기다려 주세요."/>
      </SpinnerStyle>
    );
  }
  
  export default Spinner;