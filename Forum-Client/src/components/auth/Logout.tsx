import { gql, useMutation } from "@apollo/client";
import React, {FC} from "react";
import ReactModal from "react-modal";
import { useAppSelector } from "../../hooks/useHooks";
import useRefreshReduxMe, { Me } from "../../hooks/useRefreshReduxMe";
import {ModalProps} from "../types/ModalProps"
import Button from '@mui/material/Button';

const LogoutMutation = gql `
    mutation logout($userName: String!){
        logout (userName: $userName)
    }
`
const Logout: FC<ModalProps> = ({isOpen, onClickToggle}) =>{
    const user = useAppSelector(state => state.user);

    const [execLogout] = useMutation(LogoutMutation, { refetchQueries:
        [
          {
            query: Me,
          },
        ],
      });
      const { execMe, deleteMe} = useRefreshReduxMe();
    const onClickLogin = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        onClickToggle(e);

        await execLogout({
            variables: {
                userName: user.user?.userName ?? "",
            },
        });
        deleteMe();
    };
    const onClickCancel = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        onClickToggle(e);
    };

    return (
        <ReactModal
            className="modal-menu"
            isOpen={isOpen}
            onRequestClose={onClickToggle}
            shouldCloseOnOverlayClick={true}
        >
            <form>
                <div className="logout-inputs">
                    Are you sure you want to logout?
                </div>
                <div className="form-buttons form-buttons-sm">
                    <div className="form-btn-left">
                        <Button
                            variant="contained"
                            style={{ marginLeft: ".5em" }}
                            className="action-btn"
                            onClick={onClickLogin}
                        >
                        Logout
                        </Button>
                        <Button
                            variant="contained"
                            style={{ marginLeft: ".5em" }}
                            className="cancel-btn"
                            onClick={onClickCancel}
                        >
                        Close
                        </Button>
                    </div>
                </div>
            </form>
        </ReactModal>
    )
}

export default Logout;