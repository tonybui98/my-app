import logo from '../imgs/logo.png';
import SearchForm from './searchForm';
import Styled, { createGlobalStyle }  from 'styled-components';
import { useEffect} from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from '../app/hooks';
import { showModal, ShowModalState} from '../api/ModalSearch';
import { showMobileMenu } from '../api/MobileMenuSlice';
import { useSelector } from 'react-redux';
import { Navbar , Button } from 'react-bootstrap';
import { SearchOutline, CloseOutline } from "react-ionicons";
import { Buger } from './Navigation';
import { GridLine } from '../App';

const SearchNavigation = () => {
  return (
    <SearchContainer>
        <SearchForm />
    </SearchContainer>
  )
}

const Header = () => {
  const dispatch = useAppDispatch();
  const isShowModal = useSelector(ShowModalState);
  const location = useLocation();

  useEffect(() => {
    dispatch(showModal(false));
    dispatch(showMobileMenu(false));
  },[dispatch, location.pathname])

  return(
    <>  
      <GlobalStyle />
        <HeaderContainer>
            <Navbar className='align-items-center justify-content-between px-3'>
              <Navbar.Brand href="#home">
                <Link to={'/'}>
                  <img src={logo} height={'60px'} className="App-logo" alt="logo" />
                </Link>
              </Navbar.Brand>
              <FlexButton>
                <Button variant='outline-dark border-0' onClick={() => dispatch(showModal(isShowModal ? false : true))}>
                  <SearchOutline color={'white'}/> 
                </Button>
                <Buger />
              </FlexButton>
            </Navbar> 
        </HeaderContainer>
        {
          isShowModal ? 
          <StyledModal>
            <StyledButton variant='outline-dark border-0' onClick={() => dispatch(showModal(isShowModal ? false : true))}>
              <CloseOutline color={'white'}/> 
            </StyledButton>
            <SearchBackground>
              <SearchContent>
                  <h3 className="fw-bolder my-3 text-center">Tìm kiếm giao diện mẫu</h3>
                  <SearchNavigation /> 
                </SearchContent> 
              </SearchBackground>
              <div className='fragment'>
                <GridLine />
                <GridLine />
                <GridLine />
                <GridLine />
                <GridLine />
              </div>
          </StyledModal>
          : ''
        }
      </>
  );
  
}

export default Header;
export const StyledButton = Styled(Button)`
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 99;
`;
export const SearchBackground = Styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 45%);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SearchContent = Styled.div`
  position: relative;   
  max-width: 100%;
  width: 680px;
`;
export const StyledModal = Styled.div`
  border-radius: 0px;
  background: black;
  position: fixed;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  z-index: 999999;
`;
export const FlexButton = Styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  collumn-gap: 10px;
`;
export const HeaderContainer = Styled.div`
  background: rgb(0 0 0 / 25%);
  backdrop-filter: blur(10px);
  position: fixed;
  z-index: 999;
  width: 100%;
`
export const SearchContainer = Styled.div`
  width: 100%;
  margin: auto;
`;
export const SwitchContainer = Styled.div`
  width: 80%;
`;
const GlobalStyle = createGlobalStyle`
  .selection{
    max-width: 200px;
  }
  .enter {
     & > div , > span {
      opacity: 0;
      transform: translateY(-100%);
     }
  }
  .enter-active {
    & > div , > span {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  .enter-exit {
    & > div , > span {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  .exit-active {
    &  > div , > span{
      opacity: 0;
      transform: translateY(100%);
    }
  }
  .enter-active , .exit-active {
    & > div, > span {
      transition: all .5s ease-in-out;
    }
  }
`