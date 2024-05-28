import { omit } from "ramda";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
  className?: string;
  text?: string;
  primary?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
  let classes = props.className || "";
  classes += " font-bold py-1 px-4 rounded";
  if (props.primary) {
    classes += " bg-blue-500 hover:bg-blue-700 text-white";
  } else {
    classes += " bg-gray-500 hover:bg-gray-700 text-white";
  }

  props = omit(["primary", "className"], props);

  return (
    <button {...props} className={classes}>
      {text}
    </button>
  );
};
