// SearchInput.tsx
import React from "react";
import { SearchIcon } from "./Icons";

type SearchInputProps = {
  placeholder?: string;
  value: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({
  placeholder,
  value,
  onChange,
  className,
}: SearchInputProps) => {
  return (
    <div
      className={`${className} border-gainsboro flex gap-2 overflow-hidden rounded-full border`}
    >
      <input
        className="text-antiflash h-12 grow bg-transparent px-4 outline-none"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <span className="bg-primary flex h-auto w-10 items-center justify-center rounded-r-full">
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchInput;
