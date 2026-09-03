import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Subjects from "./pages/Subjects";
import View from "./pages/View";
import Update from "./pages/Update";
//importing different components from different files

function App() {
  //Routing different components
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
            </>
          }
        />
        <Route path="/subject" element={<Subjects/>} />
        <Route path="/view" element={<View/>}/>
        <Route path="/update" element={<Update/>}/>
      </Routes>
    </div>
  );
}

export default App;