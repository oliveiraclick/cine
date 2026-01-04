import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import CreateReview from './pages/CreateReview';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Indications from './pages/Indications';
import InviteTree from './pages/InviteTree';
import InviteFriends from './pages/InviteFriends';
import EditProfile from './pages/EditProfile';
import ReviewDetails from './pages/ReviewDetails';
import LikesList from './pages/LikesList';
import SettingsPage from './pages/Settings';
import Achievements from './pages/Achievements';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/indications" element={<Indications />} />
        <Route path="/watchlist" element={<Profile />} />
        <Route path="/tree" element={<InviteTree />} />
        <Route path="/invite" element={<InviteFriends />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/review/:id" element={<ReviewDetails />} />
        <Route path="/likes" element={<LikesList />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </Router>
  );
}

export default App;
