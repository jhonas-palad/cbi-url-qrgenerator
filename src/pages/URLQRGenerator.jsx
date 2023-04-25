import React, {useReducer, useCallback, useRef} from 'react';
import { downloadFile, FILETYPES_OPTS } from '../utils';
import { v4 as uuidv4 } from 'uuid';

import Container from '../components/Container';
import ButtonSelect from '../components/ButtonSelect';
import FormGroup from '../components/FormGroup';
import { QRCode } from 'react-qrcode-logo';

const initState = {
    urlInput: '',
    toConvert: '',
    fileType: 'png',
    showDownload: false
}

const reducer = (state, action) => {
    const {type, payload} = action;
    switch(type) {
        case 'urlInput':
            return {...state, ...payload};
        case 'changeFileType':
            return {
                ...state,
                fileType: action.value
            }
        case 'generateQR':
            return {
                ...state, 
                toConvert: state.urlInput,
                showDownload: true
            };
        case 'RESET_STATE':
            return {
                ...initState,
            }
        default:
            throw new Error();
    }
}

const URLQRGenerator = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    const qrRef = useRef(null);
    const downloadQRCode = useCallback((fileType) => {
        const generatedQRCodeRef = qrRef.current.canvas.current;
        downloadFile(generatedQRCodeRef, uuidv4(), fileType ?? state.fileType);
    }, [state.fileType]);
    return(
 
        <Container style={{flexGrow:1}} className="body">
            <h1 style={{fontSize:27, fontWeight:'bold',textAlign: 'center'}}>
                QR CODE <br/>
                GENERATOR
            </h1>
            <div className='container'>
                {
                    !state.toConvert ? (
                        <FormGroup
                            label="Enter your URL"
                            id="urlInput"
                            name="urlInput"
                            title="Enter your URL"
                            className='hello'
                            onChange={
                                (e) => dispatch({type: 'urlInput', payload: {urlInput: e.target.value}})
                            }
                            type='url'
                            value={state.urlInput}
                        />
                    ) : (
                        <QRCode 
                            id="generated_qrcode" 
                            ref={qrRef}
                            value={state.toConvert}
                            ecLevel='H' 
                            quietZone={15} 
                            size={256} 
                        />
                    )
                }
            </div>
            <div className="flex-col flex flex-center btn-wrapper">
            {
                !state.showDownload ? (
                    <button
                        style={{marginTop: '2.5rem'}}
                        className='btn-cbi' 
                        onClick={()=> dispatch({type:'generateQR'})} 
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
                                        dispatch({type: 'changeFileType', value});
                                        downloadQRCode(value)
                                }
                            }
                            btnClick={()=>downloadQRCode(state.fileType)}
                        />
                        <p className='label' style={{cursor:'pointer'}} onClick={()=>dispatch({type:'RESET_STATE'})}>Generate another QR code</p>
                    </>
                )
            }
            </div>
        </Container>
    )
}

export default URLQRGenerator;