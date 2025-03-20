import './App.css';
import MyFirstComponent from './components/MyFirstComponent';
import Form from './components/Form/Form';
import Profile from "./components/Profile";
import { UserContextProvider } from './context/user-context';

function App() {
  return (
    <div className="App">
      <MyFirstComponent />

      <UserContextProvider>
        <Form />
        <Profile />
      </UserContextProvider>

    </div>
  );
}

export default App;
