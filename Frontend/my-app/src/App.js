import "./App.css";
import BackDashBoard from "./components/BackDashBoard/BackDashBoard";
import { UsersContextProvider } from "./Context/usersContext";

function App() {
  return (
    <div className="">
      <UsersContextProvider>  
        <BackDashBoard />
      </UsersContextProvider>   

    </div>
  );
}

export default App;
