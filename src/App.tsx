import React from 'react';
import { Counter } from './features/counter/Counter';
import 'bootstrap/dist/css/bootstrap.min.css';
// Component templates
import Header  from 'components/header';
// Page templates

import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';

import Styled, { css, createGlobalStyle }  from 'styled-components';
import {SwitchTransition , CSSTransition } from "react-transition-group";

import Home from './page-templates/Home';
import LayoutTemplates from './page-templates/LayoutTemplates';
import SingleLayout from './page-templates/SingleLayout';
import Footer from './components/Footer';
import Contact from './page-templates/Contact';
import SearchPage from './page-templates/SearchPage';

const About = (props:any) => {
  return(
    <h1>About</h1>
  );
}

const Element = () => {
  const location = useLocation();

  const routes = [
    { path: '/', name: 'Home', Component: Home },
    { path: '/giao-dien-mau', name: 'Layout', Component: LayoutTemplates },
    { path: '/mau-website-demo/:slug', name: 'Layout', Component: SingleLayout },
    { path: '/about', name: 'About', Component: About },
    { path: '/contact', name: 'Contact', Component: Contact },
    { path: '/tim-kiem', name: 'Search', Component: SearchPage },
  ]

  return(
      <Routes>
        {routes.map(({ path, Component }) => (
               
          <Route key={path} path={path} element={
            <SwitchTransition mode={'out-in'}>
            <CSSTransition
                key={path}
                timeout={500}
                classNames="page"
                unmountOnExit
                >
              <div className="page">
                <Component />
              </div>
              </CSSTransition>
           </SwitchTransition>
            }/>

          ))}
           
    </Routes>
  )
}
function App() {
  return (
    <Router>
        <GlobalStyle />
        <Header />
        <Element />
        <Footer />
    </Router>
  );
}

export default App;

export const SwitchContainer = Styled.div`
`;
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600&display=swap');
  html{
    width: 100%;
    overflow-x: hidden;
  }
  body{
    font-family: 'Raleway', sans-serif;
    font-size: .96rem;
    width: 100%;
    padding: 0px !important;
  }
  .container{
    max-width: 1180px;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ab9676; 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
  .bg-custom{
    background: #e1dbc9;
  }
  .page-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .page-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }

  .page-exit {
    opacity: 1;
    transform: scale(1);
  }

  .page-exit-active {
    opacity: 0;
    transform: translateX(30px);
    transition: opacity 300ms, transform 300ms;
  }
`