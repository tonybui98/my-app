import Styled from 'styled-components';
import {Link} from 'react-router-dom';

interface PropertiveInteface {
  data: any
}

const ListTemplates = (props:PropertiveInteface) => {
  let href : string = props.data.link.replace('https://southteam.vn','');
  let id: number = props.data.id; 
  return  (
    <Templates>
      <StyledLink state={id} to={href}>
        <TemplatesThumbnail className='shadow'>
          <img className="w-100" src={props.data.featured_image_src} />
        </TemplatesThumbnail>
        <TemplatesTitle>{props.data.title.rendered}</TemplatesTitle>
      </StyledLink>
    </Templates>
  );
};

export default ListTemplates;

export const TemplatesThumbnail = Styled.div`
  margin-bottom: 15px;
  height: 300px;
  overflow: hidden;
  transition: all .3s ease-in-out;
  display: block;
`;

export const Templates = Styled.div`
  margin-bottom: 35px;
  &:hover{
    ${TemplatesThumbnail} {
      transform: translateY(-10px);
      transition: all .3s ease-in-out;
    }
  }
`;
export const StyledLink = Styled(Link)`
  text-decoration: none;
`;
export const TemplatesTitle = Styled.p`
  font-size: 18px;
  color: black;
`;