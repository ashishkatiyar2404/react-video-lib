import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import SideBar from "./Components/SideBar/SideBar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="bottom__container">
        <SideBar />
      </div>
    </div>
  );
}

export default App;
