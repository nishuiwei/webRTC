import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IntroductionPage from './pages/IntroductionPage/IntroductionPage';
import JoinRoomPage from './pages/JoinRoomPage/JoinRoomPage';
import RoomPage from './pages/RoomPage/RoomPage';
import { connectWithScoketIOServer } from './utils/wss';

function App() {
  useEffect(() => {
    connectWithScoketIOServer()
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/join-room" element={<JoinRoomPage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/" element={<IntroductionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
