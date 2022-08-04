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

# Development Log
2022-08-02: committed Client and Server folders into the repository. setting up GraphQL on the server side.
2022-08-03: completed base setup of GraphQL. created resolvers for createThread, getThreadById and getThreadByCategoryID calls. Working on createThreadPoint Call.

