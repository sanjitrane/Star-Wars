import { useEffect, useState } from "react"
import { useDebounce } from "./useDebounce";

export const useResponsive = ()=>{
  const [state, setState] = useState({
    isMobile:false,
    isTablet:false,
    isDesktop: false
  });

  useEffect(()=>{
    onResizeHandler();
    setUp();

    return ()=>{
      cleanup()
    }
  },[])

  const onResizeHandler = ()=>{
    const isMobile = window.innerWidth <=768;
    const isTablet = window.innerWidth >=768 && window.innerWidth <=990;
    const isDesktop = window.innerWidth > 990;
    setState({isMobile, isTablet, isDesktop})
  }

  const debouncedCall = useDebounce(onResizeHandler, 500);

  const setUp = ()=>{
    window.addEventListener("resize", debouncedCall, false);
  }

  const cleanup = ()=>{
    window.removeEventListener("resize", debouncedCall, false);
  }

  return state;
}