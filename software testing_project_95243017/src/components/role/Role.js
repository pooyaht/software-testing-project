import React from 'react';

import classes from './Role.module.css';
import {withRouter} from 'react-router-dom'

export const clicked = (props) =>{
   props.history.push(props.title.split(' ').join('').toLowerCase())
}

export const Role = (props) => {
    return(
    <section className={classes.Role} onClick={() => {clicked(props)}}>
        <h1>{props.title}</h1>
    </section>
    )
};

export default withRouter(Role);