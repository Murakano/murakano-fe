export const HistoryIcon = ({ header = false, stroke = '#767676' }) => {
  const size = header === true ? '20' : '17'; // header가 true일 때 크기를 14로, 아니면 17로 설정
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.04403 17.8498C10.275 21.0808 15.513 21.0808 18.744 17.8498C21.975 14.6188 21.975 9.38081 18.744 6.14981C15.513 2.91881 10.275 2.91881 7.04403 6.14981L2.83203 10.3618M2.83203 10.3618V5.80081M2.83203 10.3618L7.39303 10.3628M12.886 8.92181V12.7848L15.553 14.0238'
        stroke={stroke}
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
