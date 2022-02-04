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
                        {singleData.title.rendered} là {NewTermString}, được thiết kế chuyên nghiệp đẹp mắt với đầy đủ chức năng.
                      </StyledListGroup>
                      <StyledListGroup>
                      <CheckboxOutline
                          cssClasses={'me-2'}
                          color={'#27ae60'}
                          height="25px"
                          width="25px"
                        />
                        Giao diện tối ưu giúp load cực nhanh.
                      </StyledListGroup>
                      <StyledListGroup>
                      <CheckboxOutline
                          cssClasses={'me-2'}
                          color={'#27ae60'}
                          height="25px"
                          width="25px"
                        />
                        Chuẩn SEO 100% dễ dàng lên TOP google.
                      </StyledListGroup>
                      <StyledListGroup>
                      <CheckboxOutline
                          cssClasses={'me-2'}
                          color={'#27ae60'}
                          height="25px"
                          width="25px"
                        />
                        Giao diện tương thích với mọi thiết bị.</StyledListGroup>
                      <StyledListGroup>
                      <CheckboxOutline
                          cssClasses={'me-2'}
                            color={'#27ae60'} 
                            height="25px"
                            width="25px"
                          />
                      Bạn có thể tự chỉnh sửa bố cục nội dung với giao diện Drop & Drag.</StyledListGroup>
                    </ListGroup>
                        <Button size={'lg'} 
                                variant={'danger w-100 my-3 text-uppercase fw-bolder'}
                                onClick={handleShow}
                        >
                          <DownloadOutline
                              color={'#ffffff'} 
                              title={'Đăng ký mẫu'}
                              height="25px"
                              width="25px"
                              cssClasses={'mb-2 me-2'}
                            />
                          Đăng ký mẫu này
                        </Button>
                        <p className="text-center">Hoặc</p>
                        <a target={'_blank'} href={'http://southteam.vn/demo/?id=' + singleData.id}>
                          <Button size={'lg'} variant={'primary w-100 my-3 text-uppercase fw-bolder'}>
                            <DesktopOutline
                                  color={'#ffffff'} 
                                  title={'Đăng ký mẫu'}
                                  height="25px"
                                  width="25px"
                                  cssClasses={'mb-2 me-2'}
                                />
                              Trải nghiệm
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
                          <h3 className='fw-bolder mb-3'>THIẾT KẾ WEBSITE CHUYÊN NGHIỆP LÀ GÌ?</h3>
                          <Sep />
                        </Fade>
                        <Fade cascade bottom>
                          <ul className="list-unstyled">
                            <li><p className='mb-3'>Thiết kế web hay thiết kế website đơn giản là công việc tạo một trang web cho cá nhân, công ty, doanh nghiệp hoặc tổ chức. Có 2 phương thức chính để thiết kế: </p></li>
                            <li><p className='mb-3'> <strong>Thiết kế web tĩnh</strong> là sử dụng các đoạn mã HTML (HTML5), hình ảnh, Video, Audio, Flash, Javascript (jQuery) và CSS để tạo một giao diện cho trang web.</p></li>
                            <li><p className='mb-3'> <strong>Thiết kế web động</strong> là thiết kế website chuyên nghiệp, có hệ thống cơ sở dữ liệu dùng để cung cấp thông tin cho website, có khả năng quản lý dữ liệu tốt, tương tác trên hệ thống, dễ cập nhật nội dung và thêm các tính năng tiện ích quản lý cho doanh nghiệp, thân thiện với người dùng.</p></li>
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
                            <h3 className='fw-bolder mb-3'>THIẾT KẾ WEBSITE CHUYÊN NGHIỆP LÀ GÌ?</h3>
                            <Sep />
                          </Fade>
                          <Fade cascade bottom>
                            <ul className="list-unstyled">
                              <li><p className='mb-3'>Thiết kế web hay thiết kế website đơn giản là công việc tạo một trang web cho cá nhân, công ty, doanh nghiệp hoặc tổ chức. Có 2 phương thức chính để thiết kế: </p></li>
                              <li><p className='mb-3'> <strong>Thiết kế web tĩnh</strong> là sử dụng các đoạn mã HTML (HTML5), hình ảnh, Video, Audio, Flash, Javascript (jQuery) và CSS để tạo một giao diện cho trang web.</p></li>
                              <li><p className='mb-3'> <strong>Thiết kế web động</strong> là thiết kế website chuyên nghiệp, có hệ thống cơ sở dữ liệu dùng để cung cấp thông tin cho website, có khả năng quản lý dữ liệu tốt, tương tác trên hệ thống, dễ cập nhật nội dung và thêm các tính năng tiện ích quản lý cho doanh nghiệp, thân thiện với người dùng.</p></li>
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
                        <h3 className='fw-bolder mb-3'>THIẾT KẾ WEBSITE CHUYÊN NGHIỆP LÀ GÌ?</h3>
                        <Sep />
                      </Fade>
                      <Fade cascade bottom>
                        <ul className="list-unstyled">
                          <li><p className='mb-3'>Thiết kế web hay thiết kế website đơn giản là công việc tạo một trang web cho cá nhân, công ty, doanh nghiệp hoặc tổ chức. Có 2 phương thức chính để thiết kế: </p></li>
                          <li><p className='mb-3'> <strong>Thiết kế web tĩnh</strong> là sử dụng các đoạn mã HTML (HTML5), hình ảnh, Video, Audio, Flash, Javascript (jQuery) và CSS để tạo một giao diện cho trang web.</p></li>
                          <li><p className='mb-3'> <strong>Thiết kế web động</strong> là thiết kế website chuyên nghiệp, có hệ thống cơ sở dữ liệu dùng để cung cấp thông tin cho website, có khả năng quản lý dữ liệu tốt, tương tác trên hệ thống, dễ cập nhật nội dung và thêm các tính năng tiện ích quản lý cho doanh nghiệp, thân thiện với người dùng.</p></li>
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
              <Modal.Title className="fw-bolder">Tìm kiếm giao diện mẫu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <TemplatesRegisteForm data={{title: singleData.title.rendered , link:singleData.featured_image_src}}/>
            </Modal.Body>
          </Modal>
      </DocumentMeta>
    )
  } else{
    return (
      <h1 className='text-center'>Đang tải...</h1>
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