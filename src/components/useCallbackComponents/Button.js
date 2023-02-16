import React from 'react';

const Button = ({ handleClick, children }) => {
    console.log('Rendering button -', children)
    return (
        <button onClick={handleClick}>
            {children} {/*  -----------------------------------------------------------------------------------------------
              innertext. props.children refers to the increment age TEXT in parent component
            --------------------------------------------------------------------------------------------------- */}
        </button>
    );
};

export default React.memo(Button);