import {Component} from 'react'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', isError: false}

  onsubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onsubmitFailure = msg => {
    this.setState({errorMsg: msg, isError: true})
  }

  changeUsername = event => {
    this.setState({username: event.target.value, isError: false})
  }

  changePassword = event => {
    this.setState({password: event.target.value, isError: false})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    const data = await response.json()
    if (response.ok === true) {
      this.onsubmitSuccess(data.jwt_token)
    } else {
      this.onsubmitFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          placeholder="lucifer"
          className="username-input-field"
          value={username}
          onChange={this.changeUsername}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          onChange={this.changePassword}
          value={password}
        />
      </>
    )
  }

  render() {
    const {errorMsg, isError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-card">
          <div className="image-container">
            <img
              src="https://res.cloudinary.com/dj7inbtyj/image/upload/v1628333520/Mini%20Projects/Frame_274_rdzv2v.png"
              alt="website logo"
              width="50px"
            />
            <img
              src="https://res.cloudinary.com/dj7inbtyj/image/upload/v1628333521/Mini%20Projects/Features_yewexf.png"
              alt="website text logo"
            />
          </div>
          <h1 className="sign-in">Sign in</h1>
          <div className="input-container"> {this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          {isError && <p className="error">{errorMsg}</p>}
          <div className="login-btn">
            <button
              type="submit"
              onClick={this.submitForm}
              className="login-button"
            >
              Sign in
            </button>
          </div>
        </form>
        <div>
          <img
            src="https://res.cloudinary.com/dj7inbtyj/image/upload/v1628333426/Mini%20Projects/Rectangle_1456_q3zlrx.png"
            alt="website login"
          />
        </div>
      </div>
    )
  }
}

export default LoginForm
