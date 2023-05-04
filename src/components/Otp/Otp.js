import React, { useState, useRef, useEffect } from "react";
import { BsArrowRight } from 'react-icons/bs';
import { FiSmartphone } from 'react-icons/fi';
import "./Otp.css";

const Otp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const inputRefs = useRef([]);


  useEffect(() => {
    // Focus on first input when popup is opened
    if (showPopup) {
      inputRefs.current[0].focus();
    }
  }, [showPopup]);

  const handleInput = (index, event) => {
    const { value } = event.target;
    setErrorMessage("");
    // Only allow numeric values
    if (value.match(/^\d*$/)) {
      const otpCopy = [...otp];
      otpCopy[index] = value;
      setOtp(otpCopy);
      // Move focus to next input
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      // Move focus to previous input and delete its value
      inputRefs.current[index - 1].focus();
      const otpCopy = [...otp];
      otpCopy[index - 1] = "";
      setOtp(otpCopy);
    } else if (event.key.includes("Arrow")) {
      // Move focus to previous/next input based on arrow key
      if (event.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1].focus();
      } else if (event.key === "ArrowRight" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (event.key === "Enter") {
      // Submit OTP
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const enteredOTP = otp.join("");
    if (enteredOTP.length !== otp.length) {
      setErrorMessage("Please enter all digits");
    } else if (enteredOTP !== "123456") {
      setErrorMessage("Incorrect OTP");
    } else {
      setShowPopup(false);
      setOtp(["", "", "", "", "", ""]);
      setErrorMessage("");
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData("Text");
    const otpCopy = [...otp];
    // Only paste up to 6 digits
    const newOTP = clipboardData.substring(0, otp.length).split("");
    newOTP.forEach((digit, i) => {
      if (digit.match(/^\d*$/)) {
        otpCopy[i] = digit;
      }
    });
    setOtp(otpCopy);
  };

  return (
    <div className="outside-container">
      <div class="container">
        <div class="phone-icon-container">
          <p>OTP Verification</p>
        <FiSmartphone className="phone-icon"/>
        </div>
        <div class="inner-container">
          <div class="phone-container">
            <input type="text" placeholder="Enter your mobile number" onChange={(e) => setPhoneNumber(e.target.value)} />
            <p>We will send you one time password OTP</p>
            <p>Press the below button</p>
          </div>
          <button onClick={() => setShowPopup(true)}><BsArrowRight className="icon-button"/></button>
        </div>
      </div>
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>Enter OTP</h2>
            <p>Enter the OTP you received on {phoneNumber? phoneNumber : 'XXX-XXX-XXXX'}</p>
            <div className="otp-input-container">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  type="tel"
                  pattern="\d*"
                  inputMode="numeric"
                  value={digit}
                  onChange={(event) => handleInput(i, event)}
                  onKeyDown={(event) => handleKeyDown(i, event
              )}
              onPaste={handlePaste}
              ref={(ref) => (inputRefs.current[i] = ref)}
            />
          ))}
          </div>
          <div className="error-message">{errorMessage}</div>
          <button onClick={handleSubmit}>Verify Phone Number</button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Otp;