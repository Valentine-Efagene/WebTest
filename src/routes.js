import NotFound from './NotFound.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import LogIn from './LogIn.jsx';
import TestLogin from './TestLogin.jsx';
import ContactAdd from './ContactAdd.jsx';
import ContactList from './ContactList.jsx';

const routes = [
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: LogIn },
  { path: '/ContactAdd', component: ContactAdd },
  { path: '/testlogin', component: TestLogin },
  { path: '/contacts', component: ContactList },
  // { path: '/edit/:id', component: ContactEdit },
  { path: '*', component: NotFound },
];

export default routes;
