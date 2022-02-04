import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  LocationOutline, 
  PhonePortraitOutline, 
  CallOutline, 
  MailOutline, 
  ChevronForwardOutline 
}  from 'react-ionicons';
import Styled from 'styled-components';
import Brands from '../imgs/logo.png';

interface ServicesMenuInterface {
  path:string,
  name:string,
}
const Year = new Date().getFullYear();

const ServicesMenu = [
  {
    path: '/dich-vu/google-ads/',
    name: 'GoogleAds',
  },{
    path: '/dich-vu/marketing-online/',
    name: 'Marketing Online',
  },{
    path: '/dich-vu/quan-tri-website/',
    name: 'Quản trị website',
  },{
    path: '/dich-vu/thiet-ke-website/',
    name: 'Thiết kế website',
  },{
    path: '/dich-vu/viet-bai-chuan-seo/',
    name: 'Viết bài chuẩn seo',
  },
];

const IconStyled = {
  color: '#ffffff',
  height: '15px',
  width: '15px',
}

const FooterMenuPage = [
  {
    path: '/lien-he/',
    name: 'Liên hệ chúng tôi',
  },{
    path: '/gioi-thieu/',
    name: 'Giới thiệu',
  },{
    path: '/bang-gia/',
    name: 'Bảng giá',
  },{
    path: '/tin-tuc/',
    name: 'Tin tức',
  },{
    path: '/dieu-khoan-chinh-sach/',
    name: 'Điều khoản chính sách',
  },
];

const FooterMenu = (props:any) => {
  return (
    <ul className='list-unstyled'>
      {
        props.menu.map((val:ServicesMenuInterface, index:number) => {
          return (
            <li key={index}>
              <StyledLink to={val.path}>
              <ChevronForwardOutline cssClasses={'me-2'}
                  color={'#00000'} 
                  height="10px"
                  width="10px"
                />
                {val.name}</StyledLink>
              </li>
          );
        })
      }
    </ul>
  )
}
const Footer = () => {
  return (
    <>
    <IntroduceSection className='py-3'>
        <Container>
          <Row className="align-items-center">
            <Col xs={3} md={2} className='p-3 d-md-block d-none'>
               <img className="d-block w-100" src={Brands} />
            </Col>
            <Col xs={12} md={10}>
               <h4 className='fw-bolder'>CHUYÊN THIẾT KẾ WEBSITE CHUYÊN NGHIỆP, ĐẸP MẮT, CHUẨN SEO</h4>
               <p>South Team là đội ngũ thiết kế web chuyên nghiệp uy tín, áp dụng mọi công nghệ tiên tiến nhất hiện nay. Tương thích với mọi thiết bị, dễ dàng lên TOP google. Không bình thường là một website, giá trị chúng tôi đem lại cho khách hàng của mình là sự hiệu quả của khi tiếp cận khách hàng trên Internet</p>
            </Col>
          </Row>
        </Container>
    </IntroduceSection>
    <FooterSection>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <FooterHeading>Công ty TNHH TM- DV SOUTH TEAM</FooterHeading>
            <Sep />
            <ul className='list-unstyled'>
              <li>
                <ContactInfor>
                <Icon>
                  <LocationOutline
                      color={IconStyled.color} 
                      height={IconStyled.height}
                      width={IconStyled.width}
                    />
                  </Icon>
                  318/16A Phan Văn Trị, P.11, Bình Thạnh, TP.HCM</ContactInfor>
              </li>
               <li>
                <ContactInfor>
                <Icon>
                <CallOutline
                      color={IconStyled.color} 
                      height={IconStyled.height}
                      width={IconStyled.width}
                    /> 
                  </Icon>  
                    0938.049.434 -  <Icon><PhonePortraitOutline
                    color={IconStyled.color} 
                    height={IconStyled.height}
                    width={IconStyled.width}
                  /></Icon>0367 55 99 81 (Zalo) </ContactInfor>
                </li>
               <li>
                  <ContactInfor>
                  <Icon>
                  <MailOutline
                        color={IconStyled.color} 
                        height={IconStyled.height}
                        width={IconStyled.width}
                      /></Icon>nampham@southteam.vn</ContactInfor>
                </li>
                <li>
                  <ContactInfor>
                  <Icon>
                  <MailOutline
                        color={IconStyled.color} 
                        height={IconStyled.height}
                        width={IconStyled.width}
                      /></Icon>contact@southteam.vn</ContactInfor>
                </li>
            </ul>
          </Col>
          <Col xs={12} md={3}>
            <FooterHeading>Dịch vụ của chúng tôi</FooterHeading>
            <Sep />
            <FooterMenu menu={ServicesMenu}/>
          </Col>
          <Col xs={12} md={3}>
            <FooterHeading>Dành cho khách hàng</FooterHeading>
            <Sep />
            <FooterMenu menu={FooterMenuPage}/>
          </Col>
        </Row>
      </Container>
    </FooterSection>
    <FooterBottom>
        <Container>
            <p className='mb-0'>© Copyright {Year}. Designed by SouthTeam - Bản quyền thiết kế web thuộc về <a className="text-white" href={`https://southteam.vn/`}>SouthTeam.vn</a></p>
        </Container>
    </FooterBottom>
    </>
  );
};

export default Footer;

export const IntroduceSection = Styled.section`
`;
export const FooterBottom = Styled.div`
  color: white;
  padding: 5px 0px;
  font-size: .96rem;
`;

export const FooterSection = Styled.section`
  padding: 75px 0px 50px 0px;
`;
export const StyledLink = Styled(Link)`
  text-decoration: unset;
  color: #bfbfbf;
`;
export const Sep = Styled.span`
  width: 40px;
  height: 2px;
  background: black;
  display: block;
  margin: 10px 0px 20px 0px;
  border-radius: 4px;
`;

export const Icon = Styled.div`
  display: inline-block;
  text-align: center;
  width: 30px;
  height: 30px;
  background: black;
  padding: 0px;
  border-radius: 50%;
  margin-right: 5px;
`;
export const ContactInfor = Styled.div`
  margin-bottom: 7px;
`;
export const FooterHeading = Styled.h3`
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
`;