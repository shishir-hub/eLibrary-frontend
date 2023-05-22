import React from 'react';
import './ConfirmDialogue.scss';

function ConfirmDialogue(props) {
    const { confirmDialogue, setConfirmDialogue } = props;
    const { isOpen, type, title, message, task } = confirmDialogue;

    return (
        <>
            {isOpen ? <div className='back'>
                <div className="dialog-container text-center p-3 pb-3">
                    <h3 className={`text-${type}`}>{title}</h3>
                    <p>{message}</p>

                    <div className="d-flex justify-content-center">
                        <button className={`btn btn-${type === "danger" ? "danger" : "success"} my-3 mx-2`}
                            onClick={() => {
                                task();
                                setConfirmDialogue({ ...confirmDialogue, isOpen: false })
                                document.body.classList.remove('remove-scroll');
                            }}>Continue</button>
                        <button className={`btn btn-${type === "danger" ? "success" : "danger"} my-3 mx-2`}
                            onClick={() => {
                                document.body.classList.remove('remove-scroll');
                                setConfirmDialogue({ ...confirmDialogue, isOpen: false })
                            }}>Cancel</button>
                    </div>
                </div>
            </div> : null}
        </>
    )
}

export default ConfirmDialogue
