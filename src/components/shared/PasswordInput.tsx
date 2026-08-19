import { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

export function PasswordInput() {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="relative">
      {isOpen ? (
        <Input
          value={value}
          onChange={handleChange}
          type="text"
          placeholder="Password"
          name="password"
        />
      ) : (
        <Input
          value={value}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          name="password"
        />
      )}
      <div
        onClick={handleClick}
        className="absolute top-1 right-2 cursor-pointer select-none"
      >
        {isOpen ? <Eye /> : <EyeOff />}
      </div>
    </div>
  );
}
