import CommDropdown from '@/components/common/molecules/CommDropdown';
import { useSortStore } from '@/store/useSortStore';

export default function SortDropdown({ onSelect }) {
  const labels = ['A-Z', 'Z-A', '인기순', '최신순'];
  const values = ['asc', 'desc', 'popularity', 'recent'];
  const { setSortType } = useSortStore();

  // 드롭다운 메뉴와 값 매핑, API 로 전달
  const handleChange = (value) => {
    const index = labels.map((label) => label.toLowerCase()).indexOf(value);
    if (index !== -1) {
      onSelect(values[index]);
    }
    // setSort(values[index]);
    setSortType(values[index]);
  };

  return <CommDropdown labels={labels} dropdownName='전체' onChange={handleChange} />;
}
