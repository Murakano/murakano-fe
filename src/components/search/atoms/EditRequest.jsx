import Button from "@/components/common/atoms/Button"; // 파일 경로에 맞게 수정해주세요

function EditRequest() {
    return (
      <div>
        <Button onClick={() => alert('버튼이 클릭되었습니다.')}>
          수정 요청하기
        </Button>
      </div>
    );
  }
  
  export default EditRequest;