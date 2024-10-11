import React from 'react';
import { Provider } from 'react-redux';
import store from './store'; 
import AppRouter from './AppRouter'; 

function App() {
  return (
    <Provider store={store}> {/* ใช้ Provider เพื่อให้ Redux store สามารถเข้าถึงได้ในทุกคอมโพเนนต์ */}
      <AppRouter />
    </Provider>
  );
}

export default App;
