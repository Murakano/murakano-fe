import { useState, useEffect } from 'react';
import { HELPER_TEXT } from '@/constants/helperText';
import { validateLength, validateDevTerm } from '@/utils/validate';
import { updateState } from '@/utils/stateUtils';
import api from '@/utils/api';

export const useRequestForm = (requestData) => {
  const [formData, setFormData] = useState({
    devTerm: requestData ? requestData.word : '',
    commonPron: requestData ? requestData.compron : '',
    awkPron: requestData ? requestData.awkpron : '',
    addInfo: requestData ? requestData.addinfo : '',
  });

  const [helperText, setHelperText] = useState({
    devTermHelper: '',
    commonPronHelper: '',
    awkPronHelper: '',
    addInfoHelper: '',
  });

  const [buttonActive, setButtonActive] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const requestType = requestData ? requestData.type : '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = async (e, isRequestCompleted) => {
    const { name, value } = e.target;
    if (isRequestCompleted) return;

    let hasError = false;

    if (!formData.devTerm) {
      updateState('devTermHelper', HELPER_TEXT.REQUIRED_INPUT_EMPTY, setHelperText);
      hasError = true;
    } else if (!validateDevTerm(formData.devTerm)) {
      updateState('devTermHelper', HELPER_TEXT.INVALID_DEVTERM, setHelperText);
      hasError = true;
    } else if (!validateLength(formData.devTerm, 50)) {
      updateState('devTermHelper', HELPER_TEXT.EXCEED_LENGTH(50), setHelperText);
      hasError = true;
    } else {
      updateState('devTermHelper', '', setHelperText);
    }

    if (!formData.commonPron && requestType === 'mod') {
      updateState('commonPronHelper', HELPER_TEXT.REQUIRED_INPUT_EMPTY, setHelperText);
      hasError = true;
    } else if (formData.commonPron && !validateLength(formData.commonPron, 100)) {
      updateState('commonPronHelper', HELPER_TEXT.EXCEED_LENGTH(100), setHelperText);
      hasError = true;
    } else {
      updateState('commonPronHelper', '', setHelperText);
    }

    if (formData.awkPron && !validateLength(formData.awkPron, 100)) {
      updateState('awkPronHelper', HELPER_TEXT.EXCEED_LENGTH(100), setHelperText);
      hasError = true;
    } else {
      updateState('awkPronHelper', '', setHelperText);
    }

    if (!validateLength(formData.addInfo, 1000)) {
      updateState('addInfoHelper', HELPER_TEXT.EXCEED_LENGTH(1000), setHelperText);
      hasError = true;
    } else {
      updateState('addInfoHelper', '', setHelperText);
    }

        if (name === 'devTerm' && requestType === 'add') {
        try {
            const response = await api.post('/words/duplicate', { word: formData.devTerm });
            if (response.data.isDataExist !== null) {
            updateState('devTermHelper', HELPER_TEXT.DUPLICATE_WORD, setHelperText);
            hasError = true;
            setIsDuplicate(true);
            } else {
            setIsDuplicate(false);
            }   
        } catch (error) {
            console.error('단어 중복 검사 중 오류 발생:', error);
        }
        }

    setHasError(hasError);
  };

  useEffect(() => {
    if (
      validateLength(formData.devTerm, 50) &&
      validateLength(formData.commonPron, 100) &&
      validateLength(formData.awkPron, 100) &&
      validateLength(formData.addInfo, 1000) &&
      validateDevTerm(formData.devTerm) &&
      formData.devTerm &&
      (!isDuplicate || requestType === 'mod') &&
      (requestType !== 'mod' || formData.commonPron)
    ) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [formData]);

  return {
    formData,
    helperText,
    buttonActive,
    hasError,
    handleChange,
    handleBlur,
    setFormData,
  };
};
