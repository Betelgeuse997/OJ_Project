import Register from './components/Register';
import Signin from './components/Signin';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorised from './components/Unauthorised';
import Lounge from './components/Lounge';
import RequireAuth from './components/RequireAuth';
import {Routes,Route} from 'react-router-dom';
import LinkPage from './components/LinkPage';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  return (
    
    <Routes>
      
      <Route path="/" element={<Layout />}>
        <Route path = "/" element={<LinkPage />} />
        <Route path = "signin" element={<Signin />} />
        <Route path = "register" element={<Register />} />
        
        <Route path = "unauthorised" element={<Unauthorised />} />

        {/* <Route element = {<RequireAuth allowedRoles={[ROLES.User]} />}> */}
        <Route path="/home" element={<Home />} />
        {/* </Route> */}

        {/* <Route element = {<RequireAuth allowedRoles={[ROLES.Editor]} />}>
        <Route path="editor" element={<Editor />} />
        </Route>

        <Route element = {<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="admin" element={<Admin />} />
        </Route>

        <Route element = {<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}>
        <Route path="lounge" element={<Lounge />} />
        </Route>  */}

        <Route path="*" element={<Missing />} />
        
      </Route>
    </Routes>
    
  );
}

export default App;
