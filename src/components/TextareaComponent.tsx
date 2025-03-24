interface TextareaComponentProps {
  placeHolder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaComponent = ({
  placeHolder,
  onChange,
  value,
}: TextareaComponentProps) => {
  return (
    <textarea
      className="h-30 w-full border border-green px-2 bg-gray rounded-lg focus:outline-none  "
      placeholder={placeHolder}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextareaComponent;
