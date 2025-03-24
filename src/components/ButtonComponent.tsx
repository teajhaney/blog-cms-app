interface ButtonProps {
  text: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

const ButtonComponent = ({ text, className, onClick, type }: ButtonProps) => {
  return (
    <button
      className={`text-2xl   px-3 py-2 rounded-lg w-fit place-self-end text-white cursor-pointer ${className}`}
      onClick={onClick}
      type={type}>
      {text}
    </button>
  );
};

export default ButtonComponent;
