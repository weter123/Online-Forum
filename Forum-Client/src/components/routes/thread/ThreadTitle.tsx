import React, { FC, useEffect, useState } from "react";

interface ThreadTitleProps {
  title?: string;
  readonly: boolean;
  sendOutTitle: (title: string) => void;
}

const ThreadTitle: FC<ThreadTitleProps> = ({ title, readonly, sendOutTitle }) => {
    const [currentTitle, setCurrentTitle] = useState("");

    useEffect(() => {
        setCurrentTitle(title || "");
    }, [title])
    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.target.value);
        sendOutTitle(e.target.value);
    };
    return (
        <div className="thread-title-container">
            <strong>Title</strong>
            <div className="field">
                <input
                    type="text"
                    value={currentTitle}
                    onChange={onChangeTitle}
                    readOnly = {readonly}
                />
            </div>
        </div>
    );
};

export default ThreadTitle;