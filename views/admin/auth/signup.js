const layout = require('../layout')
const {getError} = require('../../helpers')

module.exports = ({errors}) => {
  return layout({ 
    content : `
      <div>
        <form method='POST'>
          <div>
            <div>
              <label id='email'>Username</label>
            </div>
            <input type='text' name='email' placeholder='Email' for='email'>
            ${getError(errors, 'email')}
          </div>
          <div>
            <div>
              <label id='password'>Password</label>
            </div>
            <input type='password' name='password' placeholder='Password' for='password'>
            ${getError(errors, 'password')}
          </div>
          <div>
            <div>
              <label id='confirmPassword'>Confirm Password</label>
            </div>
            <input type='password' name='confirmPassword' placeholder='Confirm Password' for='confirmPassword'>
            ${getError(errors, 'confirmPassword')}
          </div>
          <div>
            <button>Sign Up</button>
          </div>
        </form>
      </div>
    `
  })
}