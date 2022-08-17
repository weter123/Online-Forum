# Online-Forum
Online Forum Application project based on the book "Full-Stack React, TypeScript, and Node: Build cloud-ready web applications using React 17 with Hooks and GraphQL" by David Choi. I chose to do this project to better learn how TypeScript is used in the development of Applications and to get better understanding of the backend side of web development. 

the Online Forum Project was designed based on 2020 tools and frameworks. due to advancement in software development, some of the dependancies used in the project utilize depecrated and outdated versions. One of my goals is to update the whole project with newer versions of the depecrated dependancies.  

# Client Side Changes to the Orginal Project Design

some of the dependancies provided for the project are out of date. as such, I took measures to implement the newest versions when possible.

  - utilized redux-toolkit based on the recomemndation of Redux developrs:

    - used confiugreStore instead of createStore

    - used createSlice when creating reducer functions

  - Migrated from React Router v5 to React Router v6

    - used Routes instead Switch 

    - removed exact and render and replaced them with element.

    - used useNavigate instead of useHistory (testing)
    
due to issue with installation, I am using react-select instead of react-dropdown (testing)

# ToDo List

Current Todos:

  - Fix Remianing Bugs in the project:
      - Point System
      - RichEditor

Future Todos:

  - Deploy Application to AWS.
  
  - update application to utilize the latest recommended dependencies when feasable.
  
  
  
# Development Log
2022-08-02: Committed Client and Server folders into the repository. setting up GraphQL on the server side.

2022-08-03: Completed base setup of GraphQL. created resolvers for createThread, getThreadById and getThreadByCategoryID calls. Working on updateThreadPoint Call.

2022-08-04: Created resolvers for updateThreadPont, updateThreadItemPoint, register, login, and logout. fixed bug that caused userId to remain undefined even when altered.

2022-08-05: Connected the Client-side to The Server-side using Apollo Client

2022-08-07: Utilized GraphQL queries and mutations to fetch user data and enable change password functionality in the 

2022-08-10: Ctilized GraphQL queries to fetch data threads and display them in the client. 

2022-08-16: Completed the Project -> Require Debugging

2022-08-17: fixed bugs in Registeration and PasswordComparsion components. fixed bug that crashed the website when uing Thread route/s


