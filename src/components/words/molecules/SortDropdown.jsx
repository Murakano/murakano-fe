import { React, useEffect, useState } from 'react';
import CommDropdown from '@/components/common/molecules/CommDropdown';
import api from '@/utils/api';

export default function SortDropdown() {
  const labels = ['A-Z', 'Z-A', '인기순', '최신순'];
  const [sortMethod, setSortMethod] = useState('최신순');
  const [sortedWords, setSortedWords] = useState([]);

  const handleSortChange = (selectedSort) => {
    setSortMethod(selectedSort);
  };

  useEffect(() => {
    // Fetch words from API or any other source
    const fetchWords = async () => {
      const response = await api.get('/words', {
        Sort: 'recent',
      });
      const data = response.data;
      sortWords(data);
    };

    fetchWords();
  }, []);

  const sortWords = (words) => {
    let sorted = [...words];
    switch (sortMethod) {
      case 'A-Z':
        sorted = sorted.sort((a, b) => a.word.localeCompare(b.word));
        break;
      case 'Z-A':
        sorted = sorted.sort((a, b) => b.word.localeCompare(a.word));
        break;
      case '인기순':
        sorted = sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      case '최신순':
        sorted = sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        break;
    }
    setSortedWords(sorted);
  };

  useEffect(() => {
    if (sortedWords.length > 0) {
      sortWords(sortedWords);
    }
  }, [sortMethod]);

  return (
    <>
      <CommDropdown labels={labels} dropdownName='전체' onChange={handleSortChange} />
    </>
  );
}
