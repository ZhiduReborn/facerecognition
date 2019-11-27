import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ( { onInputChange, onFileUpload, onButtonSubmit } ) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-50 center' type='text' placeholder='Enter picture URL here...' onChange={onInputChange} />
                    <button className='w-20 f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}> Detect </button>
                    <h2 className='white w-10'>OR</h2>
                    <label className='w-20 f4 link ph3 pv2 dib white bg-light-purple pointer button shadow'>
                        <input id='image-file' type='file' accept='image/*' single='true' onChange={onFileUpload} />
                        <p>Upload</p>
                    </label>

                    
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;