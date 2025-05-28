import { useEffect, useRef, useState } from "react";
import { useApiEndpointContext } from "../context/useApiEndpointContext";
import { DeviceCodeService } from "../service/DeviceCodeService";

const OTP_LENGTH = 5;

export const VerifyContainer = () => {
  const apiUrl = useApiEndpointContext();
  const service = new DeviceCodeService(apiUrl);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (otp.every((char) => char !== "")) {
      handleSubmit(otp.join(""));
    }
  }, [otp]);

  const handleSubmit = (code: string) => {
    console.log("Submitted OTP:", code);
    if (code.trim().length < 5) return;

    service
      .verify(code)
      .then((res) => {
        console.log("code is verified", res);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        console.log("Something went wrong", err);
      });
  };

  const handleChange = (value: string, index: number) => {
    const char = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    if (char && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft") {
      if (index > 0) inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight") {
      if (index < OTP_LENGTH - 1) inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData
      .getData("text")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");
    const newOtp = paste.split("").slice(0, OTP_LENGTH);
    const updatedOtp = [...otp];
    for (let i = 0; i < newOtp.length; i++) {
      updatedOtp[i] = newOtp[i];
    }
    setOtp(updatedOtp);
    if (newOtp.length < OTP_LENGTH) {
      inputsRef.current[newOtp.length]?.focus();
    } else {
      inputsRef.current[OTP_LENGTH - 1]?.focus();
    }
    e.preventDefault();
  };

  return (
    <div className="flex flex-1 flex-col items-center h-full justify-center bg-[#000] text-[#000]">
      <h1 className="text-[#FFF] text-5xl font-normal">Voer je code in:</h1>
      <div className="flex space-x-3 pt-[2rem]">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(el) => (inputsRef.current[index] = el)}
            className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg text-xl font-bold focus:outline-none focus:border-blue-500 uppercase"
          />
        ))}
      </div>
      <p className="text-[#FFF]">{errorMessage}</p>
    </div>
  );
};
