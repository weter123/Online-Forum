# Online-Forum
Online Forum Application project based on the project outlined in the book "Full-Stack React, TypeScript, and Node: Build cloud-ready web applications using React 17 with Hooks and GraphQL" by David Choi. I chose to do this project to better learn how TypeScript is used in the development of Applications and to get better understanding of the backend side of web development.

In this repository, I combined Forum Client and Forum Server to develop a fullstack version of the project.

  - Forum Client: https://github.com/weter123/Online-Forum-Client
  - Forum Server: https://github.com/weter123/Online-Forum-Server
  
Technologies used:
  - **React** for Front-end Development.
  - **Redux** to store user and category states globaly.
  - **GraphQL** used as Web API insted of REST API.
  - **ApolloClient** to connect to React and enable components to access GraphQl data.
  - **Expressjs** to create session state.
  - **Redis** to store session state data.
  - **Postgres** used as database. Stores user and thread data.
  - **TypeORM** to link the wep application to postgres database.

> The Online Forum Project was designed using tools and frameworks versions from 2020. due to advancement in software development, some of the dependancies used in the project are depecrated and outdated. One of my goals is to update the whole project with newer versions of the depecrated dependancies.  

# Client Side Changes to the Orginal Project Design

Some of the dependancies provided for the project are out of date. as such, I took measures to implement the newest versions when possible.

  - Utilized redux-toolkit based on the recomemndation of Redux developrs:

    - replaced createStore with configureStore

    - Used createSlice when creating reducer functions

  - Migrated from React Router v5 to React Router v6

    - Replaced Switch With Routes.

    - Removed exact and render and replaced them with element.

    - Replaced useHistory with useNavigate.
    
> Due to issues with installation of react-dropdown, I am using react-select instead.

# ToDo List

Current Todos:

  - Fix Remianing Bugs in the project:
  
      - Point System
      
      - RichEditor

Future Todos:

  - Deploy Application to AWS.
  
  - update application to utilize the latest recommended dependencies when feasable.
  
  
# Bugs to fix
- Point System:

    - when attempting to increment/descrement points of threadItem, no change occurs.

- RichEditor:

    - when opening/reloading thread page, creating new threadItems wont work unless certain steps are followed:
      1) click on post resposne  button.
      2)  enter text with length of atleast 5 characters.
      3)  then, click on post resposne  button.
     
# Development Log
2022-08-02: Committed Client and Server folders into the repository. setting up GraphQL on the server side.

2022-08-03: Completed base setup of GraphQL. created typedefs, resolvers and function calls for createThread, getThreadById and getThreadByCategoryID calls. Working on updateThreadPoint Call.

2022-08-04: Created typedef, resolvers and function calls for updateThreadPont, updateThreadItemPoint, register, login, and logout. fixed bug that caused userId to remain undefined even when altered.

2022-08-05: Connected the client-side to The server-side using Apollo Client.  created resolver. TypeDef and Function call for getAllCategories

2022-08-06: Created and updated DefTypes, Resolvers and function calls getThreadLatest and getThreadsByCategoryId. Set up their gql queries in the client.

2022-08-07: Set up  GraphQL queries for Login Logout and getGategories in the client. created categoryReducer and made Changes to userReducer to accomidate the gql queries.

2022-08-08:   Created and updated DefType, Resolver and function call changePassword. set up GraphQL Mutation for change Password in client. found bug that prevented input change in the Password Confirm input field.

2022-08-09: Update Thread and ThreadItem Objects to accommodate points system and the changes made to User Object and userReducer. Set up getThreadById GraphQL Query.

2022-08-10: Utilized GraphQL queries to fetch data threads and display them in the client. 

2022-08-11: Fixed bug that prevented date from displaying.

2022-08-12: set up point system (threadpoints and threadItempoints) - need debugging.

2022-08-16: utilized GraphQL queries and mutation to create Threads and fetch threads by Id and Category. Completed the Project.

2022-08-17: fixed bugs in Registeration and PasswordComparsion components. fixed bug that crashed the website when using Thread route/s.

2022-08-18: fixed bug in RichEditor that added the stringified JSON of Slate node instead of just text.

2022-08-21: fixed some bugs in the point system. Incrmenting/decrementing thread points and threadItem points no longer send "bad request 400".

2022-08-23: added onClick function on the forum name that navigate to the homepage.

2022-08-26: fixed bug that crashed the application when a thread is open and user is not logged in. clicking thread titles in right menu  now navigate to the thread's page.


