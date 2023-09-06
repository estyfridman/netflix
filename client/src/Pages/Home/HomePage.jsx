import React, { useEffect, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext.js';
import { homePageReducer, initialStateHomeReducer } from '../../Reducer/HomePageReducer.js';
import axios from 'axios';
import { GET_REQUEST, GET_SUCCESS, GET_FAIL, ADD_TO_MY_LIST } from '../../Reducer/Actions.js'
import List from '../../Components/List/List.jsx';
import Loading from '../../Components/loading/loading.jsx';
import Error from '../../Components/error/error.jsx';
import './HomePage.scss';
import Navbar from '../../Components/navbar/navbar.jsx';
import Featured from '../../Components/featured/Featured';

const HomePage = ({ type }) => {
  const navigate = useNavigate();
  const { user, myList } = useContext(AuthContext)
  const [{ loading, error, lists }, dispatch] = useReducer(homePageReducer, initialStateHomeReducer);

  useEffect(() => {
    const getList = async () => {
      try {
        const results = await axios.get(`/api/lists/get?type=${user._id}`, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
        console.log(results);
        if (user.token){
          var data = results.data[0];
          if (data) dispatch({ type: ADD_TO_MY_LIST, payload: data });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [user]);


  useEffect(() => {
    const getRandomLists = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const results = await axios.get(`/api/lists/get${type ? `?type=${type}` : ''}`,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(results);
        dispatch({
          type: GET_SUCCESS,
          payload: results.data.sort(() => Math.random() - 0.5),
        });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: error.message });
      }
    };
    getRandomLists();
  }, [type]);


  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} className="featured" />
      <div className='lists-class'>
         {myList && myList.contents && myList.contents.length > 0 ?
          (<List list={myList} />)
          : null}

        {loading ?
          (<Loading />)
          : error ?
            (<Error error={error} />)
            : (lists.map((list, i) => (
              <List list={list} key={i} />
            )))}
      </div>
    </div>
  );
}

export default HomePage;
