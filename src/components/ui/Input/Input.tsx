import { cloneElement } from 'react';

interface Input {
  icon: any;
  placeholder: string;
}

const Input = ({ icon, placeholder }: Input) => {
  const StyledIcon = icon
    ? cloneElement(icon, { className: 'absolute top-[30%] left-3 w-5 h-5' })
    : null;

  return (
    <div className="relative">
      <input type="text" placeholder={placeholder} className="px-10 w-full" />
      {StyledIcon}
    </div>
  );
};

export default Input;
