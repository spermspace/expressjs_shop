import React from 'react'
import Input from '../../components/UI/Input/Input'
import classes from './Auth.css'

//https://gist.github.com/zmts/802dc9c3510d79fd40f9dc38a12bccfc

class Auth extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      message: ''
    }
  }

  handleInputChange = e => {
    const {value, name} = e.target;
    this.setState({
      [name]: value
    })
  }

  getCookies = (ck) => {
      return  
  }

  submitHandler = e => {
    e.preventDefault()
    const {email, password} = this.state
    const emailCheck = [...email].includes('@') && [...email].includes('.')
    if(password.length < 5){
        this.setState({message: 'не допустимое кол-во символов в пароле'})
    } else if (!emailCheck) {
        this.setState({message: 'введите валидный email'})
    } else {
        fetch("/api/auth/login", {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
        if(res.status === 200){
            this.props.history.push('/overview')
            console.log(this.props)
            console.log(res)
        } else if(res.status === 401){
            this.setState({message: 'you are not authorized'})
        } else {
            const error = new Error(res.error)
            throw error
        }
    })
    .catch(err => {
      console.error(err)
      alert('Error')
    })
    }
  }

  render(){
    return (
      <div>
        <div className={classes.Auth}>
          <h3>Авторизация</h3>
          <form onSubmit={this.submitHandler}>
            <Input
               label="email"
               name="email"
               value={this.state.email}
               onChange={this.handleInputChange}
             />

            <Input
               label="Password"
               name="password"
               value={this.state.password}
               onChange={this.handleInputChange}
               errorMessage
             />

            <button
              type="success"
              onClick={this.loginHandler}
            >
            войти
            </button>

            <button
              type="primery"
              onClick={this.registerHandler}
            >
            зарегистрироваться
            </button>
          </form>
           <span className={classes.error}>{this.state.message}</span>
        </div>
      </div>
    )
  }
}

export default Auth
