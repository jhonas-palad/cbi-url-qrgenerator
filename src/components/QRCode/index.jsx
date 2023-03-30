import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export const QRCode = ({hidden, value, size = 256}) => {
  return (
    <div className='qr-out'>
        {
            !hidden ? ( 
            <QRCodeCanvas id="generated_qrcode" size={size} value={value}/>) : (
                <></>
            )
        }   
    </div>
  )
}

export default QRCode;