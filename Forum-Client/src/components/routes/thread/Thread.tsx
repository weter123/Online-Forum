import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Thread.css"
import ThreadModal from "../../../models/Thread";
import Nav from "../../areas/Nav";
import ThreadHeader from "./ThreadHeader";
import ThreadCategory from "./ThreadCategory";
import ThreadTitle from "./ThreadTitle";
import ThreadBody from "./ThreadBody";
import ThreadResponsesBuilder from "./ThreadResponsesBuilder";
import ThreadPointsBar from "../../points/ThreadPointsBar";
import { gql, useLazyQuery } from "@apollo/client";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import ThreadPointsInline from "../../points/ThreadPointInline";

const GetThreadById = gql `
    query GetThreadById($id: ID!) {
        getThreadById(id : $id){
        ... on EntityResult {
            messages
        }
        ... on Thread {
            id
            user {
                id
                userName
            }
            lastModifiedOn
            title
            body
            points
            category {
                id
                name
            }
            threadItems {
                id
                body
                points
                user {
                    id
                    userName
                }
            }
        }
    }
}
`;
const Thread= () => {
    const { width } = useWindowDimensions();
    const [execGetThreadById, {data: threadData}] = useLazyQuery(GetThreadById, {fetchPolicy: "no-cache"})
    const [thread,setThread] = useState<ThreadModal | undefined>();
    const{id} = useParams();
    const [readOnly, setReadOnly] = useState(false);

    const refreshThread = () =>{
        console.log("Thread id", id);
      
        if(id){
            const idNum:number = +id;
            if( idNum >0){
                execGetThreadById( {
                    variables: {
                        id,
                    },
                });
            }
        }
    };

    useEffect(() =>{
        console.log("Thread id", id);
      
        if(id){
            const idNum:number = +id;
            if( idNum >0){
                execGetThreadById( {
                    variables: {
                        id,
                    },
                });
            }
        }
    },[id, execGetThreadById]);

    useEffect(() => {
         console.log("threadData", threadData);
         if(threadData && threadData.getThreadById) {
            setThread(threadData.getThreadById);
            setReadOnly(true);
         }
         else{
            setThread(undefined)
            setReadOnly(false);
         }
    },[threadData])

    return (
        <div className="screen-root-container">
            <div className="thread-nav-container">
                <Nav />
            </div>
            <div className="thread-content-container">
                    
                <div className="thread-content-post-container">
                    {width <= 768 && thread ? (
                        <ThreadPointsInline
                            points={thread?.points || 0}
                            threadId={thread?.id}
                            refreshThread={refreshThread}
                            allowUpdatePoints={true}
                        />
                    ) : null}
                    <ThreadHeader
                        userName={thread?.user.userName}
                        lastModifiedOn={thread ? thread.lastModifiedOn : new Date()}
                        title={thread?.title}
                    />
                     <ThreadCategory category ={thread?.category} />
                     <ThreadTitle title={thread?.title} />
                     <ThreadBody body={thread?.body} readOnly = {readOnly} />
                </div>
                <div className="thread-content-points-container">
                    <ThreadPointsBar
                        points={thread?.points || 0}
                        responseCount ={thread && thread.threadItems && thread.threadItems.length}
                        threadId = {thread?.id || "0"}
                        allowUpdatePoints = {true}
                        refreshThread = {refreshThread}
                    />
                </div>
                <div className="thread-content-response-container" >
                    <hr className="thread-section-divider" />
                    <ThreadResponsesBuilder threadItems={thread?.threadItems} readOnly = {readOnly} />
                </div>
            </div>
        </div>
      );
};
    
export default Thread;


