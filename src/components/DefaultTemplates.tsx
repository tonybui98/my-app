import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

interface PropertiveInteface {
  data: any
}

const ListResultTerm = (props:any) => {
  return (
    <ul className="list-unstyled">
      {
        props.data.map((val:any, index:number) => {
          return (
          <StyledTermLink to={'/' + val.taxonomy + '/' + val.slug}>{val.name}</StyledTermLink>
          )
        })
      }
    </ul>
  )
} 

const DefaultTemplates = (props:PropertiveInteface) => {
  let href : string = props.data.link.replace('https://southteam.vn','');
  let id: number = props.data.id; 
  return  (
    <Templates>
      <Row>
        <Col xs={12} md={5}>
          <TemplatesThumbnail>
              <img className="w-100" src={props.data.featured_image_src} />
          </TemplatesThumbnail>
        </Col>
        <Col xs={12} md={7} className="p-3">
          <TemplatesTitle>
            <Link state={id} to={href}>{props.data.title.rendered}</Link>
          </TemplatesTitle>
          <ListResultTerm data={props.data.term} />
          {props.data.excerpt.rendered ? <p>{ReactHtmlParser(props.data.excerpt.rendered)}</p> : ''}
        </Col>
      </Row>
    </Templates>
  );
};


export default DefaultTemplates;

export const StyledTermLink = Styled(Link)`
  background: #333333;
  font-size: 10px;
  color: white;
  text-decoration: unset;
  display: inline-block;
  padding: 2px 5px;
  margin-right: 5px;
`;

export const Templates = Styled.div`
  box-shadow: 0px 0px 5px -3px;
  margin-bottom: 45px;
  background: white;
  &:hover{
    img{
      box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
      transition: all .3s ease-in-out;
    }
  }
`;
export const TemplatesThumbnail = Styled.div`
  border-radius: 5px;
  height: 300px;
  overflow: hidden;
  transition: all .3s ease-in-out;
`;
export const TemplatesTitle = Styled.div`
  a{
    font-size: 18px;
    color: #bdbdbd;
    text-decoration: none;
  }
`;