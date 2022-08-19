# Online-Forum
Online Forum Application project based on the project outlined in the book "Full-Stack React, TypeScript, and Node: Build cloud-ready web applications using React 17 with Hooks and GraphQL" by David Choi. I chose to do this project to better learn how TypeScript is used in the development of Applications and to get better understanding of the backend side of web development.

In this repository, I combined Forum Client and Forum Server to develop a fullstack version of the project.

  - Forum Client: https://github.com/weter123/Online-Forum-Client
  - Forum Server: https://github.com/weter123/Online-Forum-Server

The Online Forum Project was designed using tools and frameworks versions from 2020. due to advancement in software development, some of the dependancies used in the project are depecrated and outdated. One of my goals is to update the whole project with newer versions of the depecrated dependancies.  

# Client Side Changes to the Orginal Project Design

Some of the dependancies provided for the project are out of date. as such, I took measures to implement the newest versions when possible.

  - Utilized redux-toolkit based on the recomemndation of Redux developrs:

    - replaced createStore with configureStore

    - Used createSlice when creating reducer functions

  - Migrated from React Router v5 to React Router v6

    - Replaced Switch With Routes.

    - Removed exact and render and replaced them with element.

    - Replaced useHistory with useNavigate.
    
Due to issues with installation of react-dropdown, I am using react-select instead.

# ToDo List

Current Todos:

  - Fix Remianing Bugs in the project:
  
      - Point System

Future Todos:

  - Deploy Application to AWS.
  
  - update application to utilize the latest recommended dependencies when feasable.
  
  
  
# Development Log
2022-08-02: Committed Client and Server folders into the repository. setting up GraphQL on the server side.

2022-08-03: Completed base setup of GraphQL. created typedefs, resolvers and function calls for createThread, getThreadById and getThreadByCategoryID calls. Working on updateThreadPoint Call.

2022-08-04: Created typedef, resolvers and function calls for updateThreadPont, updateThreadItemPoint, register, login, and logout. fixed bug that caused userId to remain undefined even when altered.

2022-08-05: Connected the client-side to The server-side using Apollo Client.  created resolver. TypeDef and Function call for getAllCategories

2022-08-06: Created and updated DefTypes, Resolvers and function calls getThreadLatest and getThreadsByCategoryId. Set up their gql queries in the client.

2022-08-07: Set up  GraphQL queries for Login Logout and getGategories in the client. created categoryReducer and made Changes to userReducer to accomidate the gql queries.

2022-08-08:   Created and updated DefType, Resolver and function call changePassword. set up GraphQL Mutation for change Password in client. found bug that prevented input change in the Password Confirm input field.

2022-08-09: Update Thread and ThreadItem Objects to accomidate points system and the changes made to User Object and userReducer. Set up getThreadById GraphQL Query.

2022-08-10: Utilized GraphQL queries to fetch data threads and display them in the client. 

2022-08-16: Completed the Project -> Require Debugging

2022-08-17: fixed bugs in Registeration and PasswordComparsion components. fixed bug that crashed the website when using Thread route/s


