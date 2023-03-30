import './style.css';
import { useContext } from 'react';
import AppContainerContext from '../../context/AppContainerProvider';

const AppContainer = ({children, full=false}) => {
  const ref = useContext(AppContainerContext);
  return (
    <section  ref={ref} style={{height: full ? '100vh' : '100%'}} className='app-container hello'>
        {children}
    </section>
  )
}


export default AppContainer