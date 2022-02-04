import { Canvas, useFrame } from '@react-three/fiber'
import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { Text } from "@react-three/drei";

import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

import TimeLine_1 from '../imgs/qt.png';
import TimeLine_2 from '../imgs/qt2.png';
import TimeLine_3 from '../imgs/qt3.png';
import TimeLine_4 from '../imgs/qt4.png';
import TimeLine_5 from '../imgs/qt5.png';


import DemoLayout from '../imgs/landing-home-1.jpg';

import Styled from 'styled-components';

// Banner Section 
import BackgrounSectionBanner from '../imgs/bg-1.jpg';
import bg_banner_1 from '../imgs/blog8.jpg';
import overlay_banner_1 from '../imgs/10.png';
import bg_banner_2 from '../imgs/bg-adsw.jpg';
import overlay_banner_2 from '../imgs/adwords.png';
import bg_banner_3 from '../imgs/blog2.jpg';
import overlay_banner_3 from '../imgs/cateloge_1.png';
import bg_banner_4 from '../imgs/blog1.jpg';
import overlay_banner_4 from '../imgs/34.png';
import bg_banner_5 from '../imgs/blog7.jpg';
import overlay_banner_5 from '../imgs/11.png';
// 
import banner_tk_web from '../imgs/thiet-ke-website.png';
import banner_tk_web2 from '../imgs/bg_gt_3.png';
import LayoutHome from '../components/LayoutHome';

const TimeLine = [
  {
    Title: 'Tìm hiểu và tư vấn xây dựng Website',
    Class : 'd-flex flex-wrap align-items-end',
    Component : TimeLine_1
  },
  {
    Title: 'Báo giá, tạo ý tưởng & Demo giao diện Website',
    Class : 'd-flex flex-wrap align-items-center',
    Component : TimeLine_2
  },
  {
    Title: 'Ký hợp đồng thiết kế Website',
    Class : 'd-flex flex-wrap align-items-start',
    Component : TimeLine_3
  },
  {
    Title: 'Xây dựng Module & hoàn thiện Website',
    Class : 'd-flex flex-wrap align-items-center',
    Component : TimeLine_4
  },
  {
    Title: 'Nghiệm thu, thanh lý HĐ & Chuyển giao công nghệ',
    Class : 'd-flex flex-wrap align-items-end',
    Component : TimeLine_5
  },
];


export const MyRotatingBox2 = () => {
  const myMesh:any = React.useRef();
  const [hovered, hover] = useState(false)
  const [rotation, setRotation] = useState([0, 0, 0, 0]);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.y = a/6;
  });

  return (
    <mesh visible ref={myMesh}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
    >
       <Text
        font={'Josefin Sans'}
        scale={[5, 5, 5]}
        color="white" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        SOUTHTEAM
      </Text>
      <boxBufferGeometry
        args={[4, 4, 4]}/>
      <pointLight position={[5, 5, 5]} />
      <meshPhongMaterial 
        attach="material" 
        color={hovered ? 'red' : '#ffe4c4'} 
        wireframe />
    </mesh>
  );
}

function MyRotatingBox() {
  const myMesh:any = React.useRef();
  const [hovered, hover] = useState(false)
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a/3;
    myMesh.current.rotation.z = a/6;
  });

  return (
    <mesh ref={myMesh}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
    >
      <boxBufferGeometry
        args={[4, 4, 4]}/>
      <meshPhongMaterial 
        attach="material" 
        color={hovered ? 'red' : '#ffe4c4'} 
        wireframe />
    </mesh>
  );
}


const Three = () => {
  let TimelineAnimating = 0;
  return (
    <>
    <Section>
        <div className='p-3 d-flex flex-wrap align-items-center position-relative'>
          <Row>
            <Col xs={12}>
              <Heading className='josefin fw-bolder d-block mb-2' 
              data-scroll
              data-scroll-speed="2"
              data-scroll-position="top"
              data-scroll-direction="vertical"
              >SOUTHTEAM</Heading>
              <Heading className='josefin fw-bolder d-block' 
              data-scroll
              data-scroll-speed="2.1"
              data-scroll-position="top"
              data-scroll-direction="vertical"
              >STUDIO</Heading>
              <ScaledStyled1 className='display-4 josefin fw-bolder d-inline-block' 
              data-scroll
              data-scroll-speed="1"
              data-scroll-position="top"
              data-scroll-direction="vertical"
              >Think</ScaledStyled1>
              <ScaledSmaller className='display-4 josefin fw-bolder d-inline-block' 
              data-scroll
              data-scroll-speed="-1.4"
              data-scroll-position="top"
              data-scroll-direction="vertical"
              >Build</ScaledSmaller>
              <ScaledStyled2 className='display-4 josefin fw-bolder d-inline-block scale-2' 
              data-scroll
              data-scroll-speed="-2.6"
              data-scroll-position="top"
              data-scroll-direction="vertical"
              >Grow</ScaledStyled2>
              <Boxed
                  data-scroll
                  data-scroll-speed="-0.1"
                  data-scroll-position="bottom"
                  data-scroll-direction="horizontal"
                  >
                <Canvas 
                style={{'height': '380px', 'width': '380px' , 'padding': '10px', 'overflow': 'visible'}} >
               
                  <MyRotatingBox />
                  <ambientLight intensity={0.1} />
                  <directionalLight color={'white'} position={[0, 0, 5]} />
                  <directionalLight />
                </Canvas>
              </Boxed>
            </Col>
            <StyledImg src={DemoLayout} 
              data-scroll
              data-scroll-speed="1.1"
              data-scroll-position="top"
              data-scroll-direction="horizontal"/>
          </Row>
        </div>
     </Section>
     <Section>
        <Row className="align-items-center position-relative">
            <Col className='m-auto' xs={12}>
                <ul className='list-unstyled d-flex flex-wrap'>
                  {
                  TimeLine.map((val, index) => {
                    TimelineAnimating = 0.3;
                    let Direction = index % 2 == 0 ? 'top': 'bottom';
                    let Timing = TimelineAnimating;
                    if(Direction == 'top'){
                      Timing = -TimelineAnimating;
                    } 
                    return(
                      <li className='col' 
                          key={index}>
                            <div  
                              className="d-block"
                              data-scroll
                              data-scroll-speed={Timing}
                              data-scroll-position={Direction}
                              data-scroll-direction="vertical">
                            <CounterTimeline 
                              className='josefin'
                              >{index + 1}</CounterTimeline>
                                
                            <TimeLineContent>
                              <div>
                                <TimeLineImg src={val.Component} />
                                <TimeLineTitle className='josefin'>{val.Title}</TimeLineTitle>
                              </div>
                            </TimeLineContent>
                            </div>
                        </li>);
                  })}
                </ul>
              </Col>
          </Row>
     </Section>
     <Section>
      <Container>
          <Row className="align-items-center">
              <Col className='m-auto position-relative' xs={4}>
                <BoxedLeft
                  data-scroll
                  data-scroll-speed="0.4"
                  data-scroll-position="top"
                  data-scroll-direction="horizontal">
                  <Canvas 
                      style={{'height': '420px', 'width': '420px', 'overflow': 'visible'}} >
                      <MyRotatingBox2 />
                      <ambientLight intensity={0.1} />
                  </Canvas>
                </BoxedLeft>
              </Col>
              <Col className='m-auto' xs={8}>
                <h3 
                  className="josefin"
                >
                  Sở hữu hàng trăm mẫu giao diện thiết kế hiện đại, tích hợp đầy đủ chức năng giúp bạn có thể dễ dàng thao tác chỉnh sửa theo mong muốn. Website dễ dàng lên TOP Google trong lần đầu submit. Cam kết không phát sinh bất kì thêm chi phí nào.
                </h3>
              </Col>
          </Row>
        </Container>
      </Section>
      <Section>
        <Container>
          <Row>
            <Col xs={12}>
                  <h3 className='fw-bolder text-center mb-3'>HÃY CHỌN NHU CẦU THIẾT KẾ WEBSITE CỦA BẠN</h3>
                  <LayoutHome />
              </Col>
            </Row>
          </Container>
        </Section>
      <Section>
          <Row>
                <Col md={4} sm={12} xs={12}>
                  <SectionTitle 
                    className={'text-md-end text-center'}
                    data-scroll
                    data-scroll-speed="-1.1"
                    data-scroll-position="bottom"
                    data-scroll-direction="horizontal"
                    >
                      <RotateSectionTitle 
                      className='josefin'
                      >Dịch vụ</RotateSectionTitle>
                  </SectionTitle>
                </Col>
                <Col md={7} sm={12} xs={12}>
                    <Row className={'p-3'}>
                      <Col xs={6}>
                            <BlockPortfolio >
                                  <LinkOverLay to={'/demo'}></LinkOverLay>
                                  <RotateStatus>Web Design</RotateStatus>
                                  <ImgResponsive src={bg_banner_1} />
                                  <ImgAdditional src={overlay_banner_1} />
                                  <PortfolioInfo>
                                    <h4 className='fw-bolder text-uppercase'>Thiết kế Website</h4>
                                    <span className="project-category text-shadown">Thiết kế hiện đại theo ý tưởng khách hàng</span>
                                  </PortfolioInfo>
                            </BlockPortfolio>
                      </Col>
                      <Col xs={6}>
                          <BlockPortfolio >
                                <LinkOverLay to={'/demo'}></LinkOverLay>
                                <RotateStatus>Google Adwords</RotateStatus>
                                <ImgResponsive src={bg_banner_2} />
                                <ImgAdditional src={overlay_banner_2} />
                                <PortfolioInfo>
                                  <h4 className='fw-bolder text-uppercase'>Google Adwords</h4>
                                  <span className="project-category text-shadown">Quảng cáo trên Google</span>
                                </PortfolioInfo>
                            </BlockPortfolio>
                      </Col>
                      <Col xs={6} md={4}>
                        <BlockPortfolio >
                              <LinkOverLay to={'/demo'}></LinkOverLay>
                              <RotateStatus>Quản trị Website</RotateStatus>
                              <ImgResponsive src={bg_banner_3} />
                              <ImgAdditional src={overlay_banner_3} />
                              <PortfolioInfo>
                                <h4 className='fw-bolder text-uppercase'>Quản trị Website</h4>
                                <span className="project-category text-shadown">Cập nhật nội dung Website</span>
                              </PortfolioInfo>
                          </BlockPortfolio>
                      </Col>
                      <Col xs={6} md={4}>
                          <BlockPortfolio >
                                <LinkOverLay to={'/demo'}></LinkOverLay>
                                <RotateStatus>Marketing Online</RotateStatus>
                                <ImgResponsive src={bg_banner_4} />
                                <ImgAdditional src={overlay_banner_4} />
                                <PortfolioInfo>
                                  <h4 className='fw-bolder text-uppercase'>Marketing Online</h4>
                                  <span className="project-category text-shadown">Chiến lược tổng thể tiếp cận KH online</span>
                                </PortfolioInfo>
                            </BlockPortfolio>
                      </Col>
                      <Col xs={6} md={4}>
                          <BlockPortfolio >
                                <LinkOverLay to={'/demo'}></LinkOverLay>
                                <RotateStatus>Viết bài chuẩn SEO</RotateStatus>
                                <ImgResponsive src={bg_banner_5} />
                                <ImgAdditional src={overlay_banner_5} />
                                <PortfolioInfo>
                                  <h4 className='fw-bolder text-uppercase'>Viết bài chuẩn SEO</h4>
                                  <span className="project-category text-shadown">Cung cấp bài viết chỉ từ 55.000đ/bài</span>
                                </PortfolioInfo>
                            </BlockPortfolio>
                      </Col>
                    </Row>
                </Col>
          </Row>
      </Section>
     </>
  )
}

export default Three;
export const RotateSectionTitle = Styled.h2`
  text-align: center;
  font-size: 6rem;
  color: red;
  @media (min-width: 768px){
    text-transform: uppercase;
    transform: rotate(-90deg);
    transform-origin: bottom right 0;
    display: inline-block;
    white-space: nowrap;
  }
`;
export const SectionTitle = Styled.div``;
export const PortfolioInfo = Styled.div`
  opacity: 0;
  position: absolute;
  z-index: 5;
  text-align: center;
  width: 100%;
  top: 42%;
  left: 0;
  padding: 0 20px;
  transform: translateY(10px);
  transition: all .3s ease-in-out;
  h4{
    position: relative;
    padding-bottom: 20px;
    &:after{
        position: absolute;
        content: "";
        left: 50%;
        margin-left: -15px;
        bottom: 0;
        height: 2px;
        width: 30px;
        background-color: rgba(38,35,40,.3);
        transition: all 1s ease;
    }
  }
  span{
    font-size: 15px;
    color: rgba(38,35,40,.7);
    line-height: 25px;
    word-spacing: 1px;
  }
`;
export const ImgResponsive = Styled.img`
  width: 100%;
  min-width: 100%;
  transition: all 1.5s ease;
`;
export const ImgAdditional = Styled.img`
  position: absolute;
  left: 10%;
  top: 30%;
  min-width: 100%;
  transition: all 1.5s ease;
`;
export const RotateStatus = Styled.span`
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 7;
  bottom: 25px;
  left: 16px;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: left;
  display: block;
  width: 15px;
  white-space: nowrap;
  color: rgba(38,35,40,.9);
  transform: rotate(-90deg);
`;
export const LinkOverLay = Styled(Link)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
`;
export const BlockPortfolio = Styled.div`
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
  backface-visibility: hidden;
  height: auto;
  display: flex;
  align-items: center;
  &:after{
    position: absolute;
    content: "";
    transition: all 0.3s ease;
    background-color: rgba(255,255,255,.9);
    top: 110%;
    left: 10px;
    bottom: 10px;
    right: 10px;
    z-index: 0;
  }
  &:hover {
    &:after{
      top: 10px;
    }
    ${ImgAdditional}{
      transform: scale(1.1);
    }
    ${ImgResponsive}{
      transform: scale(1.1);
    }
    ${PortfolioInfo}{
      opacity: 1;
      transform: translateY(0px);
      transition: all .3s ease-in-out;
    }
  }
`;

export const BannerSection = Styled.section`
  background-size: cover;
  padding: 50px 0px;
  position: relative;
  & > .row{
    position: relative;
    z-index: 1;
  }
  &:after{
    content:"";
    width: 100%;
    height: 100%;
    position: absolute;
    background: black;
    opacity: .5;
    top: 0;
    left: 0;
    z-index: 0;
  }
`;

export const CounterTimeline = Styled.span`
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 13rem;
  z-index: -1;
  color: rgb(255 0 0 / 15%);
`;

export const Section = Styled.section`
  padding: 150px 0px;
  width: 100%;
`;
export const BoxedLeft = Styled.div`
  position: absolute;
  z-index: -2;
  left: 0vw;
  height: 600px;
  top: calc(50% - 300px);
`;
export const Boxed = Styled.div`
  position: absolute;
  z-index: -2;
  right: 7vw;
  height: 400px;
  top: calc(50% - 200px);
`;
export const StyledImg = Styled.img`
  width: 550px;
  position: absolute;
  z-index: -1;
  right: 5vw;
  opacity: 1
`;
export const Heading = Styled.h1`
  font-size: 7rem;
  margin-bottom: 2rem;
  color: #bfbfbf;
`;

export const ScaledStyled1 = Styled.h2`
  font-size: 4rem;
  margin: 20px;
  color: white;
`;
export const ScaledStyled2 = Styled.h2`
  font-size: 4rem;
  margin: 20px;
  color: #bfbfbf;
`;
export const ScaledSmaller = Styled.h2`
  font-size: 4rem;
  margin: 20px;
  color: #bfbfbf;
`;

// Time Line 

export const TimeLineTitle = Styled.h4`
  font-size: 18px;
  line-height: 26px;
  text-align: center;
  text-transform: uppercase;
  font-weight: bolder;
  color: #bfbfbf;
`;
export const TimeLineContent = Styled.div`
  height: 330px;
  display: flex;
  flex-wrap: wrap;
  padding: 25px;
  `;
export const TimeLineImg = Styled.img`
  width: 90px;
  height: 90px;
  display: block;
  margin-bottom: 25px !important;
  border-radius: 50%;
  background: black;
  transition: all .3s ease-in-out;
  margin: auto;
  &:hover{
    background: red
  }
`;