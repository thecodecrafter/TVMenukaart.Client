import { MouseEventHandler } from "react";

type IconProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  active?: boolean;
  handleClick?: MouseEventHandler<SVGSVGElement>;
};

function IconAddMenu(props: IconProps) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.handleClick}
    >
      <path
        d="M17 0.333333C26.2046 0.333333 33.6666 7.79525 33.6666 17C33.6666 26.2047 26.2046 33.6667 17 33.6667C7.79523 33.6667 0.333313 26.2047 0.333313 17C0.333313 7.79525 7.79523 0.333333 17 0.333333ZM17 8.66667C16.1452 8.66667 15.4408 9.31006 15.3445 10.139L15.3333 10.3333V15.3333H10.3333C9.41285 15.3333 8.66665 16.0795 8.66665 17C8.66665 17.8548 9.31005 18.5592 10.1389 18.6555L10.3333 18.6667H15.3333V23.6667C15.3333 24.5872 16.0795 25.3333 17 25.3333C17.8547 25.3333 18.5592 24.69 18.6554 23.861L18.6666 23.6667V18.6667H23.6666C24.5871 18.6667 25.3333 17.9205 25.3333 17C25.3333 16.1453 24.6899 15.4408 23.861 15.3445L23.6666 15.3333H18.6666V10.3333C18.6666 9.41285 17.9205 8.66667 17 8.66667Z"
        fill="#09244B"
      />
    </svg>
  );
}

export default IconAddMenu;
