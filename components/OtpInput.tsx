import React, { useRef, useState } from 'react';

interface Props {
  otpValue: string;
  setOtpValue: React.Dispatch<React.SetStateAction<string>>;
  numberOfInputs: number;
}

export const OtpInput = (props: Props) => {
  const { otpValue, setOtpValue, numberOfInputs = 5 } = props;
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [inputValues, setInputValues] = useState<Array<number | undefined>>(
    new Array(numberOfInputs).fill(undefined)
  );

  const numberChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newInputValues = [...inputValues];
    if (e.target.value.length === 1) {
      newInputValues[index] = Number(e.target.value);
      setInputValues(newInputValues);
      const cleanedValues = newInputValues.filter(
        value => value === 0 || (value && !isNaN(value))
      );
      const calculatedOtp = cleanedValues.join('');
      setOtpValue(calculatedOtp);
      inputRefs.current[index]?.blur();
      inputRefs.current[index + 1]?.focus();
    } else if (e.target.value.length < 7) {
      const isCurrentInputFocused =
        inputRefs.current[index] === document.activeElement;
      const isCurrentInputValueExists = inputRefs.current?.[index]?.value;
      const targetValue = e.target.value.toString().split('');
      for (let i = 0; i < targetValue.length; i++) {
        newInputValues[index + i] = Number(targetValue[i]);
        inputRefs.current[index + i]?.blur();
      }
      const removeChar = (str: string, index: number) => {
        return str.slice(0, index) + str.slice(index + 1);
      };

      setInputValues(newInputValues);
      if (otpValue.length > 0) {
        if (isCurrentInputFocused && isCurrentInputValueExists) {
          setOtpValue(prev => {
            const prevValCopy = prev;
            const cleanedPrevValue = removeChar(prevValCopy, index);
            return cleanedPrevValue + targetValue.join('');
          });
        } else {
          setOtpValue(prev => prev + targetValue.join(''));
        }
      } else {
        setOtpValue(targetValue.join(''));
      }
    } else {
      alert('Pasted OTP exceeds 6 digits');
    }
  };

  const numberKeyDownHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const key = e.key;
    if (key === 'Backspace' || key === 'Delete') {
      e.preventDefault();
      const newInputValues = [...inputValues];
      newInputValues[index] = Number(undefined);
      setInputValues(newInputValues);
      const cleanedValues = newInputValues.filter(
        value => value && !isNaN(value)
      );
      const calculatedOtp = cleanedValues.join('');
      setOtpValue(calculatedOtp);
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        inputRefs.current[index]?.blur();
      }
    }

    if (key === 'ArrowLeft') {
      inputRefs.current[index - 1]?.focus();
    }

    if (key === 'ArrowRight') {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px 0',
      }}
    >
      {Array.from(Array(numberOfInputs)).map((_, index) => (
        <input
          key={index}
          style={{
            border: 'none',
            borderBottom: '2px solid #ddd',
            padding: '10px',
            width: '80px',
            textAlign: 'center',
            fontSize: '18px',
            marginRight: '10px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
          className='focus:border-green-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          value={inputValues[index]}
          onChange={e => numberChangeHandler(e, index)}
          onKeyDown={e => numberKeyDownHandler(e, index)}
          maxLength={1}
          type='number'
          pattern='[0-9]*'
          inputMode='numeric'
          ref={el => {
            inputRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
};
