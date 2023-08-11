import './App.css';
import React from 'react';
import Menu from './components/Menu';
import { AppContext, useAppState } from './service/repository-product';
function App() {
 
  return (
   <AppContext.Provider value={useAppState()}>
   <div className='app-c'>
       <Menu/>
   </div>
   </AppContext.Provider>
  );
}

export default App;
