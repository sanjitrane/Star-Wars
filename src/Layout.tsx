/**
 * To host the list view and based on the viewport host the Details
 * To show the details on the right hand side in tablet view, consume isTablet from useResponsive hook
 * and add in the conditional rendering (isDesktop || isTablet )
 */

import React, { lazy, Suspense } from 'react';
import { useResponsive } from './hooks/useResponsive';
import EpisodeList from './features/Episodes/EpisodesList';
import { Shimmer } from './components/UI/Shimmer/Shimmer';


const Details = lazy(()=>import("./components/DetailView/DetailView"));

const Layout = ()=>{
const {isDesktop} = useResponsive()
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