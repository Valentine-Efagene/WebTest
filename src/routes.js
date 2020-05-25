import NotFound from './NotFound.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import LogIn from './LogIn.jsx';
import TestLogin from './TestLogin.jsx';
import AddContact from './AddContact.jsx';

const routes = [
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: LogIn },
  { path: '/addcontact', component: AddContact },
  { path: '/testlogin', component: TestLogin },
  { path: '*', component: NotFound },
];

export default routes;
