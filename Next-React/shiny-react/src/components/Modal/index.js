function Modal(props){
    return (
        <div className="modal">
            <p>props.text</p>
            <button className="btn btn--cancel" onClick={props.onClose}>
                Cancel
            </button>
            <button className="btn btn--confirm" onClick={props.onClose}>
                Confirm
            </button>
        </div>
    );
}

export default Modal;