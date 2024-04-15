import styled from 'styled-components';
import PropTypes from 'prop-types';

function Modal({ children }) {
  Modal.propTypes = {
    children: PropTypes.string,
  };

  const ModalStyle = styled.div`
    width: 200px;
    height: 250px;
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #D8D8D8;
  `;

  return (
    <ModalStyle>
      {children}
    </ModalStyle>
  );
}

export default Modal;