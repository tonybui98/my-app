import { useRef } from 'react';
import { ArrowUp } from 'react-ionicons';
import Header from './components/Header';
// Page templates

import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Styled, { createGlobalStyle }  from 'styled-components';
import {SwitchTransition , CSSTransition } from "react-transition-group";
import { ShowMobileMenuState } from './api/MobileMenuSlice';
import Home from './page-templates/Home';
import LayoutTemplates from './page-templates/LayoutTemplates';
import SingleLayout from './page-templates/SingleLayout';
import Footer from './components/Footer';
import Contact from './page-templates/Contact';
import SearchPage from './page-templates/SearchPage';
import Three from './page-templates/Three';
import { MobileNavigation } from './components/Navigation';  
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'

import 'styles/noise.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = (props:any) => {
  return(
    <h1>About</h1>
  );
}

const Element = () => {
  const routes = [
    { path: '/', name: 'Home', Component: Home },
    { path: '/giao-dien-mau', name: 'Layout', Component: LayoutTemplates },
    { path: '/mau-website-demo/:slug', name: 'Layout', Component: SingleLayout },
    { path: '/about', name: 'About', Component: About },
    { path: '/contact', name: 'Contact', Component: Contact },
    { path: '/tim-kiem', name: 'Search', Component: SearchPage },
    { path: '/three', name: 'Three', Component: Three },
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

const MainContent = () => {
  const location = useLocation();
  const containerRef = useRef(null);
  const isMobileShow = useSelector(ShowMobileMenuState);
  return(
    <>
    <Header />
    { isMobileShow ? <MobileNavigation open={isMobileShow}/> : '' }
    <Main data-scroll-container>
        <LocomotiveScrollProvider
                    options={
                      {
                        smooth: true,
                      }
                    }
                    onUpdate={() => console.log('Updated, but not on location change!')}
                    location={location.pathname}
                    watch={[
                        location
                      ]}
                    containerRef={containerRef}
                  >
          <div id="page-wrap" data-scroll-container ref={containerRef}>
            <Element />
            <Footer />
          </div>
      </LocomotiveScrollProvider>
    </Main>
    </>
  );
}

const App = () => {
  return (
    <Router>
        <GlobalStyle />
        <MainContent />
        <div className='fragment'>
          <GridLine />
          <GridLine />
          <GridLine />
          <GridLine />
          <GridLine />
        </div>
        <BackToTop onClick={() => {
          console.log('click');
          window.scrollTo({
                          top: 0, 
                          left: 0, 
                          behavior: 'smooth'
                        })}}>
          <ArrowUp color={'white'} width={'20px'} height={'20px'}/>
        </BackToTop>
    </Router>
  );
}

export default App;
export const BackToTop = Styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  border: 1px solid white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; 
  &:hover:after{
    border-top: 2px solid red;
    border-left-width: 2px;
    border-right-width: 2px;
    border-bottom-width: 2px;
    transform: rotate(270deg);
    transition: transform 0.4s linear 0s, border-left-width 0s linear 0.35s, -webkit-transform 0.4s linear 0s;
  }
  &:after{
    content:"";
    width: 100%;
    width: 60px;
    height: 60px; 
    border: 0 solid transparent;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
  }
`;
export const SwitchContainer = Styled.div`
`;
export const GridLine = Styled.div`
  width: 20%;
  position: relative;
  z-index: 1;
  display: inline-block;
  &:after{
    display: block;
    height: 100vh;
    width: 1px;
    background: rgb(255 255 255 / 20%);
    position: absolute;
    left: 50%;
    top: 0;
    content: "";

  }
`
export const Main = Styled.main`
  padding-top: 80px;
  position: relative;
  z-index: 1;
  background: rgb(0 0 0 / 60%);
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600&display=swap');
  html{
    width: 100%;
    overflow-x: hidden;
  }
  body{
    font-family: 'Josefin Sans', sans-serif;
    font-size: .96rem;
    width: 100%;
    padding: 0px !important;
    color: #bfbfbf;
  }
  @-webkit-keyframes rota {
    0% {transform: rotate(0deg);border-color:red;}
    100% {transform: rotate(360deg);z-index:0;}
  }
  .fadeInLeft {
      animation: fadeInLeft 500ms ease-in-out;
  }
  @keyframes fadeInLeft {
      0% {
          opacity: 0;
          -webkit-transform: translateX(-40px);
      }
      100% {
          opacity: 1;
          -webkit-transform: translateX(0);
      }
  }
  .fadeInRight {
    animation: fadeInRight 500ms ease-in-out;
  }
  @keyframes fadeInRight {
      0% {
          opacity: 0;
          -webkit-transform: translateX(40px);
      }
      100% {
          opacity: 1;
          -webkit-transform: translateX(0);
      }
  }
  .container{
    max-width: 1180px;
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
  .actived{
    div{
      color: red;
      font-family: 'Josefin Sans', sans-serif;
      font-weight: bold;
    }
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
.bm-menu-wrap {
  position: fixed;
  height: 100%;
}
.bm-menu {
  background: black;
  padding: .75rem;
  font-size: 1em;
}
.bm-morph-shape {
  fill: black;
}
.bm-item-list {
  color: #b8b7ad;
  padding: 0.8em;
}
.bm-item {
  display: inline-block;
}
.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
html {
    &.has-scroll-smooth {
        overflow: hidden;
    }

    &.has-scroll-dragging {
        user-select: none;
    }
}

body {
    .has-scroll-smooth & {
        overflow: hidden;
    }
}

#page-wrap{
  position: relative;
  z-index: 1;
}
[data-scroll-container] {
    .has-scroll-smooth & {
        min-height: 100vh;
    }
    [data-scroll-direction="horizontal"] & {
        height: 100vh;
        display: inline-block;
        white-space: nowrap;
    }
}

[data-scroll-section] {
    [data-scroll-direction="horizontal"] & {
        display: inline-block;
        vertical-align: top;
        white-space: nowrap;
        height: 100%;
    }
 }
.c-scrollbar {
  position: absolute;
  right: 0;
  top: 0;
  width: 11px;
  height: 100%;
  z-index: 999;
  transform-origin: center right;
  transition: transform 0.3s, opacity 0.3s;
  opacity: 0;
  &:hover {
      transform: scaleX(1.45);
  }
  &:hover, .has-scroll-scrolling &, .has-scroll-dragging & {
      opacity: 1;
  }

  [data-scroll-direction="horizontal"] & {
      width: 100%;
      height: 10px;
      top: auto;
      bottom: 0;
      transform: scaleY(1);
      &:hover {
          transform: scaleY(1.3);
      }
  }

}
/*
   * Elastic
   */
.hamburger {
	padding: 5px 15px;
	display: inline-block;
	cursor: pointer;
	transition-property: opacity, filter;
	transition-duration: 0.15s;
	transition-timing-function: linear;
	font: inherit;
	color: inherit;
	text-transform: none;
	background-color: transparent;
	border: 0;
	margin: 0;
	overflow: visible;
	&:hover {
		opacity: 0.7;
	}
}
.hamburger.is-active {
	&:hover {
		opacity: 0.7;
	}
	.hamburger-inner {
		background-color: #fff;
		&::before {
			background-color: #fff;
		}
		&::after {
			background-color: #fff;
		}
	}
}
.hamburger-box {
	width: 30px;
	height: 24px;
	display: inline-block;
	position: relative;
}
.hamburger-inner {
	display: block;
	top: 50%;
	margin-top: -2px;
	width: 30px;
	height: 2px;
	background-color: white;
	position: absolute;
	transition-property: transform;
	transition-duration: 0.15s;
	transition-timing-function: ease;
	&::before {
		width: 30px;
		height: 2px;
		background-color: white;
		position: absolute;
		transition-property: transform;
		transition-duration: 0.15s;
		transition-timing-function: ease;
		content: "";
		display: block;
		top: -10px;
		left: -10px;
	}
	&::after {
		width: 30px;
		height: 2px;
		background-color: white;
		position: absolute;
		transition-property: transform;
		transition-duration: 0.15s;
		transition-timing-function: ease;
		content: "";
		display: block;
		bottom: -10px;
	}
}
.hamburger--elastic {
	.hamburger-inner {
		top: 2px;
		transition-duration: 0.275s;
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		&::before {
			top: 10px;
			transition: opacity 0.125s 0.275s ease;
		}
		&::after {
			top: 20px;
			transition: transform 0.275s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		}
	}
}
.hamburger--elastic.is-active {
	.hamburger-inner {
		transform: translate3d(0, 10px, 0) rotate(135deg);
		transition-delay: 0.075s;
		&::before {
			transition-delay: 0s;
			opacity: 0;
		}
		&::after {
			transform: translate3d(0, -20px, 0) rotate(-270deg);
			transition-delay: 0.075s;
		}
	}
}
.c-scrollbar_thumb {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  opacity: 0.8;
  width: 7px;
  border-radius: 10px;
  margin: 2px;
  cursor: grab;
  z-index: 999;
  .has-scroll-dragging & {
      cursor: grabbing;
  }

  [data-scroll-direction="horizontal"] & {
      right: auto;
      bottom: 0;
  }

}
`