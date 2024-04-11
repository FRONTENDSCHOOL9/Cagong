import styled from 'styled-components'

function Spinner(){
    const Div = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    `
    const Img = styled.img`
        width: 200px;
    `

    return (
      <Div>
        <Img src="/cagong_spin.gif" alt="잠시만 기다려 주세요."/>
      </Div>
    );
  }
  
  export default Spinner;