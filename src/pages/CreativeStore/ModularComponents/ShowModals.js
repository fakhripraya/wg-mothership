import { useMemo } from "react";
import Button from "../../../components/Button";

export const ShowErrorModal = (props) => {
    return useMemo(() => {
        return <div className="add-catalogue-modal-container dark-bg-color">
            <div className="add-catalogue-modal-wrapper">
                <Button onClick={() => props.handleOpenModal(props.setModalToggle, props.modalToggle)}
                    className="align-self-end add-catalogue-modal-button red-bg-color">
                    <h4 className="add-catalogue-modal-button-text">X</h4>
                </Button>
                <br />
                <h3 className="margin-top-0 margin-bottom-12-18">
                    There is an <span className="red-color">ERROR</span>
                </h3>
                <br />
                <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
                    {props.errorMessage}
                </label>
            </div>
        </div>
    }, [props.modalToggle, props.errorMessage]);
}