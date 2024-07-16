import { useEffect, useState } from 'react';
import RequestModal from '@/components/auth/molecules/RequestModal';
import { useRequestForm } from '@/hooks/useRequestForm';
import api from '@/utils/api';

// cop

export default function ModifyRequestModal({ onClose, requestData, userRole, refreshRequests }) {
    const [deleteRequest, setDeleteRequest] = useState(false);
    const [rejectRequest, setRejectRequest] = useState(false);
    const isRequestCompleted = requestData.status === 'app' || requestData.status === 'rej';

    const {
        formData,
        helperText,
        buttonActive,
        hasError,
        handleChange,
        handleBlur,
        setFormData,
    } = useRequestForm(requestData);

    //제출 버튼
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (hasError) return;

        try {
            // 관리자
            if (userRole === 'admin') {
                const response = await api.post(`/users/requests/${requestData._id}/status`, {
                    status: 'app',
                    formData,
                    requestType: 'mod',
                });

                if (response.message === '요청 상태 변경 성공') {
                    onClose();
                    refreshRequests();
                    alert('승인되었습니다!');
                }
            } else {
            // 일반 유저
                const response = await api.post(`/users/requests/${requestData._id}`, { formData });

                if (response.message === '요청 수정 성공') {
                    onClose();
                    refreshRequests();
                    alert('수정되었습니다!');
                }
            }
        } catch (error) {
            console.error('처리 중 오류 발생:', error);
            alert('처리 중 오류가 발생했습니다.');
        }
    };

    // 삭제버튼
    useEffect(() => {
        if (!deleteRequest && !rejectRequest) return;

        const handleDelete = async () => {
        const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
        if (!confirmDelete) {
            setDeleteRequest(false);
            return;
        }

        try {
            const response = await api.delete(`/users/requests/${requestData.word}`);

            if (response.message === '요청 삭제 성공') {
            onClose();
            refreshRequests();
            alert('삭제됐습니다');
            }
        } catch (error) {
            console.error('삭제 중 오류 발생:', error);
        } finally {
            setDeleteRequest(false);
        }
        };

        const handleReject = async () => {
        const confirmReject = window.confirm('정말 반려하시겠습니까?');
        if (!confirmReject) {
            setRejectRequest(false);
            return;
        }

        try {
            const response = await api.post(`/users/requests/${requestData._id}/status`, { status: 'rej' });

            if (response.message === '요청 상태 변경 성공') {
            onClose();
            refreshRequests();
            alert('반려되었습니다');
            }
        } catch (error) {
            console.error('반려 중 오류 발생:', error);
            alert('반려 중 오류가 발생했습니다.');
        } finally {
            setRejectRequest(false);
        }
        };

        if (deleteRequest) {
        handleDelete();
        } else if (rejectRequest) {
        handleReject();
        }
    }, [deleteRequest, rejectRequest, onClose, requestData.word, refreshRequests]);


    const inputFieldConfigs = [
        { name: "devTerm", labelText: "개발 용어 (영어)" },
        { name: "commonPron", labelText: "일반적인 발음 (한글)" },
        { name: "awkPron", labelText: "어색한 발음 (한글)" },
    ];

    return (
        <RequestModal
            title="수정 요청"
            onClose={onClose}
            requestData={requestData}
            userRole={userRole}
            refreshRequests={refreshRequests}
            inputFieldConfigs={inputFieldConfigs}
            formData={formData}
            helperText={helperText}
            handleBlur={handleBlur}
            handleChange={handleChange}
            setFormData={setFormData}
            isRequestCompleted={isRequestCompleted}
            handleSubmit={handleSubmit}
            buttonActive={buttonActive}
            setRejectRequest={setRejectRequest}
            setDeleteRequest={setDeleteRequest}
        />
    );
}
