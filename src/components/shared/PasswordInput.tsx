import { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

export function PasswordInput() {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="relative">
      <InputGroup>
        <InputGroupInput
          value={value}
          onChange={handleChange}
          type={isOpen ? "text" : "password"}
          placeholder="Password"
          name="password"
        />
        <InputGroupAddon align="inline-end">
          <div
            onClick={handleClick}
            className="absolute top-1 right-2 cursor-pointer select-none height"
          >
            {isOpen ? <Eye /> : <EyeOff />}
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
