import React, { useEffect } from 'react';
import './App.css';
import Home from "./components/routes/Home";
import Thread from './components/routes/thread/Thread';
import { Route, Routes} from 'react-router-dom';
import UserProfile from './components/routes/UserProfile';
import { gql, useQuery } from '@apollo/client';
import { useAppDispatch } from './hooks/useHooks';
import { userProfile } from './store/user/Reducers';
import { ThreadCategories } from './store/categories/Reducer';

const GetAllCategories = gql `
    query getAllCategories {
        getAllCategories {
            id
            name
        }
    }
`;
function App() {
  const { data }= useQuery(GetAllCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: userProfile,
      payload: {
        id: 1,
        userName: "testUser",
      },
    });

    if(data && data.getAllCategories) {
      dispatch({
        type: ThreadCategories,
        payload: data.getAllCategories,
      });
    }
  },[ dispatch, data])

  return (

    <Routes>
      <Route  path="/" element = {<Home  />} />
      <Route path="/categorythreads/:categoryId" element = {<Home  />} />
      <Route path="/thread/:id" element = {<Thread />} />
      <Route path="/userprofile/:id" element = {<UserProfile />} />
    </Routes>

  );
}


export default App;
