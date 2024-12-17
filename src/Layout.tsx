import React, { lazy, Suspense } from 'react';
import { useResponsive } from './hooks/useResponsive';
import EpisodeList from './features/Episodes/EpisodesList';
import { Shimmer } from './components/UI/Shimmer/Shimmer';


const Details = lazy(()=>import("./components/DetailView/DetailView"));

const Layout = ()=>{
const {isTablet, isDesktop} = useResponsive()
return(
  <>
  <EpisodeList/>
  {
    (isDesktop) && <Suspense fallback={<Shimmer lines={4}/>}>
      <Details/>
    </Suspense>
  }
  
  </>
)
}

export default Layout;