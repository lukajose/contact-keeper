import React, {useState,Fragment} from 'react'
import './sidebar.css'
const Sidebar = () => {
    const [width,SetWidth] = useState(0);
    const [marginLeft,SetMarginLeft] = useState(0);
    const OpenSideBar = (width)=> {
        SetWidth(250);
        SetMarginLeft(0);
    }
    const CloseBar = () => {
        SetWidth(0);
        SetMarginLeft(0);
    }
    return (
        <Fragment>
            <button class="openbtn" onClick={OpenSideBar}>☰</button>
            <div id="mySidebar" class="sidebar" style={{width,marginLeft}}>
                <a href="javascript:void(0)" class="closebtn" onClick={CloseBar}>×</a>
                <a href="#">Stocks</a>
                <a href="#">Bonds</a>
                <a href="#">Currency</a>
                <a href="#">Portfolio</a>
            </div>
        </Fragment>
    )
}

export default Sidebar;
