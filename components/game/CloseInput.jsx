import React, { useEffect, useState, useRef } from "react";
import { TableCell, TextField } from "@mui/material";
const CloseInput = ({ resultString, sourceString, id, handleInputChange }) => {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [disable, setDisabled] = useState([false, false, false, false]);
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) && value.length === 1) {
      const newValues = [...otpValues];
      newValues[index] = value;
      setOtpValues(newValues);

      // Focus the next text field after the user enters a number
      if (index < otpValues.length - 1) {
        refs[index + 1].current.focus();
      }
    } else if (value.length === 0) {
      const newValues = [...otpValues];
      newValues[index] = "";
      setOtpValues(newValues);

      // Focus the previous text field after the user erases a number
      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };
  useEffect(() => {
    if (
      `${otpValues[0]}${otpValues[1]}${otpValues[2]}-${otpValues[3]}` !=
      sourceString
    ) {
      handleInputChange(false, otpValues, id);
    }
  }, [otpValues]);
  useEffect(() => {
    let resultArray = [];
    let otp = [];
    console.log(resultString);
    for (let i = 0; i < resultString.length; i++) {
      if (sourceString.charAt(i) === "*") {
        resultArray.push(false);
        otp.push(resultString.charAt(i));
      } else if (
        sourceString.charAt(i) != "-" &&
        sourceString.charAt(i) != "*"
      ) {
        resultArray.push(true);
        otp.push(resultString.charAt(i));
      }
    }
    setDisabled(resultArray);
    setOtpValues(otp);
  }, [resultString]);

  return (
    <TableCell align="center">
      {otpValues.map((value, index) => (
        <React.Fragment key={index}>
          <TextField
            value={value}
            sx={{
              width: "36px",
              height: "30px",
              marginRight: index === 0 ? "1rem" : "0.5rem",
              padding: 0,
              borderBottom: 0, // Set bottom border to 0
            }}
            disabled={disable[index]}
            onChange={(e) => handleChange(e, index)}
            type="text"
            inputProps={{
              padding: 0,
              maxLength: 1,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            inputRef={refs[index]}
          />
        </React.Fragment>
      ))}
    </TableCell>
  );
};

export default CloseInput;
