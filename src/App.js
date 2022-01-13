import React, {useContext, useEffect} from "react";
import { BrowserRouter, Routes, Route, Redirect, useNavigate } from "react-router-dom";
import Signup from "./containers/signup";
import Signin from "./containers/signin";
import Dashboard from "./containers/dashboard";
import { AuthProvider, AuthContext } from "./ContextAPI/AuthContext";
import { PostProvider } from "./ContextAPI/PostContext";

// import './App.css';

// const ProtectedRoute = ({element: Component, path,  ...rest}) => {
//   const authContext = useContext(AuthContext)
//   console.log("protect route", rest, authContext);
//   // return <Component {...rest}/>
//   return <Route path={path} element={<Component {...rest} />} />;
// }

function PrivateRoute({ children, path, element: Compponent, ...rest }) {
  
  const navigate = useNavigate()
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const auth = true
  useEffect(()=>{
    console.log("protect route isAuthenticated", rest, isAuthenticated);
    if (!isAuthenticated)
      navigate('/signin')
    else
      navigate(path)
  },[])
  
  return children
}

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/signin" element={<PrivateRoute path="/signin"><Signin/></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute path="/dashboard"><Dashboard/></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
