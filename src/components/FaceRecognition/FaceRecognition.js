import React from 'react';
import './FaceRecognition.css';
import Region from './Region';

const FaceRecognition = ({ boxes, imageURL }) => {

    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageURL} width='500px' height='auto' />
                
                {
                    boxes.map( (box, i) => <Region box={box} key={i}/>)
                }
            </div>
        </div>
    );
}

export default FaceRecognition;