import React from "react";

const Box = ({ title, item, result }) => {
    console.log("props", { title, item, result });

    const defaultImageUrl = process.env.PUBLIC_URL + '/images/question.gif';

    let resultStyle = {};
    let boxStyle = {};
    let imageStyle = {};

    if (result === "WIN") {
        resultStyle = { color: 'red' };
        boxStyle = { backgroundColor: '#ffcd00' };
    } else if (result === "LOSE") {
        resultStyle = { color: 'black' };
        boxStyle = { backgroundColor: '#8f8f8f' };
        imageStyle = { 
            filter: 'grayscale(100%)',
            transform: 'scale(0.8)'  // 이미지 크기를 80%로 줄임
        };
    }

    return (
        <div className='col-6'>
            <div className='d-flex flex-column align-items-center box' style={boxStyle}>
                <h1>{title}</h1>
                <img 
                    src={item && item.img ? item.img : defaultImageUrl} 
                    alt={item ? item.name : 'default'}
                    style={imageStyle}
                />
                <h2 style={resultStyle}>{result}</h2>
            </div>
        </div>
    );
};

export default Box;