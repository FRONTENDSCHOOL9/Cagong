import styled from 'styled-components';
import PropTypes from 'prop-types';

LogoutButton.propTypes = {
  children: PropTypes.string.isRequired,
};

const StyledButton = styled.button`
  background-color: #ff6666;
  color: #ffffff
  font-family: 'NanumSquareRound';
  border: none;
  padding: ${props => props.padding};
  border-radius: 8px;
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  cursor: pointer;
  type: ${props => props.type};

  &:hover {
    background-color: #ffffff;
    color: black;
  }
  &:disabled {
    background-color: #ff6666;
    color: #ffffff;
  }
`;

function LogoutButton({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default LogoutButton;
