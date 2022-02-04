import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../app/hooks';

import {  templatesAsync, 
          dataTotalTemplate,
          dataAPITemplates,
          statusFetchPosts } from '../api/Layout';

import {  danhmucAsync, 
          dataCategory , 
          statusCategory } from '../api/Category';

import DefaultTemplates from './DefaultTemplates';
import ListTemplates from './ListTemplates';

import {Row, Col, FormSelect, Button, InputGroup} from 'react-bootstrap';
import  Styled, { createGlobalStyle } from 'styled-components';
import {Link} from 'react-router-dom'
import {ListOutline, GridOutline} from 'react-ionicons';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import ReactPaginate from 'react-paginate';

const LayoutLoading = (props:any) => {
  let Loading = [];
  for (var i = 0; i < props.perpage; i++) {
      // note: we are adding a key prop here to allow react to uniquely identify each
      // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
      Loading.push(
        <div className='col-6 col-md-4 mb-3' key={i}>
           <div className="linear-background">
           <div className="inter-right--top"></div>
        </div>
        </div>);
  }
  return(
    <>
      <GlobalStyle />
      <div className='row'>
        {Loading}
      </div>
    </>
  );
}

const LayoutHome = () => { 

  const dispatch = useAppDispatch();
  // Data layout
  const listTemplates:any = useAppSelector(dataAPITemplates);
  const totalNumberPost:number = useAppSelector(dataTotalTemplate);
  const statusPosts:string = useAppSelector(statusFetchPosts);
  // Data Categories
  const listCategories:any = useAppSelector(dataCategory);
  const statusListCategory:string = useAppSelector(statusCategory);

  const [perpage, setPerpage] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isList, setIsList] = useState<boolean>(false);
  const [firstLoading, setFirstLoading] = useState<boolean>(false);

  let FetchDataURL:string = `https://southteam.vn/wp-json/wp/v2/mau-website-demo?per_page=${perpage}&page=${currentPage ? currentPage : 1}`;
  let FetchCategoryURL:string = 'https://southteam.vn/wp-json/wp/v2/categories?term=danh-muc';
  
  useEffect(() => {
    if(statusPosts === 'idle'){
      dispatch(templatesAsync(FetchDataURL));
      setFirstLoading(true);
    }
    setTotalPage(Math.ceil(totalNumberPost/perpage));
  }, [dispatch, statusPosts]);

  useEffect(() => {
    if(statusListCategory === 'idle'){
      dispatch(danhmucAsync(FetchCategoryURL));
    }
  }, [dispatch, statusListCategory]);

  
  useEffect(() => {
    setTotalPage(Math.ceil(totalNumberPost/perpage));
    dispatch(templatesAsync(FetchDataURL));
  }, [perpage , currentPage, totalNumberPost, totalPage]);
  
  const handlePageClick = (event:any) => {
    window.scrollTo(0, 0);
    const newOffset = (event.selected * 5) % 120;
    setCurrentPage(event.selected + 1);
  };

  interface LabeledValue {
    title: any,
    featured_image_src: string,
    link: string,
    id: number,
  }

  interface CategoryData {
    name: string,
    slug: string,
    acf: any,
    link: string,
    count:number
  }

  const sampleContainer = {
    maxHeight: "500px"
  };

  interface DataInterface{
    name:string,
    acf: any,
    count: number,
    term_id:number,
  }

  return (
    <Row>
        <Col xs={12}>
            <Row className="align-items-center py-3 my-3">
              <Col>
                  <Button variant='outline-light me-2 mb-0' onClick={() => {setIsList(true)}}>
                    <ListOutline
                        color={'#00000'} 
                        title={'Layout Ngang'}
                        height="22px"
                        width="22px"
                      />
                  </Button>
                  <Button variant='outline-light mb-0' onClick={() => {setIsList(false)}}>
                    <GridOutline
                      color={'#00000'} 
                      title={'Gallery'}
                      height="22px"
                      width="22px"
                    />
                  </Button>
                </Col>
                <Col>
                  <InputGroup>
                      <FormSelect className={"selection rounded-0 me-2"} aria-label="Default select example">
                        <option value="0" selected>Lựa chọn danh mục</option>
                        {
                          listCategories.map((val: DataInterface, index:number) => {
                            return(
                              <option key={index} value={val.term_id}>{val.name}</option>
                            )
                          })
                        }
                      </FormSelect>
                      <FormSelect className='rounded-0' onChange={(e) => {setPerpage(Number(e.target.value))}}>
                        <option selected value="12">Lựa chọn số lượng</option>
                        <option value="24">16 mỗi trang</option>
                        <option value="30">24 mỗi trang</option>
                        <option value="36">36 mỗi trang</option>
                      </FormSelect>
                    </InputGroup>
                </Col>
            </Row>
            { statusPosts !== 'idle'?
            <ul className='row p-0 position-relative mt-3'>
              {listTemplates.map((val : LabeledValue, index:number) => {
                return(
                    <li className={isList ? 'd-block col-12 col-md-6' : 'd-block col-6 col-md-4'} >
                      {
                        isList ?  
                        <DefaultTemplates key={index} data={val} /> : <ListTemplates key={index} data={val} />
                      }
                    </li>
                  )
                })}
              </ul> : <LayoutLoading perpage={perpage}/>
              }
            <Col xs={12}>
                <StyledReactPaginate
                  breakLabel="..."
                  nextLabel="Kế tiếp"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={perpage}
                  marginPagesDisplayed={1}
                  pageCount={totalPage}
                  previousLabel="Trước"
                />
            </Col>
        </Col>
    </Row>
  );
};


export default LayoutHome;
export const GlobalStyle = createGlobalStyle`
@keyframes placeHolderShimmer{
  0%{
      background-position: -468px 0
  }
  100%{
      background-position: 468px 0
  }
}

.linear-background {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1000px 104px;
  height: 320px;
  position: relative;
  overflow: hidden;
}
.inter-draw{
  background: #FFF;
  width: 100%;
  height: 100px;
  position: absolute;
  top: 100px;
}
.inter-right--top{
  background: #FFF;
  width: 100%;
  height: 20px;
}
.inter-right--bottom{
  background: #FFF;
  width: 100%;
  height: 50px;
}
.inter-crop{
  background: #FFF;
  width: 20px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 100px;
}
`
export const StyledReactPaginate = Styled(ReactPaginate)`
  text-align: center;
  li{
    display: inline-block;
    &.disabled{
      a{
        background: #8e8e8e;
      }
    }
    &.selected{
      a{
        background: #e1dbc9;
        color: black !important
      }
    }
    a{
      display: block;
      min-width: 30px;
      padding: 2px 5px;
      background: #191919;
      color: #bfbfbf !important;
      text-decoration: unset;
      margin: 2px;
      transition: all .3s ease-in-out;
      &:hover{
        background: #e1dbc9;
        color: black !important;
      }
    }
  }
`;
export const Section = Styled.section`
  padding: 50px 0px;
  background: whitesmoke;
`
export const Counter = Styled.span`
  background: black;
  position: absolute;
  right: 5px;
  color: white;
  font-size: 10px;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
`;