import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { receiveInitialData } from './actions/initialData';
import Navbar from './components/Navbar';
import PrivateWrapper from './components/PrivateWrapper';
import Error404 from './components/Error404';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import NewPoll from './components/NewPoll';
import Poll from './components/Poll';

const App = ({ dispatch }) => {
  useEffect(() => {
    dispatch(receiveInitialData());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className=" container mx-auto">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/add" element={<NewPoll />} />
          <Route path="/questions/:id" element={<Poll />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default connect()(App);
