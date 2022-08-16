import React, { useEffect } from 'react';
import './App.css';
import Home from "./components/routes/Home";
import Thread from './components/routes/thread/Thread';
import { Route, Routes} from 'react-router-dom';
import UserProfile from './components/routes/UserProfile';
import { gql, useQuery } from '@apollo/client';
import { useAppDispatch } from './hooks/useHooks';
import { ThreadCategories } from './store/categories/Reducer';
import useRefreshReduxMe from './hooks/useRefreshReduxMe';

const GetAllCategories = gql `
    query getAllCategories {
        getAllCategories {
            id
            name
        }
    }
`;
function App() {
  const { data: categoriesData }= useQuery(GetAllCategories);
  const {execMe, updateMe} = useRefreshReduxMe();
  const dispatch = useAppDispatch();

  useEffect(()=> {
    execMe();
  }, [execMe]);

  useEffect(()=> {
    updateMe();
  }, [updateMe]);

  
  useEffect(() => {
    if(categoriesData && categoriesData.getAllCategories) {
      dispatch({
        type: ThreadCategories,
        payload: categoriesData.getAllCategories,
      });
    }
  },[ dispatch, categoriesData])

  return (

    <Routes>
      <Route  path="/" element = {<Home  />} />
      <Route path="/categorythreads/:categoryId" element = {<Home  />} />
      <Route path="/thread/:id" element = {<Thread />} />
      <Route path="/thread" element = {<Thread />} />
      <Route path="/userprofile/:id" element = {<UserProfile />} />
    </Routes>

  );
}


export default App;
