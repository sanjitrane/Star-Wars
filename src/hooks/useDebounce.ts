import { useCallback, useRef } from "react"

export const useDebounce = <T extends (...args: any[]) => void>(
  fn: T, 
  delay: number, 
  immediate = false
) => {
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const debounce = useCallback(function(this:any, ...args: Parameters<T>){
    const context = this;
    const callNow = immediate && !timerId.current;
    if(timerId.current){
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(()=>{
      timerId.current = null;
      if(!immediate){
        fn.apply(context, args)
      }
    }, delay)

    if(callNow){
      fn.apply(context, args)
    }
  },[fn, delay, immediate])

  return debounce;
}