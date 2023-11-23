const CloseIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="32.5"
        cy="32.5"
        r="31.4844"
        fill="white"
        stroke="#E5E6E8"
        strokeWidth="2.03125"
      />
      <path
        d="M22.3438 42.6562L42.6562 22.3438"
        stroke="#232949"
        strokeWidth="2.86765"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.3438 22.3438L42.6562 42.6562"
        stroke="#232949"
        strokeWidth="2.86765"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
