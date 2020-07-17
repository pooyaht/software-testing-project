import React, { Component } from 'react'
import {Redirect, Route, Link, Switch } from 'react-router-dom';
import Forms from '../forms/forms'
import Form from '../form/form'
import Wrapper from '../../components/hoc/Wrapper'
import Roles from '../../components/roles/Roles'
import Table from '../ControlCenterAgent/ControlCenterAgent'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import SpecificForm from '../../components/specificForm/specificForm'
import Navbar from '../../components/navBar/navBar'

export const NavRoute = ({path, component: Component}) => (
  <Route path={path} render={(props) => (
    <div>
      <Navbar/>
      <Component {...props}/>
    </div>
  )}/>
)
const Blog =(props)=> {
        return (
            <Wrapper>
                    <Switch>
                        <NavRoute path="/forms/:id"  component={Form} />
                        <NavRoute path="/specificForm:id" component={SpecificForm} />
                        <Route path="/Login"  render={(props) =>
                              <Login {...props} />
                            } />
                        <Route path="/Signup"  render={(props) => 
                               <Signup {...props} />
                            } />
                        <NavRoute path="/controlcenteragent/table-forms/:id"  component={Table} />
                        <NavRoute path="/controlcenteragent"   component={Forms} />
                        <NavRoute path="/fieldagent" component={Forms}/>
                        <NavRoute path="/" component={Roles}/>
                    </Switch>
            </Wrapper>
        );
    }

export default Blog;