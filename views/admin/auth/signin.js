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
              <input type='password' name='Password' placeholder='Password' for='password'>
            </div>
          <div>
          <div>
            <button>Sign In</button>
          </div>
        </form>
      </div>
    `
  })
}