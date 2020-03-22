import React from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import './Register.css';
import axios from 'axios';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            confirmpassword: '',
            invalidemail: false,
            invalidfirstname: false,
            invalidlastname: false,
            invalidpassword: false,
            invalidconfirmpassword: false,
            registering: false,
            registered: false
        };

        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(){
        this.setState({
            invalidemail: this.state.email.length === 0 || this.state.email.indexOf('@') === -1,
            invalidfirstname: this.state.firstname.length === 0,
            invalidlastname: this.state.lastname.length === 0,
            invalidpassword: this.state.password.length <= 6,
            invalidconfirmpassword: this.state.invalidpassword || this.state.confirmpassword.length === 0 ||
                this.state.password !== this.state.confirmpassword
        }, () => {
            if (!this.state.invalidemail &&
                !this.state.invalidfirstname &&
                !this.state.invalidlastname &&
                !this.state.invalidpassword &&
                !this.state.invalidconfirmpassword
            ){
                console.log("submitting...");
                this.setState({registering: true}, () => {
                    axios.post('https://wesetern01-auth.mybluemix.net/user/signup', {
                        email: this.state.email,
                        password: this.state.password,
                        firstName: this.state.firstname,
                        lastName: this.state.lastname
                    }).then((res) => {
                        console.log("register res = ", res);
                        if (res.data.code === 200){
                            // redirect to login
                            this.setState({registering: false, registered: true});
                            setTimeout(() => this.props.history.push('/login'), 3000);
                        }

                    }).catch((err) => {
                        console.log("Login Error: ", err);
                        this.setState({registering: false});
                    });
                })
            }
        });
    }

    render(){
        return <div style={{margin: '0 auto', display: 'block'}}>
            <h1>Register</h1>
            <div style={{top: 0, bottom: 0, left: 0, right: 0, margin: 'auto'}}>
                <div>
                    {
                        this.state.registered ? <p>Success! Redirecting to login page...</p> :
                            this.state.registering ? <p>Registering...please wait...</p> : null
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

                    { this.state.invalidfirstname && this.state.firstname.length === 0 ?
                        <p className={"register-invalid"}>Please enter your first name</p> : null }
                    <div className={'register-row'}>
                        <label className={'register-label'}>First Name: </label>
                        <InputText
                            placeholder={"First Name"}
                            value={this.state.firstname}
                            onChange={(e) => this.setState({firstname: e.target.value})}
                            className={'register-input'}
                        />
                    </div>

                    { this.state.invalidlastname && this.state.lastname.length === 0 ?
                        <p className={"register-invalid"}>Please enter your last name</p> : null }
                    <div className={'register-row'}>
                        <label className={'register-label'}>Last Name: </label>
                        <InputText
                            placeholder={"Last Name"}
                            value={this.state.lastname}
                            onChange={(e) => this.setState({lastname: e.target.value})}
                            className={'register-input'}
                        />
                    </div>

                    { this.state.invalidpassword && this.state.password.length <= 6? <p className={"register-invalid-password"}>
                        Please enter a valid password (> than 6 characters)
                    </p> : null }
                    <div className={'register-row'}>
                        <label className={'register-label'}>Password: </label>
                        <Password
                            placeholder={"Password"}
                            value={this.state.password}
                            onChange={(e) => this.setState({password: e.target.value})}
                            className={'register-input'}
                        />
                    </div>

                    { this.state.invalidconfirmpassword && (this.state.confirmpassword.length === 0 ||
                        this.state.password !== this.state.confirmpassword) ? <p className={"register-invalid-confirm"}>
                        Please make sure the passwords match</p>
                        : null }
                    <div className={'register-row'}>
                        <label className={'register-label'}>Confirm Password: </label>
                        <Password
                            placeholder={"Confirm password"}
                            value={this.state.confirmpassword}
                            onChange={(e) => this.setState({confirmpassword: e.target.value})}
                            className={'register-input'}
                        />
                    </div>
                    <br/>

                    <Button label={"Submit"} onClick={this.handleRegister}/>
                </div>
            </div>
        </div>
    }

}

export default Register;