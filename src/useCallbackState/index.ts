import { useEffect, useRef, useState } from 'react';

const useCallbackState = state => {
  const ref = useRef<any>(null);
  const [data, setData] = useState(state);

  useEffect(() => {
    ref.current && ref.current(data);
  }, [data]);

  return [
    data,
    function (val, callback) {
      ref.current = callback;
      setData(val);
    },
  ];
};

export default useCallbackState;
