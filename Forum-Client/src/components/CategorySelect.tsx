import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAppSelector } from "../hooks/useHooks";
import Category from "../models/Category";

const defaultLabel = "Select a category";

const defaultOption = {
    value: "0",
    label: defaultLabel
};

interface Option {
    value: string;
    label: string;
}
class CategorySelectProps {
    sendOutSelectedCategory?: (cat: Category) => void;
    navigate?: boolean = false;
    preselectedCategory?:Category;
}
const CategorySelect: FC<CategorySelectProps> = ({
    sendOutSelectedCategory,
    navigate,
    preselectedCategory,
}) => {
    const categories = useAppSelector(state => state.categories);
    const [categoryOptions, setCategoryOptions] = useState<Array< Option>>([defaultOption]);
    const [selectedOption, setSelectedOption] = useState<Option>(defaultOption);

    const nav = useNavigate();

    useEffect(() => {
        if(categories.categories) {
            const catOptions: Array<Option> = categories.categories.map((cat: Category) =>{
                return{
                    value: cat.id,
                    label: cat.name,
                };
            });
            setCategoryOptions(catOptions);
            setSelectedOption({
                value: preselectedCategory ? preselectedCategory.id : "0",
                label: preselectedCategory ? preselectedCategory.name: defaultLabel,
            });
        }
    }, [categories, preselectedCategory]);
    



    const onChangeSelect = (selected : any) => {
        setSelectedOption(selected);
        if(sendOutSelectedCategory){
            sendOutSelectedCategory(
                new Category(selected.value, selected.label?.valueOf().toString() ?? "")
              );
        }

        if(navigate) {
            nav(`/categorythreads/${selected.value}`, { replace: true });
        }
    };
    
    return(
        <Select
            className="thread-category-dropdown"
            options={categoryOptions}
            onChange={onChangeSelect}
            value={selectedOption}
            placeholder="Select a category"
           />
    )
}

export default CategorySelect;