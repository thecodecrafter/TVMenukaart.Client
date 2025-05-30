import { MouseEventHandler } from "react";

type IconProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  active?: boolean;
  handleClick?: MouseEventHandler<SVGSVGElement>;
};

function IconLogout(props: IconProps) {
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
        d="M12 2.5C12.8284 2.5 13.5 3.17157 13.5 4C13.5 4.82843 12.8284 5.5 12 5.5H7C6.72386 5.5 6.5 5.72386 6.5 6V18C6.5 18.2761 6.72386 18.5 7 18.5H11.5C12.3284 18.5 13 19.1716 13 20C13 20.8284 12.3284 21.5 11.5 21.5H7C5.067 21.5 3.5 19.933 3.5 18V6C3.5 4.067 5.067 2.5 7 2.5H12ZM18.0606 8.11091L20.889 10.9393C21.4748 11.5251 21.4748 12.4749 20.889 13.0607L18.0606 15.8891C17.4748 16.4749 16.5251 16.4749 15.9393 15.8891C15.3535 15.3033 15.3535 14.3536 15.9393 13.7678L16.207 13.5H12C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5H16.207L15.9393 10.2322C15.3535 9.64645 15.3535 8.6967 15.9393 8.11091C16.5251 7.52513 17.4748 7.52513 18.0606 8.11091Z"
        fill="#09244B"
      />
    </svg>
  );
}

export default IconLogout;
