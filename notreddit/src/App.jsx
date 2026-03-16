// Importing Dependencies and necessary Components
import { Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage";
import FrontPage from "./pages/FrontPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { HashRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

function App() {

  // Listen for changes in the authentication state
  const { user, loading: authLoading } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage user={user}/>} />
        <Route path="/post/:id" element={<PostPage user={user}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
