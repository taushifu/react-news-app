import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App = () => {
  const pageSize = 9;

  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0);

  return (
    <div style={{ position: 'relative' }}>
      <Router>
        <div>
          <Navbar />
          <div>
            <LoadingBar
              color='#f11946'
              progress={progress}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
            />
          </div>
        </div>
        <Routes>
          <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} category="general" />}></Route>

          <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} category="business" />}></Route>

          <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} category="entertainment" />}></Route>

          <Route exact path="/general" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} category="general" />}></Route>

          <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} category="health" />}></Route>

          <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} category="science" />}></Route>

          <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} category="sports" />}></Route>

          <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} category="technology" />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App