import React, { FC } from "react";
import { allowSubmit } from "./Helpers";
import {
  isPasswordValid,
  PasswordTestResult,
} from "../../../common/validators/PasswordValidator";

interface PasswordComparisonProps {
    dispatch: React.Dispatch<any>;
    password: string;
    passwordConfirm: string;
  }

  const PasswordComparison: FC<PasswordComparisonProps> = ({ dispatch, password, passwordConfirm}) => {
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>{
        console.log(e.target.value);
        dispatch({type: "password", payload: e.target.value});
        const PasswordCheck: PasswordTestResult = isPasswordValid(e.target.value);
        if(!PasswordCheck.isValid){
            allowSubmit(dispatch,PasswordCheck.message, true);
            return;
        }
        passwordsSame(passwordConfirm,e.target.value);
    };
    const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) =>{
        console.log(e.target.value);
        dispatch({type: "passwordConfirm", payload: e.target.value});
        passwordsSame(password,e.target.value);
    };
    const passwordsSame = (passwordVal: string, passwordConfirmVal: string) =>{
        if(passwordVal !== passwordConfirmVal){
            allowSubmit(dispatch,"Passwords do not match", true);
            return false;
        }else{
            allowSubmit(dispatch,"", false);
            return true;
        }
    };

    return(
        <React.Fragment>
            <div>
                <label>password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChangePassword}
                />
            </div>
            <div>
                <label>password confirmation</label>
                <input
                    type="password"
                    placeholder="Password Confirmation"
                    value={passwordConfirm}
                    onChange={onChangePasswordConfirm}
                />
            </div>
        </React.Fragment>
    )
  }
  export default PasswordComparison;