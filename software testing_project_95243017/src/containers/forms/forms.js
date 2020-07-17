import React, { Component } from 'react';
import classes from './forms.module.css';
import { Link } from 'react-router-dom'
import WithClassWrapper from '../../components/hoc/withClassWrapper'
import axios from 'axios'
import Spinner from '../../components/UI/Spinner/Spinner';
const fs = require('fs')

class forms extends Component {
    state = {
        isLoading: true
    }
    async componentDidMount() {
        const token = localStorage.getItem('token')
        let response = {}
        try {
            response= await axios.get('//localhost:3000/get_all_forms/base/',{
                body: {},
                headers: {
                    Authorization: token
                }
            })
            this.setState({ forms: response.data, isLoading: false })
        } catch (error) {
            this.props.history.push('/')
            throw error
        }
        return response.data;
    }
    render() {
        let view = undefined;
        if (this.state.isLoading) {
            view = <Spinner />
        }
        else {
            let linkArray = { ...this.state };
            let newArray = [];
            switch (this.props.match.path) {
                case '/controlcenteragent':
                    newArray = linkArray.forms.map((key, index) => {
                        return <li key={index}><Link to={this.props.match.path + "/table-forms/" + key.title} >{key.title}</Link></li>
                    })
                    break;
                case '/fieldagent':
                    newArray = linkArray.forms.map((key, index) => {
                        return <li key={index}><Link to={{ pathname: "/forms/" + key.title, state: key }} >{key.title}</Link></li>
                    })
                    break;
            }
            view = (
                <WithClassWrapper classes={classes.forms}>
                    <div >
                        <h2 >Forms</h2>
                        <nav>
                            <ul >
                                {newArray}
                            </ul>
                        </nav>
                    </div>
                </WithClassWrapper>
            )
        }
        return (
            <div>
                {view}
            </div>
        );
    }
}
export default forms;