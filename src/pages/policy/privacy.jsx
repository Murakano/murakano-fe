import styled from 'styled-components';

export default function Privacy() {
  return (
    <Container>
      <Title>개인 정보 처리 방침</Title>

      <Section>
        <SubTitle>
          개인정보보호법에 따라 머라카노에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및
          이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히
          읽은 후 동의하여 주시기 바랍니다.
        </SubTitle>
      </Section>

      <Section>
        <SectionTitle>1. 수집하는 개인정보</SectionTitle>
        <Paragraph>
          이용자는 회원가입을 하지 않아도 단어 검색서비스를 회원과 동일하게 이용할 수 있습니다. 이용자가 단어 등록, 수정
          요청 서비스를 이용하기 위해 회원가입을 할 경우, 머라카노는 서비스 이용을 위해 필요한 최소한의 개인정보를
          수집합니다.
        </Paragraph>
        <Paragraph>회원가입 시점에 머라카노가 이용자로부터 수집하는 개인정보는 아래와 같습니다.</Paragraph>
        <List>
          <ListItem>
            회원 가입 시 필수항목으로 이메일, 비밀번호를 수집합니다. 실명 인증된 아이디로 가입 시, 암호화된 동일인
            식별정보(CI), 중복가입 확인정보(DI), 내외국인 정보를 함께 수집합니다
          </ListItem>
          <ListItem>
            카카오 계정으로 회원가입 시에는 필수항목으로 카카오톡 닉네임을, 선택항목으로 이메일을 수집합니다.
          </ListItem>
        </List>
        <Paragraph>서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.</Paragraph>
        <List>
          <ListItem>
            머라카노 내의 개별 서비스 이용, 이벤트 응모 및 경품 신청 과정에서 해당 서비스의 이용자에 한해 추가 개인정보
            수집이 발생할 수 있습니다. 추가로 개인정보를 수집할 경우에는 해당 개인정보 수집 시점에서 이용자에게
            ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의 보관기간’에 대해 안내 드리고 동의를
            받습니다.
          </ListItem>
        </List>
        <Paragraph>
          서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보, 위치정보가 생성되어 수집될 수 있습니다.
        </Paragraph>
        <List>
          <ListItem>
            구체적으로 1) 서비스 이용 과정에서 이용자에 관한 정보를 자동화된 방법으로 생성하거나 이용자가 입력한 정보를
            저장(수집)될 수 있습니다. 이와 같이 수집된 정보는 개인정보와의 연계 여부 등에 따라 개인정보에 해당할 수
            있고, 개인정보에 해당하지 않을 수도 있습니다.
          </ListItem>
        </List>
        <SectionTitle>생성정보 수집에 대한 추가 설명</SectionTitle>
        <ParagraphTitle>IP(Internet Protocol) 주소란?</ParagraphTitle>
        <Paragraph>
          IP 주소는 인터넷 망 사업자가 인터넷에 접속하는 이용자의 PC 등 기기에 부여하는 온라인 주소정보 입니다. IP
          주소가 개인정보에 해당하는지 여부에 대해서는 각국마다 매우 다양한 견해가 있습니다.
        </Paragraph>
        <ParagraphTitle>서비스 이용기록이란?</ParagraphTitle>
        <Paragraph>
          머라카노 접속 일시, 이용한 서비스 목록 및 서비스 이용 과정에서 발생하는 정상 또는 비정상 로그 등을 의미합니다.
          정보주체가 식별되는 일부 서비스 이용기록(행태정보 포함)과 관련한 처리 목적 등에 대해서는 본 개인정보
          처리방침에서 규정하고 있는 수집하는 개인정보, 수집한 개인정보의 이용, 개인정보의 파기 등에서 설명하고
          있습니다. 이는 서비스 제공을 위해 수반되는 것으로 이를 거부하시는 경우 서비스 이용에 제한이 있을 수 있으며,
          관련하여서는 담당자에게로 문의해주시길 바랍니다.
        </Paragraph>
        <ParagraphTitle>쿠키(cookie)란?</ParagraphTitle>
        <Paragraph>
          쿠키는 이용자가 웹사이트를 접속할 때에 해당 웹사이트에서 이용자의 웹브라우저를 통해 이용자의 PC에 저장하는
          매우 작은 크기의 텍스트 파일입니다. 이후 이용자가 다시 웹사이트를 방문할 경우 웹사이트 서버는 이용자 PC에
          저장된 쿠키의 내용을 읽어 이용자가 설정한 서비스 이용 환경을 유지하여 편리한 인터넷 서비스 이용을 가능케
          합니다. 또한 방문한 서비스 정보, 서비스 접속 시간 및 빈도, 서비스 이용 과정에서 생성된 또는 제공(입력)한 정보
          등을 분석하여 이용자의 취향과 관심에 특화된 서비스(광고 포함)를 제공할 수 있습니다. 이용자는 쿠키에 대한
          선택권을 가지고 있으며, 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을
          거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키의 저장을 거부할 경우에는 로그인이 필요한
          머라카노 일부 서비스의 이용에 불편이 있을 수 있습니다.
        </Paragraph>
        <ParagraphTitle>웹 브라우저에서 쿠키 허용/차단 방법</ParagraphTitle>
        <List>
          <ListItem>크롬(Chrome) : 웹 브라우저 설정 &gt; 개인정보 보호 및 보안 &gt; 인터넷 사용 기록 삭제</ListItem>
          <ListItem>
            엣지(Edge) : 웹 브라우저 설정 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 및 사이트 데이터 관리 및 삭제
          </ListItem>
        </List>
        <ParagraphTitle>모바일 브라우저에서 쿠키 허용/차단</ParagraphTitle>
        <List>
          <ListItem>크롬(Chrome) : 모바일 브라우저 설정 &gt; 개인정보 보호 및 보안 &gt; 인터넷 사용 기록 삭제</ListItem>
          <ListItem>사파리(Safari) : 모바일 기기 설정 &gt; 사파리(Safari) &gt; 고급 &gt; 모든 쿠키 차단</ListItem>
          <ListItem>삼성 인터넷 : 모바일 브라우저 설정 &gt; 인터넷 사용 기록 &gt; 인터넷 사용 기록 삭제</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>2. 수집한 개인정보의 이용</SectionTitle>
        <Paragraph>머라카노 서비스의 회원관리등 아래의 목적으로만 개인정보를 이용합니다.</Paragraph>
        <List>
          <ListItem>
            회원 가입 의사의 확인, 이용자 식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.
          </ListItem>
          <ListItem>
            법령 및 머라카노 이용약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한
            운영에 지장을 주는 행위에 대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정 등의 고지사항 전달,
            분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및 서비스 운영을 위하여 개인정보를 이용합니다.
          </ListItem>
          <ListItem>
            서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 및
            광고 게재 등에 개인정보를 이용합니다.
          </ListItem>
          <ListItem>
            보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해 개인정보를
            이용합니다.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>3. 개인정보 보관기간</SectionTitle>
        <Paragraph>회사는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이 파기하고 있습니다.</Paragraph>
        <Paragraph>
          전자상거래 등에서의 소비자 보호에 관한 법률, 전자문서 및 전자거래 기본법, 통신비밀보호법 등 법령에서 일정기간
          정보의 보관을 규정하는 경우는 아래와 같습니다. 머라카노는 이 기간 동안 법령의 규정에 따라 개인정보를 보관하며,
          본 정보를 다른 목적으로는 절대 이용하지 않습니다.
        </Paragraph>
        <List>
          <ListItemTitle>전자상거래 등에서 소비자 보호에 관한 법률</ListItemTitle>
          <List>
            <ListItem>계약 또는 청약철회 등에 관한 기록: 5년 보관</ListItem>
            <ListItem>대금결제 및 재화 등의 공급에 관한 기록: 5년 보관</ListItem>
            <ListItem>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 보관</ListItem>
          </List>
          <ListItemTitle>전자문서 및 전자거래 기본법</ListItemTitle>
          <List>
            <ListItem>공인전자주소를 통한 전자문서 유통에 관한 기록: 10년 보관</ListItem>
          </List>
          <ListItemTitle>통신비밀보호법</ListItemTitle>
          <List>
            <ListItem>로그인 기록: 3개월</ListItem>
          </List>
        </List>
      </Section>

      <Section>
        <SectionTitle>4. 개인정보 수집 및 이용 동의를 거부할 권리</SectionTitle>
        <Paragraph>
          이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 회원가입 시 수집하는 최소한의 개인정보, 즉,
          필수 항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.
        </Paragraph>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  max-width: 780px;
  width: 100%;
  padding: 20px;
  color: #666;
  margin-top: 20px;
  border-radius: 10px;
  line-height: 1.6;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #000;
`;

const SubTitle = styled.h1`
  font-size: 15px;
  /* font-weight: bold; */
  margin-bottom: 10px;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 5px;
  color: #000;
  font-weight: 500;
`;

const Paragraph = styled.p`
  margin-bottom: 10px;
`;

const ParagraphTitle = styled.h3`
  margin-bottom: 8px;
  color: #000;
`;

const List = styled.ul`
  margin-left: 20px;
  margin-bottom: 10px;
  list-style-type: disc;
`;

const ListItemTitle = styled.li`
  margin-bottom: 5px;
  color: #000;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;
