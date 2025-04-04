import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
