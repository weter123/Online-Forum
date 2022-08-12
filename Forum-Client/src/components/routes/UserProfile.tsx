import React, { useReducer, useEffect, useState } from "react";
import PasswordComparison from "../auth/common/PasswordComparison";
import userReducer from "../auth/common/UserReducer";
import "./UserProfile.css";
import Nav from "../areas/Nav";
import Thread from "../../models/Thread";
import { Link } from "react-router-dom";
import ThreadItem from "../../models/ThreadItem";
import { useAppSelector } from "../../hooks/useHooks";
import { gql, useMutation } from "@apollo/client";

const ChangePassword = gql `
    mutation ChangePassword($newPassword: String!) {
        changePassword (newPassword: $newPassword)
    }
`;
const UserProfile = () => {
    const [{userName, password, passwordConfirm, resultMsg, isSubmitDisabled },
        dispatch,] = useReducer(userReducer, {
            userName: "",
            password: "*********",
            passwordConfirm: "*********",
            resultMsg: "",
            isSubmitDisabled: true,
    });

    const user = useAppSelector(state =>state.user);
    const [threads, setThreads] =useState<JSX.Element | undefined>();
    const [threadItems, setThreadItems] = useState<JSX.Element | undefined>();
    const [execChangePassword] = useMutation(ChangePassword);

    useEffect(() => {
        if (user && user.user) {
            dispatch({
            type: "userName",
            payload: user.user.userName,
            });

            const threadList = user.user.threads?.map((th:Thread) => {
                return(
                    <li key={`user-th-${th.id}`}>
                        <Link to={`/thread/${th.id}`} className="userprofile-link">
                            {th.title}
                        </Link>
                    </li>
                )
            });
            setThreads( !user.user.threadItems || user.user.threadItems.length 
                === 0 ? undefined : (<ul>{threadList}</ul>
                )
            );

            const threadItemList = user.user.threadItems?.map((ti: ThreadItem) => (
                <li key={`user-th-${ti.threadId}`}>
                    <Link to={`/thread/${ti.threadId}`} className="userprofile-link">
                        {ti.body.length <= 40 ? ti.body : ti.body.substring(0.40) + " ..."}
                    </Link>
                </li>
            ));
            setThreadItems( !user.user.threadItems || user.user.threadItems.length 
                === 0 ? undefined : (<ul>{threadItemList}</ul>
                )
            );
        }
        else {
            dispatch({
                type: "userName",
                payload: "",
            });
            setThreads(undefined);
            setThreadItems(undefined);
        }
    
    }, [user]);

    const onClickChangePassword = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            const {data: changePasswordData} = await execChangePassword({
                variables: {
                    newPassword: password,
                }
            });
            dispatch({
                type: "resultMsg",
                payload: changePasswordData ? changePasswordData.changePassword: "",
            });
    }
    return (
        <div className="screen-root-container">
            <div className="thread-nav-container">
                <Nav />
            </div>
            <form className="userprofile-content-container">
                <div>
                    <strong>User Profile</strong>
                    <label style={{ marginLeft: ".75em" }}>{userName}</label>
                </div>
                <div className="userprofile-password">
                    <div>
                        <PasswordComparison
                            dispatch={dispatch}
                            password={password} 
                            passwordConfirm={passwordConfirm}                            //passwordConfirm={passwordConfirm}
                        />
                        <button 
                            className="action-btn" 
                            disabled={isSubmitDisabled}
                            onClick= {onClickChangePassword}>
                            Change Password
                        </button>
                    </div>
                    <div style={{ marginTop: ".5em" }}>
                        <label>{resultMsg}</label>
                    </div>
                </div>
                <div className="userprofile-postings">
                    <hr className="thread-section-divider" />
                    <div className="userprofile-threads">
                        <strong>Threads Posted</strong>
                        {threads}
                    </div>
                    <div className="userprofile-threadIems">
                        <strong>ThreadItems Posted</strong>
                        {threadItems}
                    </div>
                </div>
            </form>
        </div>
      );

};

export default UserProfile;