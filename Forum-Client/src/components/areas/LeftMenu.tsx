import React, {useEffect,useState} from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useHooks";


const LeftMenu = () => {
    const categoriesState = useAppSelector(state => state.categories);
    const {width} = useWindowDimensions();
    const [categories, setCategories] = useState<JSX.Element>(
        <div>Left Menu</div>
    )

    useEffect(() => {
        if(categoriesState.categories){
            const cats = categoriesState.categories.map((cat: any) => {
                return (
                    <li key={cat.id}>
                        <Link to={`/categorythreads/${cat.id}`}>{cat.name}</Link>
                    </li>
                );
            });
            setCategories(<ul className="category">{cats}</ul>)
        }
    }, [categoriesState]);
    

    if(width <= 768){
        return null;
    }
    return <div className='leftmenu'>{categories}</div>;
}

export default LeftMenu;