import NotFound from './NotFound.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import LogIn from './LogIn.jsx';
import ContactAdd from './ContactAdd.jsx';
import ContactList from './ContactList.jsx';
import ContactUpdate from './ContactUpdate.jsx';

const routes = [
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: LogIn },
  { path: '/contactadd', component: ContactAdd },
  { path: '/contacts', component: ContactList },
  { path: '/edit/:id', component: ContactUpdate },
  { path: '*', component: NotFound },
];

export default routes;
