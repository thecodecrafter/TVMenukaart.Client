import { MouseEventHandler } from "react";

type IconProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  active?: boolean;
  handleClick?: MouseEventHandler<SVGSVGElement>;
};

function IconPlus(props: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.handleClick}
    >
      <path
        d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM10 5C9.48715 5 9.06449 5.38604 9.00673 5.88338L9 6V9H6C5.44772 9 5 9.4477 5 10C5 10.5128 5.38604 10.9355 5.88338 10.9933L6 11H9V14C9 14.5523 9.4477 15 10 15C10.5128 15 10.9355 14.614 10.9933 14.1166L11 14V11H14C14.5523 11 15 10.5523 15 10C15 9.48715 14.614 9.06449 14.1166 9.00673L14 9H11V6C11 5.44771 10.5523 5 10 5Z"
        fill="#09244B"
      />
    </svg>
  );
}

export default IconPlus;
