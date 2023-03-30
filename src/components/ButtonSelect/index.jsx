import React, {useState, useContext, useEffect, useCallback} from 'react';
import { v4 } from 'uuid';
import './style.css';
import AppContainerContext from '../../context/AppContainerProvider';


const ButtonSelect = ({title, opts, optClick, btnClick})=> {
    const appContainerRef = useContext(AppContainerContext);
    const [hideSelect, setHideSelect] = useState(true);
    const optionClick = useCallback((value)=>{
        optClick(value);
    }, [optClick])
    useEffect(()=>{
        const element = appContainerRef?.current;
        const handleClick = (e)=>{
            const {target} = e;
                target.getAttribute('fileopts') && (
                optionClick(target.getAttribute('value'))
            )
            setHideSelect(prevState => {
                if (target.getAttribute('caret')) {
                    if(prevState){
                        return false
                    }
                }
                if(prevState === false){
                    return true;
                }
                return prevState
            })
        }
        element && (
            element.addEventListener('click', handleClick)
        );
        return ()=>{
            element.removeEventListener('click', handleClick)
        }
    }, [hideSelect,appContainerRef, optionClick]);
    return (

        <div style={{position: 'relative'}}>
            <button onClick={btnClick} className='dropdown-button btn-cbi'>
                {title}
            </button>
            <div caret="true" className='caret-wrapper' style={{height: '100%'}}>
                <div caret="true" className='caret'/>
            </div>
            {
                !hideSelect && (
                    <ul className={`dropdown-menu`}>
                        {
                            opts.map(({title, value}) => <li fileopts="true" key={v4()} className='opts' value={value}>
                            {title}
                            </li>)
                        }
                    </ul>
                )
            }
        </div>
        
    )
};
export default ButtonSelect