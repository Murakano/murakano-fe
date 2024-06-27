import RequestSection from "@/components/auth/organisms/RequestSection";
import Header from "@/components/common/organisms/Header";
import { Container } from "@/styles/commonStyles";

export default function Requests() {
  return (
    <Container>
      <Header />
        <RequestSection />
    </Container>
  );
}