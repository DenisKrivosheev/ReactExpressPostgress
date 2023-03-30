import React, {createContext, StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UserStore from './store/userStore';
import DeviceStore from './store/deviceStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import ModerStore from './store/moderStore';

export const Context = createContext(null)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={
    {
      user: new UserStore(),
      device: new DeviceStore(),
      moder : new ModerStore()
    }}>
      <StrictMode>
          <App/>
    </StrictMode>
  </Context.Provider>

);

