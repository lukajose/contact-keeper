import React,{useContext,useEffect,Fragment} from 'react';
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/AuthContext';
import SideBar from '../layout/Sidebar'
const Home = () => {
    const authContext = useContext(AuthContext);
    
    useEffect(()=> {
        authContext.loadUser();
        //eslint-disable-next-line
    },[])
    
    return (
        <Fragment>
            <div className="grid-2">
                <div>
                    <ContactForm/>
                </div>
                <div>
                    <ContactFilter/>
                <Contacts/> 
                </div>
            </div>
        </Fragment>
    );
}

export default Home;