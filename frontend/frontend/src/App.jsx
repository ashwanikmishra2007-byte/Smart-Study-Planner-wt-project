import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Subjects from "./pages/Subjects"
//importing different components from different files

function App() {
  //Routing different components
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
            </>
          }
        />
        <Route path="/subject" element={<Subjects/>} />
      </Routes>
    </div>
  );
}

export default App;