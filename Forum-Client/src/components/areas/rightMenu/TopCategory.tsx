import React,{FC,useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import CategoryThread from "../../../models/CategoryThread";


interface TopCategoryProps{
    topCategories: Array<CategoryThread>;
}

const TopCategory: FC<TopCategoryProps> =({topCategories})=>{
    const [threads,setThreads] = useState<JSX.Element | undefined>();  

    const navigate = useNavigate();
    const onClickShowThread = (e: React.MouseEvent<HTMLDivElement>, id: string )=> {
        navigate("/thread/" + id);
    };
    useEffect(()=>{
        if(topCategories && topCategories.length > 0){
            const newThreadElements = topCategories.map(top =>
                <li key={top.threadId}>
                    <span className= "clickable-span" onClick={(e: React.MouseEvent<HTMLDivElement>)=> onClickShowThread(e, top.threadId)}>
                        {top.title}
                    </span>
                </li>
            );
            setThreads(<ul className="topcat-threads">
                    {newThreadElements}
                </ul>
            );
        }
    }, [topCategories]);
    return (
        <div className="topcat-item-container">
            <div>
                <strong>{topCategories[0].categoryName}</strong>
            </div>
            {threads}
        </div>
    )
}

export default TopCategory;