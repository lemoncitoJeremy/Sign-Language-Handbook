import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
// Uni
import Homepage from "./view/base/homepage"

// Verbal Learners
//import About from "./view/user/about"
//import Learn from "./view/user/learn"

// Admin
import Dashboard from "./view/admin/dashboard"
import Log from "./view/admin/logs"
import AccountView from "./view/admin/admin/accountview";
import UserPerformance from "./view/admin/admin/userPerformance";
import TestScore from "./view/admin/admin/userTestScore";
import Handbook from "./view/admin/editor/handbook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="admin/user/performance" element={<UserPerformance/>}/>
        <Route path="admin/user/performance/score" element={<TestScore/>}/>
        <Route path="editor/handbook" element={<Handbook/>}/>
        <Route path="/logs" element={<Log/>}/>
        <Route path="/admin/account/view" element={<AccountView/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
