import { useEffect, useRef } from 'react';

const useScrollListen = (callback: () => void) => {
  // useEffect(() => {
  //   let time: NodeJS.Timeout
  //   let startTime: Date = new Date()
  //   const handleCallBack = () => {
  //     const { scrollY } = window
  //     const { clientHeight, scrollHeight } = document.documentElement
  //     if (clientHeight + scrollY >= scrollHeight - 60) {
  //       callback()
  //     }
  //   }
  //   // TODO:优化监听
  //   // requestAnimationFrame()
  //   const throttle = () => {
  //     clearTimeout(time)
  //     const currentTime: Date = new Date()
  //     if (Number(currentTime) - Number(startTime) >= mustTime) {
  //       // 规定时间内必须执行一次
  //       handleCallBack()
  //       startTime = currentTime
  //     } else
  //       time = setTimeout(() => {
  //         // 防抖动
  //         handleCallBack()
  //       }, waitTime)
  //   }

  //   window.addEventListener('scroll', throttle)
  //   return () => {
  //     window.removeEventListener('scroll', throttle)
  //   }
  // }, [callback, mustTime, waitTime])
  useEffect(() => {
    const doing = useRef(false);

    const handleCallBack = () => {
      const { scrollY } = window;
      const { clientHeight, scrollHeight } = document.documentElement || document.body;
      if (clientHeight + scrollY >= scrollHeight - 60) {
        callback();
      }
      doing.current = false;
    };
    const rafCallback = () => {
      if (doing.current) return;
      doing.current = true;
      window.requestAnimationFrame(handleCallBack);
    };

    window.addEventListener('scroll', rafCallback);

    return () => {
      window.removeEventListener('scroll', rafCallback);
    };
  }, [callback]);
};

export default useScrollListen;
