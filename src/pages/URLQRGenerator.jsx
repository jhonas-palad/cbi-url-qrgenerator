import React, {useReducer, useCallback} from 'react';
import { downloadFile, FILETYPES_OPTS } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import Container from '../components/Container';
import ButtonSelect from '../components/ButtonSelect';
import FormGroup from '../components/FormGroup';
import QRCode from '../components/QRCode';

const initState = {
    urlInput: '',
    toConvert: '',
    fileType: 'png',
    showDownload: false
}


const reducer = (state, action) => {
    const {type, payload} = action;
    switch(type) {
        case 'UPDATE_INPUT':
            return {...state, ...payload};
        case 'CHANGE_FILE_TYPE':
            return {
                ...state,
                fileType: action.value
            }
        case 'GENERATE_QR':
            return {
                ...state, 
                toConvert: state.urlInput,
                showDownload: true
            };
        case 'RESET_STATE':
            return {
                ...state,
                ...initState
            }
        default:
            console.log('Error occured, -jhonas');
            return {...state};
    }
}



const URLQRGenerator = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    const downloadQRCode = useCallback((fileType) => {
        const generatedQRCodeRef = document.getElementById("generated_qrcode");
        state.toConvert && downloadFile(generatedQRCodeRef, uuidv4(), fileType ?? state.fileType);
    }, [state.fileType, state.toConvert]);
    
    return(
 
        <Container style={{flexGrow:1}} className="body">
            <h1 style={{fontSize:27, fontWeight:'bold',textAlign: 'center'}}>
                QR CODE <br/>
                GENERATOR
            </h1>
            <div className='container'>
                <FormGroup
                    label="Enter your URL"
                    id="urlInput"
                    name="urlInput"
                    title="Enter your URL"
                    className='hello'
                    onChange={
                        (e) => dispatch({type: 'UPDATE_INPUT', payload: {urlInput: e.target.value}})
                    }
                    type='url'
                    value={state.urlInput}
                />
                <QRCode value={state.toConvert} hidden={!state.toConvert}/>
                <div className="flex-col flex flex-center btn-wrapper">
                {
                    !state.showDownload ? (
                        <button 
                        className='btn-cbi' 
                            onClick={()=> dispatch({type:'GENERATE_QR'})} 
                            type="button"
                            disabled={!state.urlInput}>
                                Generate
                        </button>
                    ) : (
                        <>
                            <ButtonSelect 

                                title="Download"
                                opts={FILETYPES_OPTS}
                                optClick={
                                        (value)=>{
                                            dispatch({type: 'CHANGE_FILE_TYPE', value});
                                            downloadQRCode(value)
                                    }
                                }
                                btnClick={()=>downloadQRCode(state.fileType)}
                            />
                            <button onClick={()=>dispatch({type: 'RESET_STATE'})} className='label' style={{cursor:'pointer'}}>Generate another QR code</button>
                        </>
                    )
                }
                </div>
            </div>
        </Container>
    )
}

export default URLQRGenerator;