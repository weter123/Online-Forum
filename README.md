# Online-Forum
 
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

