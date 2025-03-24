interface TextareaComponentProps {
  placeHolder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextareaComponent = ({
  placeHolder,
  onChange,
    value,
  className
}: TextareaComponentProps) => {
  return (
    <textarea
      className={` w-full border border-brown px-2 bg-gray rounded-lg focus:outline-none ${className}`}
      placeholder={placeHolder}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextareaComponent;
