import { Route, Routes } from "react-router-dom";
import Compose from "./Components/Profile/Compose";
import RootLayout from "./Components/Layout/root";
import Authentication from "./Components/Authentication/Authentication";
import Root2Layout from "./Components/Layout/root2";
import Inbox from "./Components/Profile/inbox";
import EmailMessage from "./Components/Profile/EmailMessage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { inboxItemFill } from "./Store/inbox-slice";
import SentEmail from "./Components/Profile/SentEmail";
import { SentEmailItemFill } from "./Store/sentEmail-slice";
import SentemailMessage from "./Components/Profile/SentemailMessage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const fetchEmailData = () => {
    if (localStorage.getItem("userEmail")) {
      dispatch(inboxItemFill(localStorage.getItem("userEmail")));
      dispatch(SentEmailItemFill(localStorage.getItem("userEmail")));
    }
  };

  useEffect(() => {
    fetchEmailData();
    const interval = setInterval(fetchEmailData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Authentication />} />
          {auth.isLoggedIn && (
            <Route path="/profile" element={<Root2Layout />} exact>
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
