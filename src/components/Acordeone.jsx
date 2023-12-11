import { useState } from "react";

export const Acordeone = (props) => {
  const { children, title, ...otros } = props; // eslint-disable-line react/prop-types
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-5xl w-full mx-auto mt-4 p-1 border-b boder-black flex flex-col justify-center items-end">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-[24px] text-black">{title}</h2>
        <button
          type="button"
          className="bg-blue-500 px-3 py-2 text-white rounded-md flex justify-center items-center"
          onClick={() => toggleAccordion()}>
          {isOpen ? (
            <p className="text-bold text-[24px]">-</p>
          ) : (
            <p className="text-bold text-[24px]">+</p>
          )}
        </button>
      </div>
      <div
        className={`w-full mt-4 p-2 rounded-md transition-all duration-200 ${
          isOpen ? "opacity-100" : "max-h-[0px] opacity-0 -z-10"
        }`}>
        {children}
      </div>
    </div>
  );
};
