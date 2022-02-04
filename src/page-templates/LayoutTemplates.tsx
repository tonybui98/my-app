import Styled from 'styled-components';
import {Container} from 'react-bootstrap';
import LayoutHome from '../components/LayoutHome';

const LayoutTemplates = () => {
  return (
    <Section>
      <Container>
        <LayoutHome />
      </Container>
    </Section>
  )
}

export default LayoutTemplates
export const Section = Styled.section`
  width: 100%;
  padding: 50px 0px;
`
export const Templates = Styled.div`
  box-shadow: 0px 0px 5px -3px;
  margin-bottom: 35px;
`;
export const TemplatesThumbnail = Styled.div`
  border-radius: 5px;
  height: 300px;
  overflow: hidden;
`;
export const TemplatesTitle = Styled.div`

`;