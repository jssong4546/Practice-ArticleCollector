import React from "react";
import "./Modal.css";

const modal = (props) => {
  return (
    <div>
      <div
        className="modal-wrapper"
        style={{
          transform: props.show ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        <div className="modal-header">
          <h3>Modal Header</h3>
          <span className="close-modal-btn" onClick={props.close}>
            ×
          </span>
        </div>
        <div className="modal-body">
          <div>
            <p>
              내용을 가져올
              <a href="https://medium.com/" target="_blank">
                Medium
              </a>
              post URL을 한줄씩 입력하세요.
            </p>
            <p>
              예:
              <code>
                https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4
              </code>
            </p>
          </div>
          {/* <input type="text" placeholder="medium URL을 입력하세요" /> */}
          {/* <div onChange={props.handleChangeValue}>{props.sources}</div> */}
          <textarea value={props.sources} onChange={props.handleChangeValue} />
        </div>
        <div className="modal-footer">
          <button className="btn-continue" onClick={props.close}>
            SAVE & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default modal;
