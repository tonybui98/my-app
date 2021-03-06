import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { dataSingleTemplates , fetchPosts, postStatus } from '../api/Post';
import { Container, Row, Col, ListGroup, Button, Modal} from 'react-bootstrap';
import { BookmarkOutline, CheckboxOutline, DownloadOutline, DesktopOutline} from 'react-ionicons';
import DocumentMeta from 'react-document-meta';
import TemplatesRegisteForm from '../components/TemplatesRegisteForm';
import Styled from 'styled-components';

// Images 

import ImageMobile from '../imgs/iphone.png';
import ImageDesktopHeader from '../imgs/desktop-header.png';
import PerfectScrollbar from 'react-perfect-scrollbar';
import banner_tk_web from '../imgs/thiet-ke-website.png';
import banner_tk_web2 from '../imgs/bg_gt_3.png';

const Fade = require('react-reveal/Fade');

interface SingleDataType {
  title: {
    rendered: string
  },
}

const sampleContainer = {
  maxHeight: "500px"
};

const SingleLayout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const FetchURL = `https://southteam.vn/wp-json/wp/v2/mau-website-demo/?slug=${location.pathname.replace( '/mau-website-demo/', '').replace( '/', '')}`;
  const [metaData, setMetaData] = useState<any>({});
  const [singleData, setSingleData] = useState<any>();
  const DataPost:any = useAppSelector(dataSingleTemplates)[0];
  const [currentState, setCurrentState] = useState<string>('');
  const PostStatus:string = useAppSelector(postStatus);

  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(PostStatus);
  interface PostDataType {
    title: any,
  }

  useEffect(() => {
    if(PostStatus == 'idle' || currentState != location.pathname){
      dispatch(fetchPosts(FetchURL));
    }
    if(PostStatus == 'loaded' || currentState != location.pathname){
      setCurrentState(location.pathname);
      setSingleData(DataPost);
    }
  }, [dispatch, DataPost, location.pathname]);

  interface CategoryType{
    name: string
  }

  if(singleData != undefined){
    let NewTermString:string = '';
    for (const iterator of singleData.term) {
        NewTermString += iterator.name;
    }
    return (
      <DocumentMeta {...metaData}>
          <HeadingSection>
            <StyledH1 className="text-center">
              <BookmarkOutline
                color={'#00000'} 
                cssClasses={'me-2'}
                title={singleData.title.rendered}
                height="20px"
                width="20px"
              />
              {singleData.title.rendered}
            </StyledH1>
          </HeadingSection>
          <IntroductSection>
            <Container>
              <Row>
                <Col className='order-2 order-md-1' xs={12} md={4}>
                    <ListGroup>
                      <StyledListGroup>
                      <CheckboxOutline
                          cssClasses={'me-2'}
                          color={'#27ae60'}
                          height="25px"
                          width="25px"
                        />
                        {singleData.title.rendered} l?? {NewTermString}, ???????c thi???t k??? chuy??n nghi???p ?????p m???t v???i ?????y ????? ch???c n??ng.
                      </StyledListGroup>
                      <StyledListGroup>
                      <CheckboxOutline
                          cssClasses={'me-2'}
                          color={'#27ae60'}
                          height="25px"
                          width="25px"
                        />
                        Giao di???n t???i ??u gi??p load c???c nhanh.
                      </StyledListGroup>
                      <StyledListGroup>
                      <CheckboxOutline
                          cssClasses={'me-2'}
                          color={'#27ae60'}
                          height="25px"
                          width="25px"
                        />
                        Chu???n SEO 100% d??? d??ng l??n TOP google.
                      </StyledListGroup>
                      <StyledListGroup>
                      <CheckboxOutline
                          cssClasses={'me-2'}
                          color={'#27ae60'}
                          height="25px"
                          width="25px"
                        />
                        Giao di???n t????ng th??ch v???i m???i thi???t b???.</StyledListGroup>
                      <StyledListGroup>
                      <CheckboxOutline
                          cssClasses={'me-2'}
                            color={'#27ae60'} 
                            height="25px"
                            width="25px"
                          />
                      B???n c?? th??? t??? ch???nh s???a b??? c???c n???i dung v???i giao di???n Drop & Drag.</StyledListGroup>
                    </ListGroup>
                        <Button size={'lg'} 
                                variant={'danger w-100 my-3 text-uppercase fw-bolder'}
                                onClick={handleShow}
                        >
                          <DownloadOutline
                              color={'#ffffff'} 
                              title={'????ng k?? m???u'}
                              height="25px"
                              width="25px"
                              cssClasses={'mb-2 me-2'}
                            />
                          ????ng k?? m???u n??y
                        </Button>
                        <p className="text-center">Ho???c</p>
                        <a target={'_blank'} href={'http://southteam.vn/demo/?id=' + singleData.id}>
                          <Button size={'lg'} variant={'primary w-100 my-3 text-uppercase fw-bolder'}>
                            <DesktopOutline
                                  color={'#ffffff'} 
                                  title={'????ng k?? m???u'}
                                  height="25px"
                                  width="25px"
                                  cssClasses={'mb-2 me-2'}
                                />
                              Tr???i nghi???m
                          </Button>
                        </a>
                </Col>
                <Col className='order-1 order-md-2 mb-4' xs={12} md={8}>
                  <ScreenView>
                    <DesktopView>
                        <DesktopHeader>
                        <img className='w-100' src={ImageDesktopHeader} />
                        </DesktopHeader>
                        <PerfectScrollbar
                        style={sampleContainer} >
                          <img className='w-100' src={singleData.featured_image_src} />
                        </PerfectScrollbar>
                    </DesktopView>
                    <FloatMobile>
                      <MobileView>
                            <Iphone>
                              <img className='w-100' src={ImageMobile}/>
                            </Iphone>
                            <MobileScreen src={singleData.acf.hinh_mobile.url} /> 
                      </MobileView>
                    </FloatMobile>
                  </ScreenView>
                </Col>
            </Row>
            </Container>
          </IntroductSection>
          <Section>
            <Container className="m-auto">
                <Row className="align-items-center">
                    <Col xs={12} md={4}>
                      <Fade cascade left>
                          <img className="m-auto w-100" src={banner_tk_web2}/>
                        </Fade>
                    </Col>
                    <Col xs={12} md={8}>
                        <Fade bottom>
                          <h3 className='fw-bolder mb-3'>THI???T K??? WEBSITE CHUY??N NGHI???P L?? G???</h3>
                          <Sep />
                        </Fade>
                        <Fade cascade bottom>
                          <ul className="list-unstyled">
                            <li><p className='mb-3'>Thi???t k??? web hay thi???t k??? website ????n gi???n l?? c??ng vi???c t???o m???t trang web cho c?? nh??n, c??ng ty, doanh nghi???p ho???c t??? ch???c. C?? 2 ph????ng th???c ch??nh ????? thi???t k???: </p></li>
                            <li><p className='mb-3'> <strong>Thi???t k??? web t??nh</strong> l?? s??? d???ng c??c ??o???n m?? HTML (HTML5), h??nh ???nh, Video, Audio, Flash, Javascript (jQuery) v?? CSS ????? t???o m???t giao di???n cho trang web.</p></li>
                            <li><p className='mb-3'> <strong>Thi???t k??? web ?????ng</strong> l?? thi???t k??? website chuy??n nghi???p, c?? h??? th???ng c?? s??? d??? li???u d??ng ????? cung c???p th??ng tin cho website, c?? kh??? n??ng qu???n l?? d??? li???u t???t, t????ng t??c tr??n h??? th???ng, d??? c???p nh???t n???i dung v?? th??m c??c t??nh n??ng ti???n ??ch qu???n l?? cho doanh nghi???p, th??n thi???n v???i ng?????i d??ng.</p></li>
                          </ul>
                        </Fade>
                    </Col>
                </Row>
            </Container>
          </Section>
          <Section>
              <Container className="m-auto">
                  <Row className="align-items-center">
                      <Col xs={12} md={8}>
                          <Fade bottom>
                            <h3 className='fw-bolder mb-3'>THI???T K??? WEBSITE CHUY??N NGHI???P L?? G???</h3>
                            <Sep />
                          </Fade>
                          <Fade cascade bottom>
                            <ul className="list-unstyled">
                              <li><p className='mb-3'>Thi???t k??? web hay thi???t k??? website ????n gi???n l?? c??ng vi???c t???o m???t trang web cho c?? nh??n, c??ng ty, doanh nghi???p ho???c t??? ch???c. C?? 2 ph????ng th???c ch??nh ????? thi???t k???: </p></li>
                              <li><p className='mb-3'> <strong>Thi???t k??? web t??nh</strong> l?? s??? d???ng c??c ??o???n m?? HTML (HTML5), h??nh ???nh, Video, Audio, Flash, Javascript (jQuery) v?? CSS ????? t???o m???t giao di???n cho trang web.</p></li>
                              <li><p className='mb-3'> <strong>Thi???t k??? web ?????ng</strong> l?? thi???t k??? website chuy??n nghi???p, c?? h??? th???ng c?? s??? d??? li???u d??ng ????? cung c???p th??ng tin cho website, c?? kh??? n??ng qu???n l?? d??? li???u t???t, t????ng t??c tr??n h??? th???ng, d??? c???p nh???t n???i dung v?? th??m c??c t??nh n??ng ti???n ??ch qu???n l?? cho doanh nghi???p, th??n thi???n v???i ng?????i d??ng.</p></li>
                            </ul>
                          </Fade>
                      </Col>
                      <Col xs={12} md={4}>
                        <Fade cascade left>
                            <img className="m-auto w-100" src={banner_tk_web2}/>
                          </Fade>
                      </Col>
                  </Row>
            </Container>
        </Section>
        <Section>
          <Container className="m-auto">
              <Row className="align-items-center">
                  <Col xs={12} md={4}>
                    <Fade cascade left>
                        <img className="m-auto w-100" src={banner_tk_web2}/>
                      </Fade>
                  </Col>
                  <Col xs={12} md={8}>
                      <Fade bottom>
                        <h3 className='fw-bolder mb-3'>THI???T K??? WEBSITE CHUY??N NGHI???P L?? G???</h3>
                        <Sep />
                      </Fade>
                      <Fade cascade bottom>
                        <ul className="list-unstyled">
                          <li><p className='mb-3'>Thi???t k??? web hay thi???t k??? website ????n gi???n l?? c??ng vi???c t???o m???t trang web cho c?? nh??n, c??ng ty, doanh nghi???p ho???c t??? ch???c. C?? 2 ph????ng th???c ch??nh ????? thi???t k???: </p></li>
                          <li><p className='mb-3'> <strong>Thi???t k??? web t??nh</strong> l?? s??? d???ng c??c ??o???n m?? HTML (HTML5), h??nh ???nh, Video, Audio, Flash, Javascript (jQuery) v?? CSS ????? t???o m???t giao di???n cho trang web.</p></li>
                          <li><p className='mb-3'> <strong>Thi???t k??? web ?????ng</strong> l?? thi???t k??? website chuy??n nghi???p, c?? h??? th???ng c?? s??? d??? li???u d??ng ????? cung c???p th??ng tin cho website, c?? kh??? n??ng qu???n l?? d??? li???u t???t, t????ng t??c tr??n h??? th???ng, d??? c???p nh???t n???i dung v?? th??m c??c t??nh n??ng ti???n ??ch qu???n l?? cho doanh nghi???p, th??n thi???n v???i ng?????i d??ng.</p></li>
                        </ul>
                      </Fade>
                  </Col>
              </Row>
          </Container>
        </Section>
          <Modal 
            show={show} 
            onHide={handleClose} 
            animation={false}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="fw-bolder">T??m ki???m giao di???n m???u</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <TemplatesRegisteForm data={{title: singleData.title.rendered , link:singleData.featured_image_src}}/>
            </Modal.Body>
          </Modal>
      </DocumentMeta>
    )
  } else{
    return (
      <h1 className='text-center'>??ang t???i...</h1>
    );
  }
}

export default SingleLayout;
export const StyledListGroup = Styled(ListGroup.Item)`
  background: unset;
  color: #bcbcbc;
`;
export const Sep = Styled.span`
  width: 60px;
  height: 3px;
  display: block;
  margin: 20px 0px;
  border-radius: 4px;
  color: red;
`;
export const Section = Styled.section`
  padding: 75px 0px;
`;
export const HeadingSection = Styled.section`
  padding: 50px 0px;
  background-side: cover;
`;
export const StyledH1 = Styled.h1`
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
`;
export const FloatMobile = Styled.div`
  position: absolute;
  bottom: 20px;
  right: 5%;
  z-index: 1;
`;
export const ScreenView = Styled.div`
  position: relative;
  max-width: 700px;
  margin: auto
`;
export const MobileScreen = Styled.img`
  width: 88%;
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
`;
export const Iphone = Styled.div`
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
`;
export const MobileView = Styled.div`
  position: relative;
  background-repeat: no-repeat;
  padding-top: 206%;
  max-width: 200px;
  width: 180px;
  height: auto;
  display: block;
  overflow: hidden;
`;
export const DesktopHeader = Styled.div`
  width: 100%;
`;
export const DesktopView = Styled.div`
  padding: 0px;
  max-width: 80%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);
`
export const IntroductSection = Styled.section`
  padding: 50px 0px;      
`;