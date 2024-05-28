import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

Toast.propTypes = {
  setToast: PropTypes.func,
  text: PropTypes.string,
};

const ToastStyle = styled.div`
    .toast{
        background-color: #FF6666;
        padding: 10px 15px;
        border-radius: 10px;
    }
    .message{
        color: white;
        font-weight: 600;
        font-size: 1.6rem;
    }
`;

function Toast({ setToast, text }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <ToastStyle>
      <div className='toast'>
        <p className="message">{text}</p>
      </div>
    </ToastStyle>
  );
}

export default Toast;
