import styled from 'styled-components';
import InputBox, { Box } from '@/components/common/molecules/InputBox';

const ModalInputBox = ({
  type,
  name,
  labelText,
  input,
  setInput,
  valid,
  helperText,
  readOnly,
  disabled,
  onBlur,
  $isRequestCompleted,
  requestType,
}) => {
  return (
    <StyledInputBox
      type={type}
      name={name}
      labelText={labelText}
      input={input}
      setInput={setInput}
      valid={valid}
      helperText={helperText}
      readOnly={readOnly}
      disabled={disabled}
      onBlur={onBlur}
      $isRequestCompleted={$isRequestCompleted}
      requestType={requestType}
    />
  );
};

const StyledInputBox = styled(InputBox)`
  &&&.Box {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    width: 100px;
  }
  Input {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 498px;
    height: 55px;
    padding: 10px 20px;
    border: 1px solid var(--secondary);
    border-color: ${(props) => (!props.valid ? '#ff0808' : 'var(--secondary)')};
    &:focus {
      border-color: ${(props) => (!props.valid ? '#ff0808' : 'var(--primary)')};
      outline: none;
    }
    &:hover {
      border-color: ${(props) => (!props.valid ? '#ff0808' : 'var(--primary)')};
    }
    ${(props) =>
      (props.$isRequestCompleted || props.disabled) &&
      `
        &:hover {
            border-color: var(--secondary);
        }
        &:focus {
            border-color: var(--secondary);
            outline: none;
        }
        `}
  }
  Label {
    width: 498px;
    font-size: 15px;
    font-weight: 600;
    line-height: 22.5px;
    letter-spacing: -0.03em;
    text-align: left;
    position: relative;
    &::after {
      content: ${(props) =>
        props.name === 'devTerm' || (props.name === 'commonPron' && props.requestType === 'mod') ? "' *'" : "''"};
      color: #ff0808;
      position: aboslute;
      right: 5%;
      top: 0;
    }
  }

  @media (max-width: 600px) {
    Input {
      width: 100%;
    }
  }
`;

export default ModalInputBox;
