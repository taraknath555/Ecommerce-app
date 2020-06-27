const layout = require('../layout')
module.exports = () => {
  return layout({ 
    content : `
      <div>
        <form method='POST'>
          <div>
            <div>
              <label id='username'>Username</label>
            </div>
            <input type='text' name='username' placeholder='Username' for='username'>
          </div>
          <div>
            <div>
              <label id='password'>Password</label>
            </div>
            <input type='password' name='password' placeholder='Password' for='password'>
          </div>
          <div>
            <div>
              <label id='confirmPassword'>Confirm Password</label>
            </div>
            <input type='password' name='confirmPassword' placeholder='Confirm Password' for='confirmPassword'>
          </div>
          <div>
            <button>Sign Up</button>
          </div>
        </form>
      </div>
    `
  })
}