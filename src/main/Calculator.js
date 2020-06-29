import React, { useState } from 'react';
import './Calculator.css';

import Button from '../components/Button/index';
import Display from '../components/Display/index';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default () => {
  const [attributes, setAttributes] = useState(initialState);

  function clearMemory() {
    setAttributes(initialState);
  }

  function setOperation(operation) {
    if (attributes.current === 0) {
      setAttributes({
        ...attributes,
        operation,
        clearDisplay: true,
        current: 1,
      });
    } else {
      const equals = operation === '=';
      const currentOperation = attributes.operation;

      const values = [...attributes.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = attributes.values[0];
      }
      values[1] = 0;

      setAttributes({
        displayValue: values[0],
        clearDisplay: !equals,
        operation: equals ? null : operation,
        values,
        current: equals ? 0 : 1,
      });
    }
  }

  function addDigit(n) {
    if (n === '.' && attributes.displayValue.includes('.')) {
      return;
    }

    const clearDisplay =
      attributes.displayValue === '0' || attributes.clearDisplay;

    const currentValue = clearDisplay ? '' : attributes.displayValue;

    const displayValue = currentValue + n;

    const newAttributes = {
      ...attributes,
      displayValue,
      clearDisplay: false,
    };

    if (n !== '.') {
      const i = attributes.current;
      const values = [...attributes.values];
      values[i] = parseFloat(displayValue);
      newAttributes.values = values;
    }

    setAttributes(newAttributes);

    return;
  }

  return (
    <div className="calculator">
      <Display value={attributes.displayValue} />
      <Button label="AC" click={() => clearMemory()} classButton="triple" />
      <Button
        label="/"
        click={() => setOperation('/')}
        classButton="operation"
      />
      <Button label="7" click={() => addDigit('7')} />
      <Button label="8" click={() => addDigit('8')} />
      <Button label="9" click={() => addDigit('9')} />
      <Button
        label="*"
        click={() => setOperation('*')}
        classButton="operation"
      />
      <Button label="4" click={() => addDigit('4')} />
      <Button label="5" click={() => addDigit('5')} />
      <Button label="6" click={() => addDigit('6')} />
      <Button
        label="-"
        click={() => setOperation('-')}
        classButton="operation"
      />
      <Button label="1" click={() => addDigit('1')} />
      <Button label="2" click={() => addDigit('2')} />
      <Button label="3" click={() => addDigit('3')} />
      <Button
        label="+"
        click={() => setOperation('+')}
        classButton="operation"
      />
      <Button label="0" click={() => addDigit('0')} classButton="double" />
      <Button label="." click={() => addDigit('.')} />
      <Button
        label="="
        click={() => setOperation('=')}
        classButton="operation"
      />
    </div>
  );
};
