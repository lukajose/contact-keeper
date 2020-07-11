import React, {useContext,useRef,useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext'


const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');
    const {filterContact,clearFilter,filtered} = contactContext;
    console.log('filtered:',filtered)
    useEffect(()=> {
        if(filtered === null) {
            text.current.value = '';
        }
    })
    
    const onChange = (e) => {
        if(text.current.value !=='') {
            filterContact(e.target.value);
        } else {
            clearFilter();
        }
    }
    return (
        <div>
            <input ref={text} 
                type="text" 
                placehoder="Filter Contacts ..."
                onChange={onChange}/>
        </div>
    )
}

export default ContactFilter;