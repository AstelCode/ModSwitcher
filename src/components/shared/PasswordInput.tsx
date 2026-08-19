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
      <Input
        value={value}
        onChange={handleChange}
        type={isOpen ? "text" : "password"}
        placeholder="Password"
        name="password"
      />
      <div
        onClick={handleClick}
        className="absolute top-1 right-2 cursor-pointer select-none"
      >
        {isOpen ? <Eye /> : <EyeOff />}
      </div>
    </div>
  );
}
