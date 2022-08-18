import React, { FC, useEffect, useState } from "react";
import RichEditor, { getTextFromNodes } from "../../editor/RichEditor";
import UserNameAndTime from "./UserNameAndTime";
import ThreadPointsInline from "../../points/ThreadPointInline";
import { gql, useMutation } from "@apollo/client";
import { useAppSelector } from "../../../hooks/useHooks";
import {Node} from "slate";
import Thread from "../../../models/Thread";

const CreateThreadItem = gql`
    mutation createThreadItem(
        $userId: ID!,
        $threadId: ID!,
        $body: String!
    ) {
        createThreadItem(
            userId: $userId, 
            threadId: $threadId,
            body:  $body
        ) {
            messages
        }
    }
`

interface ThreadResponseProps {
    body?:string;
    userName?: string;
    lastModifiedOn?: Date;
    points: number;
    readOnly: boolean;
    threadItemId: string;
    thread?: Thread;
    refreshThread?: () => void;
}

const ThreadResponse: FC<ThreadResponseProps> = ({body,userName, lastModifiedOn, points, readOnly, threadItemId, thread, refreshThread,}) => {
    const user = useAppSelector(state => state.user);
    const [execCreateThreadItem] = useMutation(CreateThreadItem);
    const [postMsg, setPostMsg] = useState("");
    const [bodyToSave, setBodyToSave] = useState("");

    useEffect(() => {
        if(body) {
            setBodyToSave(body || "");
        }
    }, [body]);

    const onClickPost = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        e.preventDefault();
    
        if (!user) {
            setPostMsg("Please login before adding a response.");
        } else if (!thread) {
            setPostMsg("A parent thread must exist before a response can be posted.");
        } else if (!bodyToSave) {
            setPostMsg("Please enter some text.");
        } else {
            await execCreateThreadItem({
                variables: {
                    userId: user ? user.user.id : "0",
                    threadId : thread.id,
                    body: bodyToSave,
                },
            });
            refreshThread && refreshThread();
        }
    };
    
    const receiveBody = (body: Node[]) => {
        const newBody =  getTextFromNodes(body);
        if(bodyToSave !== newBody){
            setBodyToSave(newBody);
        }
    };

    return(
        <div>
            <div>
                <UserNameAndTime userName={userName} lastModifiedOn= {lastModifiedOn} />
                {threadItemId}
                {readOnly ? (
                    <span style={{marginLeft: "1em"}}>
                        <ThreadPointsInline 
                            points={points || 0} 
                            threadItemId = {threadItemId}
                            refreshThread= {refreshThread}
                            allowUpdatePoints ={ true}
                        />
                    </span>   
                ): null}         
            </div>
            <div className="thread-body-editor">
                <RichEditor 
                    existingBody={bodyToSave} 
                    readOnly= {readOnly} 
                    sendOutBody = {receiveBody}
                />
            </div>
            {!readOnly && thread ? (
                <>
                    <div style={{ marginTop: ".5em" }}>
                        <button className="action-btn" onClick={onClickPost}>
                        Post Response
                        </button>
                    </div>
                    <strong>{postMsg}</strong>
                </>
            ) : null }
        </div>
    )
}

export default ThreadResponse;