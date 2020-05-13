import React from "react";

import "./drop-area.styles.scss";

const DropArea = ({actions: {handleDragEnter, handleDragLeave, handleDragOver, handleDrop }, idx}) => {

    return (
        <div className="drop-area"
        onDrop={e => handleDrop(e, idx)}
        onDragOver={e => handleDragOver(e)}
        onDragEnter={e => handleDragEnter(e)}
        onDragLeave={e => handleDragLeave(e)}
        >
        </div>
    )

}

export default DropArea;