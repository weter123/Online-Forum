import React, { FC, useReducer} from "react";
import ReactModal from "react-modal";
import {ModalProps} from '../types/ModalProps';
import userReducer from "./common/UserReducer";
import { allowSubmit } from "./common/Helpers";
import PasswordComparison from "./common/PasswordComparison";
import { gql, useMutation } from "@apollo/client";

const RegisterMutation = gql `
    mutation register(
        $email: String!
        $userName: String!
        $password: String!
    ) {
        register(
            email: $email
            userName: $userName
            password: $password
        )
    }
`;

    const Registration : FC<ModalProps> = ({ isOpen, onClickToggle}) =>{
        const [execRegister] = useMutation(RegisterMutation);
        const[{ userName,password,email, passwordConfirm,resultMsg, isSubmitDisabled}, dispatch] = useReducer(userReducer,{
            userName: "devac",
            password: "",
            email: "admin@szhaven.com",
            passwordConfirm: "",
            resultMsg: "",
            isSubmitDisabled: true,
        });

        const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({type: "userName", payload: e.target.value});
            if(!e.target.value){
                allowSubmit(dispatch,"userName Cannot be empty",true);
            }
            else{
                allowSubmit(dispatch,"",false);
            }
        };
        const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>{
            dispatch({type: "email", payload: e.target.value});
            if(!e.target.value){
                allowSubmit(dispatch,"email Cannot be empty", true);
            }
            else{
                allowSubmit(dispatch,"", false);
            }
        };

        const onClickRegister = async (e: React.MouseEvent<HTMLButtonElement,MouseEvent>) =>{
            e.preventDefault();
            try {
                const result = await execRegister({
                    variables: {
                        email,
                        userName,
                        password,
                    },
                });
                console.log("register result", result);
                dispatch({  type: "resultMsg", payload: result.data.register });
            } catch (ex) {
                console.log(ex);
            }
        };

        const onClickCancel = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            onClickToggle(e);
        };


        return(
            <ReactModal
                className="modal-menu"
                isOpen ={isOpen}
                onRequestClose ={onClickToggle}
                shouldCloseOnOverlayClick = {true}
                >
                    <form>
                        <div className="req-inputs">
                            <div>
                                <label>username</label>
                                <input type ="text" value ={userName} onChange ={onChangeUserName}/>
                            </div>
                            <div>
                                <label>email</label>
                                <input type ="text" value ={email} onChange ={onChangeEmail}/>
                            </div>
                            <div>
                                <PasswordComparison
                                    dispatch={dispatch}
                                    password={password}
                                    passwordConfirm={passwordConfirm}
                                />
                            </div>
                        </div>
                        <div className="form-buttons">
                            <div className="form-btn-left">
                                <button
                                    style={{marginLeft: ".5em"}}
                                    className="action-btn"
                                    disabled ={isSubmitDisabled}
                                    onClick ={onClickRegister}>
                                        Register
                                </button>
                                <button
                                    style={{marginLeft: ".5em"}}
                                    className="cancel-btn"
                                    onClick ={onClickCancel}>
                                        Close
                                </button>
                            </div>
                            <span className="form-btn-right">
                                <strong>{resultMsg}</strong>
                            </span>
                        </div>
                    </form>
                </ReactModal>
            )
    }

    export default Registration;

   