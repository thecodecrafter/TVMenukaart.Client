import { MouseEventHandler } from "react";

type IconProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  active?: boolean;
  handleClick?: MouseEventHandler<SVGSVGElement>;
};

function IconScreens(props: IconProps) {
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
        d="M11 5C11 3.89543 10.1046 3 9 3H5C3.89543 3 3 3.89543 3 5V9C3 10.1046 3.89543 11 5 11H9C10.1046 11 11 10.1046 11 9V5ZM21 5C21 3.89543 20.1046 3 19 3H15C13.8954 3 13 3.89543 13 5V9C13 10.1046 13.8954 11 15 11H19C20.1046 11 21 10.1046 21 9V5ZM9 13C10.1046 13 11 13.8954 11 15V19C11 20.1046 10.1046 21 9 21H5C3.89543 21 3 20.1046 3 19V15C3 13.8954 3.89543 13 5 13H9ZM13 17C13 16.4477 13.4477 16 14 16H16V14C16 13.4477 16.4477 13 17 13C17.5523 13 18 13.4477 18 14V16H20C20.5523 16 21 16.4477 21 17C21 17.5523 20.5523 18 20 18H18V20C18 20.5523 17.5523 21 17 21C16.4477 21 16 20.5523 16 20V18H14C13.4477 18 13 17.5523 13 17Z"
        fill="#09244B"
      />
    </svg>
  );
}

export default IconScreens;
