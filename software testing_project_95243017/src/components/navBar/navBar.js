import React from 'react'
import {Link} from 'react-router-dom'
import classes from './navBar.module.css'
class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.clicked = this.clicked.bind(this);
    }
    clicked(){
        this.forceUpdate();
        localStorage.clear();
    }
    render(){
        let navBar = undefined;
        //for testing
        const condition = this.props.cond ? true : localStorage.getItem('token')
       
        navBar = condition ? (<ul>
            <li><Link
                to="/"
            >home</Link></li>
            <li style={{float : "right"}} onClick={this.clicked}><Link
            to="/"
                >Logout</Link></li>
        </ul>): (
                <ul>
                    <li><Link
                        to="/"
                        >home</Link>
                    </li>
                    <li style={{float : "right"}}>
                    <Link
                        to="/Login"
                        >Login</Link>
                    </li>
                    <li style={{float : 'right'}}>
                    <Link
                        to="/Signup"
                        >Sign up</Link>
                    </li>
                </ul>)
        return(
            <div className={classes.Blog}>
                <header>
                    <nav>
                        {navBar}
                    </nav>
                </header>
            </div>
        )
    }
}

export default NavBar