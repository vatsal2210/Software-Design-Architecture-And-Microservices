import React from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import './Register.css';

import axios from 'axios';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            invalidemail: false,
            invalidpassword: false,
            loggingin: false
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(){
        this.setState({
            invalidemail: this.state.email.length === 0 || this.state.email.indexOf('@') === -1,
            invalidpassword: this.state.password.length < 6
        }, () => {
            if (!this.state.invalidemail && !this.state.invalidpassword){
                console.log("submitting...");
                this.setState({loggingin: true});
                axios.post('https://wesetern01-auth.mybluemix.net/user/signin', {
                    email: this.state.email,
                    password: this.state.password
                }).then((res) => {
                    console.log("login res = ", res);
                    if (res.data.code === 200){
                        // redirect
                        localStorage.setItem("auth_token", res.data.token);
                        this.setState({loggingin: false});
                        this.props.history.push('/home');
                        //window.location = '/';
                    }
                    else if (res.data.code === 500){
                        // incorrect password
                        this.setState({invalidpassword: true, loggingin: false});
                    }

                }).catch((err) => {
                    console.log("Login Error: ", err);
                    this.setState({loggingin: false});
                });
            }
        });
    }

    render(){
        return <div style={{margin: '0 auto', display: 'block'}}>
            <h1>Login</h1>
            <div style={{top: 0, bottom: 0, left: 0, right: 0, margin: 'auto',}}>
                <div>
                    {
                        this.state.loggingin ? <p>Logging in...</p> : null
                    }
                    { this.state.invalidemail && (this.state.email.length === 0 || this.state.email.indexOf('@') === -1) ?
                        <p className={"register-invalid"}>Please enter a valid email</p>
                        : null }
                    <div className={'register-row'}>
                        <label className={'register-label'}>Email: </label>
                        <InputText
                            placeholder={"Email"}
                            value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}
                            className={'register-input'}
                        />
                    </div>

                    { this.state.invalidpassword && this.state.password.length === 0 ?
                        <p className={"register-invalid"}>Please enter a password</p>
                        : null }
                    <div className={'register-row'}>
                        <label className={'register-label'}>Password: </label>
                        <Password
                            placeholder={"Password"}
                            value={this.state.password}
                            onChange={(e) => this.setState({password: e.target.value})}
                            className={'register-input'}
                        />
                    </div>


                    <br/>

                    <Button label={"Submit"} onClick={this.handleLogin}/>
                </div>
            </div>
        </div>
    }

}

export default Login;