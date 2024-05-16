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
import Dictionary from "./view/admin/editor/dictionary";
import Practice from "./view/admin/editor/practice";
import RequestPublish from "./view/admin/editor/request";
import Feedback from "./view/admin/expert/feedback";
import {HandbookContent, DictionaryContent} from "./view/admin/editor/content";
import Test from "./view/admin/editor/test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/admin/user/performance" element={<UserPerformance/>}/>
        <Route path="/admin/user/performance/score" element={<TestScore/>}/>
        <Route path="/editor/handbook" element={<Handbook/>}/>
        <Route path="/editor/handbook/dictionary" element={<Dictionary/>}/>
        <Route path="/editor/dictionary/content" element={<DictionaryContent/>}/>
        <Route path="/editor/practice" element={<Practice/>}/>
        <Route path="/editor/practice/test" element={<Test/>}/>
        <Route path="/editor/request" element={<RequestPublish/>}/>
        <Route path="/editor/handbook/content" element={<HandbookContent/>}/>
        <Route path="/expert/feedback" element={<Feedback/>}/>
        <Route path="/logs" element={<Log/>}/>
        <Route path="/admin/account/view" element={<AccountView/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
