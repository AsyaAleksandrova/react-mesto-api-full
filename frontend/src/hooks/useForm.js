import { useState } from 'react';

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    setValues(event.target.value);
  };
  return [values, setValues, handleChange];
}

// Извините, у меня не получается сделать как в рекомендации. 
// При попытке подставить первоначальые значения возикают ошибки компиляции.
// К наставнику пробовала обратиться, легче не стало
// Если поделитесь ссылками, где можно почитать подробнее, буду очень благодарна