import { MouseEventHandler } from "react";

type IconProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  active?: boolean;
  handleClick?: MouseEventHandler<SVGSVGElement>;
};

function IconAccount(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.handleClick}
    >
      <path
        d="M16 14C17.2885 14.0001 18.5272 14.4975 19.4578 15.3887C20.3884 16.2798 20.9391 17.4958 20.995 18.783L21 19V20C21.0002 20.5046 20.8096 20.9906 20.4665 21.3605C20.1234 21.7305 19.6532 21.9572 19.15 21.995L19 22H5C4.49542 22.0002 4.00943 21.8096 3.63945 21.4665C3.26947 21.1234 3.04284 20.6532 3.005 20.15L3 20V19C3.00007 17.7115 3.49754 16.4728 4.38866 15.5422C5.27978 14.6116 6.49575 14.0609 7.783 14.005L8 14H16ZM12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7C17 8.32608 16.4732 9.59785 15.5355 10.5355C14.5979 11.4732 13.3261 12 12 12C10.6739 12 9.40215 11.4732 8.46447 10.5355C7.52678 9.59785 7 8.32608 7 7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2Z"
        fill="#09244B"
      />
    </svg>
  );
}

export default IconAccount;
