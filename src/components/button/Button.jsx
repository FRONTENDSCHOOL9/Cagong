import styled from 'styled-components';
import PropTypes from 'prop-types';

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

const StyledButton = styled.button`
  background-color: #ffa931;
  color: white;
  font-family: 'NanumSquareRound';
  border: none;
  padding: ${props => props.padding};
  border-radius: 8px;
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  cursor: pointer;

  &:hover {
    background-color: #ff6300;
  }
  &:disabled {
    background-color: #eeeeee;
  }
`;

function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
