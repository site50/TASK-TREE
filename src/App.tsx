import './App.css'
import { Routes, Route, Link, BrowserRouter as Router, } from "react-router-dom";
import Tree from './component/tree/Tree';

function App() {
  return (
    <>
      <Router>
        <div>
          <nav>
            <span>
              <Link to="/"><h2>GENEALOGICAL TREE</h2></Link>
            </span>
          </nav>
          <Routes>
            <Route path="/" element={<Tree />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
