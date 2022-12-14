import React, {FC} from "react";
import Category from "../../../models/Category";
import CategorySelect from "../../CategorySelect";
interface ThreadCategoryProps {
    category?: Category;
    sendOutSelectedCategory: (cat: Category) => void;
}

const ThreadCategory: FC<ThreadCategoryProps> = ({category, sendOutSelectedCategory}) => {

    return(
        <div className ="thread-category-container">
            <strong>{category?.name}</strong>
            <div style = {{ marginTop : "1em"}}>
                <CategorySelect
                    preselectedCategory={category}
                    sendOutSelectedCategory={sendOutSelectedCategory}
                />
            </div>
        </div>
    );
};
export default ThreadCategory;