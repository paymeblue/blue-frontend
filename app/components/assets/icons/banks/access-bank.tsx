import { ComponentProps } from "react";

const AccessBankLogo = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_5650_14377)">
        <path
          d="M10.0725 1.84107L20.4518 12.1937L11.5133 21.1589L2.5481 12.1937L6.87061 7.73782H5.0829L0.707031 12.1937L11.5133 23L22.2929 12.1937L10.1258 0L10.0725 1.84107Z"
          fill="#F57E20"
        />
        <path
          d="M10.1259 7.76431L8.25812 7.73762L3.90894 12.1935L11.5133 19.7713L19.0911 12.1935L10.1259 3.20166L10.0992 4.96268L17.3301 12.1935L11.5133 18.0369L5.72332 12.1935L10.1259 7.76431Z"
          fill="#F57E20"
        />
        <path
          d="M11.4866 9.57903L14.1281 12.1939L11.4866 14.8087L8.84508 12.1939L11.4866 9.57903ZM15.9158 12.1939L11.4866 7.76465L7.05737 12.1939L11.4866 16.6231L15.9158 12.1939Z"
          fill="#F57E20"
        />
      </g>
      <defs>
        <clipPath id="clip0_5650_14377">
          <rect
            width="21.5858"
            height="23"
            fill="white"
            transform="translate(0.707031)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AccessBankLogo;
