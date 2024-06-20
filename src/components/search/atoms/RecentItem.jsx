import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
import { ResetLink } from "@/styles/commonStyles";

export function RecentItem({ children, onRemove }) {
  return (
    <DDItem>
      <RecentLink href={`/search?query=${children || ""}`}>
        <DDText>{children || "최근 검색어가 없습니다."}</DDText>
      </RecentLink>

      {children && <CloseIcon onClick={() => onRemove(children)} />}
    </DDItem>
  );
}

const DDItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18px;
  color: #666666;
  overflow: hidden;
  font-size: 16px;
  font-weight: 400;
`;

const RecentLink = styled(ResetLink)`
  flex-grow: 1;
`;

const DDText = styled.div`
  padding-top: 2px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #666666;

  &:hover {
    color: #000000;
    background-color: var(--secondary10);
  }
`;

const CloseIcon = styled(CloseOutlined)`
  font-size: 10px;
  cursor: pointer;
  &:hover {
    color: #000000;
  }
`;
