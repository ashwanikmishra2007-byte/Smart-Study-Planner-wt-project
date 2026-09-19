import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Subjects from "./pages/Subjects";
import View from "./pages/View";
import Update from "./pages/Update";
import Track from "./pages/Track";
import Schedule from "./pages/Schedule";
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
        <Route path="/track" element={<Track/>}/>
        <Route path="/schedule" element={<Schedule/>}/>
      </Routes>
    </div>
  );
}

export default App;