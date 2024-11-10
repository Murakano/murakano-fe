import styled from 'styled-components';

const ModalTitle = ({ title }) => {
  return <Title>{title}</Title>;
};

const Title = styled.h1`
  width: 163px;
  height: 56px;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: -0.03em;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

export default ModalTitle;
