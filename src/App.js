import { Route, Routes } from "react-router-dom";
import Compose from "./Components/Profile/Compose";
import RootLayout from "./Components/Layout/root";
import Authentication from "./Components/Authentication/Authentication";
import Root2Layout from "./Components/Layout/root2";
import Inbox from "./Components/Profile/inbox";
import EmailMessage from "./Components/Profile/EmailMessage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { inboxItemFill } from "./Store/inbox-slice";
import SentEmail from "./Components/Profile/SentEmail";
import { SentEmailItemFill } from "./Store/sentEmail-slice";
import SentemailMessage from "./Components/Profile/SentemailMessage";
import Profile from "./Components/Profile/Profile";
import './App.css';

function App() {
  const dispatch = useDispatch();
  const intervalRef = useRef();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.isLoggedIn) {
      dispatch(inboxItemFill(auth.userEmail));
      dispatch(SentEmailItemFill(auth.userEmail));
    }
  });

  useEffect(() => {
    if (auth.isLoggedIn) {
      dispatch(inboxItemFill(localStorage.getItem("userEmail")));
      dispatch(SentEmailItemFill(localStorage.getItem("userEmail")));
      intervalRef.current = setInterval(() => {
        dispatch(inboxItemFill(localStorage.getItem("userEmail")));
        dispatch(SentEmailItemFill(localStorage.getItem("userEmail")));
        console.log("render");
      }, 2000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [auth.isLoggedIn, dispatch, auth.userEmail]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Authentication />} />
          {auth.isLoggedIn && (
            <Route path="/profile" element={<Root2Layout />} exact>
              <Route index element={<Profile/>}/>
              <Route path="/profile/compose" element={<Compose />} exact />
              <Route path="/profile/inbox" element={<Inbox />} exact />
              <Route
                path="/profile/inbox/message"
                element={<EmailMessage />}
                exact
              />
              <Route path="/profile/sentemail" element={<SentEmail />} exact />
              <Route
                path="/profile/sentemail/message"
                element={<SentemailMessage />}
                exact
              />
            </Route>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
