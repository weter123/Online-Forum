import React, {FC} from "react";
import Select from "react-select";
interface ThreadCategoryProps {
    categoryName?: string;
}
interface Option {
    value: string;
    label: string;
}

const ThreadCategory: FC<ThreadCategoryProps> = ({categoryName}) => {
    const catOptions: Array<string | Option> =[
        {
            value: "1",
            label: "Programming",

        },
        {
            value: "2",
            label: "Cooking",
        }
    ];

    const defaultOption = catOptions[0];
    const onChangeSelect =(arg: any) => {
        console.log(arg);
    };

    return(
        <div className ="thread-category-container">
            <strong>{categoryName}</strong>
            <Select
                className="thread-category-dropdown"
                options={catOptions}
                onChange={onChangeSelect}
                value={defaultOption}
                placeholder="Select a category" 
            
            />

        </div>
    )

}
export default ThreadCategory;