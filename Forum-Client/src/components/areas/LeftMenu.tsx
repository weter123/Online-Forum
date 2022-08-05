import React, {useEffect,useState} from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import Category from "../../models/Category"
import { getCategories } from "../../services/DataServices";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GetAllCategories = gql `
    query getAllCategories {
        getAllCategories {
            id
            name
        }
    }
`;
const LeftMenu = () => {
    const {loading,error,data} = useQuery(GetAllCategories);
    const {width} = useWindowDimensions();
    const [categories, setCategories] = useState<JSX.Element>(
        <div>Left Menu</div>
    )
    useEffect(() => {
        if(loading) {
            setCategories(<span> Loading ...</span>);
        }
        else if(error){
            setCategories(<span> Error occurred while loading categories ...</span>);
        } else {
            if(data && data.getAllCategories) {
                const cats = data.getAllCategories.map((cat: any) => {
                    return <li key= {cat.id}>
                        <Link to={`/categorythreads/${cat.id}`}> {cat.name}</Link>
                    </li>;
                });
                setCategories(<ul className= "category">{cats}</ul>)
            }
        }
    },[data])
    /*
    useEffect(()=>{
        getCategories()
        .then((categories:Array<Category>) =>{
            const cats = categories.map((cat)=> {
                return <li key={cat.id}>{cat.name}</li>
            });
            setCategories(<ul className="category">{cats}</ul>);
        })
        .catch((err) => {
            console.log(err);
        });
    },[]);
    */

    if(width <= 768){
        return null;
    }
    return <div className='leftmenu'>{categories}</div>;
}

export default LeftMenu;