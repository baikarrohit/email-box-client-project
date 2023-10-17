import { Route, Routes } from "react-router-dom";
import Compose from "./Components/Profile/Compose";
import RootLayout from "./Components/Layout/root";
import Authentication from "./Components/Authentication/Authentication";
import RootLayout2 from "./Components/Layout/root2";
import Inbox from "./Components/Profile/inbox";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Authentication />} />
        <Route path="/" element={<RootLayout />}>
          <Route path="/profile" element={<RootLayout2 />} exact>
            <Route path="/profile/compose" element={<Compose />} />
            <Route path="/profile/inbox" element={<Inbox />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
