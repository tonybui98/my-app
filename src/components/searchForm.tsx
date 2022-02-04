import {useEffect, useState} from 'react';
import {Form, InputGroup , Button} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import { danhmucAsync, dataCategory, statusCategory} from '../api/Category';
import {SearchOutline} from 'react-ionicons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {Link} from 'react-router-dom';
import Styled from 'styled-components';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser'

const FetchURL:string = 'https://southteam.vn/wp-json/wp/v2/categories?term=danh-muc';

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
const sampleContainer = {
  maxHeight: "450px"
};
const SearchResultAr = (props:any) => {
  return (
    <>
    <p className='text-sm text-nuted'>Có {props.counter} kết quả được tìm thấy</p>
    <PerfectScrollbar
       style={sampleContainer}
      >
    <ul className='list-unstyled'>
      {
        props.data.map((val:any, index:number) => {
          let href : string = val.url.replace('https://southteam.vn','');
          return(
            <ListResult className="dropdown" key={index}>
               <div className="d-flex flex-wrap gap-3">
                  <ThumbnailResult className="rounded">
                      <img className="w-100" src={val._embedded.self[0].featured_image_src} />
                  </ThumbnailResult>
                  <ResultContent>
                    <ResultTitle to={href}> {val.title} </ResultTitle>
                    {val._embedded.self[0].excerpt.rendered ? <p>{ReactHtmlParser(val._embedded.self[0].excerpt.rendered)}</p> : ''}
                    <ListResultTerm data={val._embedded.self[0].term} />
                  </ResultContent>
              </div>
            </ListResult>
          )
        })
      }
    </ul>
  </PerfectScrollbar>
  </>
  );
} 

const SearchForm = () => {

  const dispatch = useAppDispatch();
  const listCategory:any = useAppSelector(dataCategory);
  const statusCategoryFr:string = useAppSelector(statusCategory);
  interface searchQueryType {
    category:number,
    searchParams:string,
  }

  const [searchQuery, setSearchQuery] = useState<searchQueryType>({
    category: 0,
    searchParams: '',
  });
  const [searchCategory, setSearchCategory] = useState<any>(0);
  const [searchResult, setSearchResult] = useState<[]>([]);
  const [countSearchResult, setCountSearchResult] = useState<number>(0);
  const handleSearchQuery = (e:any) => {
    let updatedValue = {};
    updatedValue = {searchParams:e.target.value};
    setSearchQuery(searchQuery => ({
          ...searchQuery,
          ...updatedValue
        }));
    }

  useEffect(() => {
    if(statusCategoryFr === 'idle'){
      dispatch(danhmucAsync(FetchURL));
    }
  }, [statusCategoryFr])

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery])

  const Submit = async () => {
    const FetchURL:string = `https://southteam.vn/wp-json/wp/v2/search?search=${searchQuery.searchParams}&subtype=mau-website-demo&danh-muc=${searchCategory}&_embed&per_page=20`;
    const response:any = await axios.get(FetchURL).then((res:any) => {
      return res
    });
    setSearchResult(response.data);
    setCountSearchResult(response.request.getResponseHeader('x-wp-total'));
  }

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult])

  interface DataInterface{
      name:string,
      acf: any,
      count: number,
      term_id:number,
  }

  return (
    <>
      <Form onSubmit={(e) => {
        e.preventDefault();
        Submit();
      }}>
        <InputGroup>
          <Form.Control 
              className="bg-light rounded-0"
              type="text"
              id="inputSeach"
              value={searchQuery.searchParams} onChange={(e:any) => handleSearchQuery(e)}
            />
          <Button 
            type="submit"
            variant="dark rounded-0">
              <SearchOutline color="white"/>
              </Button>
          </InputGroup>
      </Form>
      {
        searchResult.length != 0 ? 
          <SearchResult>
            <SearchResultAr data={searchResult} counter={countSearchResult}/>
          </SearchResult>
        :  <SearchResult>
            <p className='py-3 text-center'>Không có kết quả</p>
          </SearchResult>
      }
      {
        countSearchResult > 20 ? <p className="mt-3 fw-bolder text-center"><Link className="text-decoration-none" to={searchQuery.searchParams ? '/tim-kiem/?search=' + searchQuery.searchParams : ''}>Tìm kiếm nhiều hơn</Link></p> : ''
      }
    </>
  )
}

export default SearchForm; 

export const SearchResult = Styled.div`
  padding: 20px 0px;
`;
export const ListResult = Styled.li`
  margin-bottom: 17px;
  padding: 10px;
  border-radius: 0.25rem;
`;
export const ResultContent = Styled.div`
  width: calc(100% - 120px);
`;

export const ResultTitle = Styled(Link)`
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-transform: uppercase;
  text-decoration: unset;
  color: #bfbfbf;
`;
export const StyledTermLink = Styled(Link)`
  background: #333333;
  font-size: 10px;
  color: #bfbfbf;
  text-decoration: unset;
  display: inline-block;
  padding: 2px 5px;
  border-radius: 5px;
  margin-right: 5px;
`;
export const ThumbnailResult = Styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  box-shadow: 0px 0px 10px -3px;
`;
