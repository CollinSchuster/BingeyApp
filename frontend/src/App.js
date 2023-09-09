import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header.jsx';
import Dashboard from './pages/Dashboard';
import BookmarkPage from "./components/bookmarkPage";
import Login from './pages/Login';
import Main from "./components/mainPage";
import Register from './pages/Register';
import AnimeItem from "./components/AnimeItem";
import Gallery from "./components/Gallery";
import SearchPage from "./components/searchPage";
import Navbar from "./components/navbar";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import ChatPage from './components/chat/chatPage.js'
import Welcome from "./components/chat/Welcome";
import ChatArea from "./components/chat/chatArea";
import Users from "./components/chat/Users";
import CreateGroups from "./components/chat/CreateGroups";
import Groups from "./components/chat/Groups";

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/login' element={<><Header /><Login /></>}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/home' element={<><Header /><Navbar /></>} />
            <Route path='/bookmarks' element={<><Header /><BookmarkPage /><Navbar /></>} />
            <Route path="/browse" element={<><Navbar /><SearchPage /></>} />
            <Route path="/messages" element={<ChatPage />}>
              <Route path="welcome" element={<Welcome />}></Route>
              <Route path="chat/:_id" element={<ChatArea />}></Route>
              <Route path="users" element={<Users />}></Route>
              <Route path="groups" element={<Groups />}></Route>
              <Route path="create-groups" element={<CreateGroups />}></Route>
            </Route>
            <Route path="/anime/:id" element={<AnimeItem />} />
            <Route path="/character/:id" element={<Gallery />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
