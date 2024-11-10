import styled from 'styled-components';

const ModalButton = ({ children, onClick, isClose, active, disabled }) => {
  return (
    <Button onClick={onClick} $isClose={isClose} $active={active} disabled={disabled}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  width: 88px;
  height: 40px;
  border: none;
  border-radius: 30px;
  padding: 8px 30px;
  color: #fff;
  cursor: ${(props) => (props.$isClose || props.$active ? 'pointer' : 'not-allowed')};
  background-color: ${(props) =>
    props.$isClose ? 'rgba(0, 0, 0, 0.25)' : props.$active && !props.disabled ? 'var(--primary)' : 'var(--primary60)'};
  &:hover {
    box-shadow: ${(props) =>
      props.$isClose ? '0px 2px 4px 0px #00000026' : props.$active ? '0px 2px 6px 0px #3C8BFF99' : 'none'};
    ${(props) => props.disabled && `box-shadow: none;`}
  }
  &:nth-child(2) {
    background: #FF002E;
    cursor: ${(props) => (!props.disabled ? 'pointer' : 'not-allowed')};
    &:hover {
      box-shadow: ${(props) => (!props.disabled ? '0px 2px 8px 0px #FF080899' : 'none')};
      background: ${(props) => (!props.disabled ? '#FF002E' : '#FF002E')};
      ${(props) => props.disabled && `box-shadow: none`}
    }
  }
`;

export default ModalButton;
