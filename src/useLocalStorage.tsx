// custom hook: Hooks that function similar to react hooks but are created by us according to the project requirements.

import { useEffect, useState } from 'react';

// adds the sent data to localstorage

export function useLocaleStorage<T>(key: string, initialValue: T) {
 // state is defined
  const [value, setValue] = useState(() => {
   // get data from local
    const jsonValue = localStorage.getItem(key);

    if (jsonValue === null) {
     // we determine the initial value of the element we will add to the local
      return initialValue;
    } else {
   // Returns this value if found locally
      return JSON.parse(jsonValue);
    }
  });

  // Update local whenever value changes using useEffect
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Specify values to return components
  return [value, setValue] as [T, typeof setValue];
}