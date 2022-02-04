import { MenuItems } from '../api/NavApi';
import Styled , { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { ChevronDownOutline } from "react-ionicons";
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { showMobileMenu, ShowMobileMenuState } from '../api/MobileMenuSlice';
import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring'
import { GridLine } from '../App';
import { Box } from '../decorations/Box';
const Fade = require('react-reveal/Fade');
const Reveal = require('react-reveal/Reveal');

const calc = (x:any, y:any) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x:any, y:any) => `translate3d(${ - x / 20}px,-${ - y / 20}px,0)`
const trans4 = (x:any, y:any) => `translate3d(${x / 25}px,${y / 25}px,0)`

export const Buger = () => {
  const dispatch = useAppDispatch();
  const isMobileShow = useAppSelector(ShowMobileMenuState);
  const [classBurger, setClassBurger] = useState<string>('');
  useEffect(() => {
    setClassBurger(isMobileShow ? 
      'hamburger hamburger--elastic js-hamburger is-active' : 
      'hamburger hamburger--elastic js-hamburger');
  },[dispatch, isMobileShow])

  return(
    <div className={classBurger} onClick={() => {
        dispatch(showMobileMenu(isMobileShow ? false : true))
      }
     }>
        <div className="hamburger-box">
          <div className="hamburger-inner"></div>
        </div>
    </div>
  );
}
export const MobileNavigation = (props:{open:boolean}) => {
  const pathname = useLocation().pathname;
  const [prop, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
  return(
      <Menu>
         <MobileBuger>
            <Buger />
         </MobileBuger>
         <MobileMenuWrapper onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
           <MobileMenuList>
                {
                  MenuItems.map((val:any, index:number) => {
                    return(
                      <StyledMobileNav key={index}>
                          <Reveal effect={index % 2 == 0 ? 'fadeInLeft' : 'fadeInRight'} spy={props.open}>
                              <Link 
                                className={val.path == pathname ? 
                                  'px-3 text-light text-decoration-none actived' :
                                  'px-3 text-light text-decoration-none'
                                } to={val.path} state="page">
                                  <animated.span className='d-inline-block' style={{ transform: prop.xy.interpolate(trans4) }}>
                                        {val.name}
                                  </animated.span>
                              </Link>
                          </Reveal>
                        </StyledMobileNav>
                      );
                  })
                }
          </MobileMenuList>
        </MobileMenuWrapper>
        <MenuBox>
          <Fade spy={props.open}>
              <animated.div style={{ transform: prop.xy.interpolate(trans1) }}>
                <Box />
              </animated.div> 
          </Fade>
        </MenuBox>
        <div className='fragment'>
            <GridLine />
            <GridLine />
            <GridLine />
            <GridLine />
            <GridLine />
        </div>
    </Menu>
  );
}

const Rotation = () => {
  let styles = '';
  
  for (let i = 0; i < 10; i += 1) {
     styles += `
      &:hover {
       & > .rotationDropdownItems div:nth-child(${i + 1}) {  
          visibility: visible;
          transform: rotateY(0);
          opacity: 1;
          transition: all .5s ease-in-out;
          transition-delay: ${i*50 + 50}ms;
        }
      }
      & > {
        & .rotationDropdownItems div:nth-child(${i + 1}) {  
          transform: rotateY(180deg);
          background: white;
          opacity: 0;
          transform-style: preserve-3d;
          transition: all .5s ease-in-out;
          transition-delay: ${i*50 + 50}ms;
          margin-bottom: 1px;
            a {
              color: black !important;
              padding: 10px;
              width: 100%;
              transition: .3s ease-in-out;
              &:hover{
                background: black;
                color: white !important;
              }
          }
        }
      }
     `
  }

  styles += `&:hover {
                & svg{
                transform: rotate(180deg);
                transition: all .5s ease-in-out;
                }
              } 
            & svg{
              transform: rotate(0deg);
              transition: all .5s ease-in-out;
            } 
         `;

  return css`${styles}`;
}
export const MenuBox = Styled.div`
  position: absolute;
  right: 30%;
  z-index: 1;
  transform: scale(.7);
  pointer-events: none;
`;
export const Menu = Styled.div`
  margin-top: 50px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999999;
  background: black;
  overflow-y: scroll;
  overflow-x: hidden;
`;
export const MobileMenuList = Styled.div`
  max-width: 860px;
  margin: auto;
`;
export const MobileMenuWrapper = Styled.div`
  padding-top: 50px;
  position: fixed;
  background: rgb(0 0 0 / 45%);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
export const MobileBuger = Styled.div`
  position: fixed;
  top: 25px;
  right: .5rem;
  height: 50px;
  z-index: 2;
`;
export const StyledMobileNav = Styled.div`
  width: 50%;
  display: inline-block;
  a{
    position: relative;
    padding: 5px 0px;
    display: block;
    width: 100%;
    font-size: 2rem;
    span{
      font-family: 'Josefin Sans', sans-serif;
      position: relative;
      &:after{
        content: "";
        width: 0px;
        height: 3px;
        background: red;
        display: block;
        position: absolute;
        bottom: 0;
        left:0;
        transition: all .3s ease-in-out;
      }
    }
    &:hover span{
      color: red;
      &:after{
        width: 100%;
        transition: all .3s ease-in-out;
      }
    }
  }
`
export const NavItemsDropDown = Styled.div`
  & .rotationDropdownItems{
    position: absolute;
    top: 30px;
    left: -15px;
    z-index: 9;
    width: 240px;
    pointer-events: none;
  }
  &:hover .rotationDropdownItems{
    pointer-events: all;
  }
  ${Rotation()}
`;

export const MobileSubLink = Styled.div`
  position: relative;
  width: 48%;
  display: inline-block;
  & a{
    padding: 5px 40px 5px 0px;
  }
  .dropdown-menu{
    position: relative !important;
    margin: 0px;
    transform: unset !important;
    width: 100%;
    background: black;
    padding: 0px;
  }
  #basic-nav-dropdown{
    position: absolute;
    right: 0px;
    top: -30px;
    background: black;
    height: 30px;
    width: 30px;
    padding: 0px;
    text-align: center;
    &:after{
      display: none;
    }
  }
`;