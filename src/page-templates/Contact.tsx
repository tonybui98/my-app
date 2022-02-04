import React , {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import { 
  LocationOutline, 
  PhonePortraitOutline, 
  CallOutline, 
  MailOutline, 
  PaperPlaneOutline 
}  from 'react-ionicons';
import Styled from 'styled-components';
import axios from 'axios';
import Parser from 'react-html-parser';
import Validator from 'validator';

const AddressMap = () => {
  return (
      <div className="google-map-code">
        {Parser(`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8945098927993!2d106.69244581531642!3d10.819384361356617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ec2d485255%3A0x2dd2ba4127c38822!2zMzE4LCAxNiDEkC4gUGhhbiBWxINuIFRy4buLLCBQaMaw4budbmcgMTEsIELDrG5oIFRo4bqhbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1642642547511!5m2!1svi!2s" width="100%" height="480" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`)}
      </div>
  );
}

const IconStyled = {
  color: '#e1dbc9',
  height: '25px',
  width: '25px',
}

interface FormDataStype {
  name: string,
  email: string,
  phone: string,
  message: string
}

const Contact = () => {
  const handleChangeName = (e:any) => {
    let updatedValue = {};
    updatedValue = {name:e.target.value};
    setFormData(formData => ({
          ...formData,
          ...updatedValue
        }));
    }
  const handleChangeEmail = (e:any) => {
    let updatedValue = {};
    updatedValue = {email:e.target.value};
    setFormData(formData => ({
          ...formData,
          ...updatedValue
        }));
    }
    const handleChangeMessage = (e:any) => {
      let updatedValue = {};
      updatedValue = {message:e.target.value};
      setFormData(formData => ({
            ...formData,
            ...updatedValue
          }));
      }

  const [formData , setFormData] = useState<FormDataStype>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const Submit = (props:FormDataStype) => {
    console.log('submit', props);
    if( !Validator.isEmpty(props.email) &&  !Validator.isEmpty(props.name)){
      
      const FormData = require('form-data');
  
      const data = new FormData();
      data.append('your-name', props.name);
      data.append('your-email', props.email);
      data.append('tel', props.phone);
      data.append('your-message', props.message);
  
      const config:any = {
        method: 'post',
        url: 'https://southteam.vn/wp-json/contact-form-7/v1/contact-forms/4224/feedback',
        data : data
      };
  
      axios(config)
      .then(function (response:any) {
        console.log(JSON.stringify(response.data));
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  const ValidatorEmail = () => {
    return(
      Validator.isEmpty(formData.email) ? <p className='mb-0 py-1'>Địa chỉ Email <span className="text-danger">*</span></p> :
      Validator.isEmail(formData.email) ? 
      <p className="text-success py-1 mb-0">Địa chỉ email chính xác</p>
      : 
      <p className="text-danger py-1 mb-0">Bạn phải nhập đúng địa chỉ Email</p>
    )
  }

  const ValidatorName = () => {
    return(
      Validator.isEmpty(formData.name) ? <p className='mb-0 py-1'>Tên của bạn <span className="text-danger">*</span></p>  : <p className='mb-0 py-1'>Tên của bạn <span className="text-danger">*</span></p>
    )
  }

  useEffect(() => {
    console.log(formData);
    console.log(Validator.isEmail(formData.email));
  }, [formData]);

  return (
    <SectionContact>
        <Container> 
          <Row>
            <Col xs={12} className="mb-3">
                <div className='shadow rounded mb-3'>
                   <AddressMap />
                </div>
            </Col>
              <Col xs={12} md={6}>
              <ContactWrapper className='py-3'>
                  <h3 className='fw-bolder'>ĐỊA CHỈ LIÊN HỆ</h3>
                  <Sep />
                  <h5 className='fw-bolder mb-3'>CÔNG TY TNHH TM-DV SOUTH TEAM</h5>
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
                    </Icon> 0938.049.434 (Hotline)
                    </ContactInfor>
                </li>
                <li> <ContactInfor>
                      <Icon><PhonePortraitOutline
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
              </ContactWrapper>
            </Col>
            <Col xs={12} md={6}>
              <div className='py-3'>
                 <h3 className='fw-bolder'>FORM LIÊN HỆ</h3>
                 <Sep />
                 <Form onSubmit={(e) => {e.preventDefault(); Submit(formData)}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label><ValidatorName /></Form.Label>
                      <Form.Control type="text" placeholder="Tên của bạn" value={formData.name} onChange={(e:any) => handleChangeName(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label><ValidatorEmail /></Form.Label>
                      <Form.Control type="email" placeholder="name@example.com" value={formData.email} onChange={(e:any) => handleChangeEmail(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Nội dung lời nhắn</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Nhập nội dung của bạn ở đây" value={formData.message} onChange={(e:any) => handleChangeMessage(e)}/>
                    </Form.Group>
                    <Button type="submit" variant='primary'>
                    <PaperPlaneOutline
                        color={'#ffffff'} 
                        title={'Gửi đi'}
                        height="16px"
                        width="16px"
                        cssClasses={'me-2'}
                      />
                      Gửi thông tin</Button>
                  </Form>
                  </div>
            </Col>
          </Row>
        </Container>
    </SectionContact>
  )
  ;
};

export default Contact;
export const ContactWrapper = Styled.div`
  padding: 30px;
  height: 100%;
  border-bottom: 2px solid black;
`;
export const SectionContact = Styled.section`
  width: 100%;
  padding: 50px 0px;
`;
export const Icon = Styled.div`
  display: inline-block;
  text-align: center;
  width: 35px;
  height: 35px;
  line-height: 32px;
  padding: 0px;
  border-radius: 50%;
  margin-right: 5px;
  background: black;
`;

export const ContactInfor = Styled.div`
  margin-bottom: 7px;
`;

export const Sep = Styled.span`
  width: 40px;
  height: 2px;
  background: black;
  display: block;
  margin: 10px 0px 20px 0px;
  border-radius: 4px;
`;