import { Route, Routes } from "react-router-dom";
import Compose from "./Components/Profile/Compose";
import RootLayout from "./Components/Layout/root";
import Authentication from "./Components/Authentication/Authentication";
import RootLayout2 from "./Components/Layout/root2";
import Inbox from "./Components/Profile/inbox";
import EmailMessage from "./Components/Profile/EmailMessage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { inboxItemFill } from "./Store/inbox-slice";
import SentEmail from "./Components/Profile/SentEmail";
import { SentEmailItemFill } from "./Store/sentEmail-slice";
import SentemailMessage from "./Components/Profile/SentemailMessage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(inboxItemFill(localStorage.getItem("userEmail")));
    dispatch(SentEmailItemFill(localStorage.getItem("userEmail")));
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Authentication />} />

          <Route path="/profile" element={<RootLayout2 />} exact>
            <Route path="/profile/compose" element={<Compose />} exact />
            <Route path="/profile/inbox" element={<Inbox />} exact />
            <Route
              path="/profile/inbox/message"
              element={<EmailMessage />}
              exact
            />
            <Route path="/profile/sentemail" element={<SentEmail />} />
            <Route
              path="/profile/sentemail/message"
              element={<SentemailMessage/>}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
