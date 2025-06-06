type IconProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  active?: boolean;
  fillColor?: string;
  handleClick?: () => void;
};

function IconClose(props: IconProps) {
  return (
    <svg
      fill={props.fillColor ?? "#FFF"}
      height={props.height ?? "24px"}
      id="Layer_1"
      version="1.1"
      viewBox="0 0 24 24"
      width={props.width ?? "24px"}
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.handleClick}
    >
      <path d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z" />
    </svg>
  );
}

export default IconClose;
