import Whiteboard from "../lib/components/Whiteboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Collaborative Classroom Tool</h1>
      <div className="whiteboard-container">
        <Whiteboard />
      </div>
    </div>
  );
}

export default App;
