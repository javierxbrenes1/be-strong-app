import { ToastContainer } from 'react-toastify';
import AppRoutes from './AppRoutes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
