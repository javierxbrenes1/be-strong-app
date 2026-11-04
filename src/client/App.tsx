import { ToastContainer } from 'react-toastify';
import { useColorScheme } from '@mui/material/styles';
import AppRoutes from './AppRoutes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { mode } = useColorScheme();
  return (
    <div className="App">
      <AppRoutes />
      <ToastContainer theme={mode === 'dark' ? 'dark' : 'light'} />
    </div>
  );
}

export default App;
