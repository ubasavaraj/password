import {Component} from 'react'
import {v4} from 'uuid'
import PassList from './components/passlist'
import './App.css'

class App extends Component {
  state = {
    web: '',
    user: '',
    pass: '',
    pasList: [],
    isChecked: false,
    search: '',
  }

  onclickweb = event => {
    const webName = event.target.value
    this.setState({web: webName})
  }

  onclickuser = event => {
    const userName = event.target.value
    this.setState({user: userName})
  }

  onclickpass = event => {
    const password = event.target.value
    this.setState({pass: password})
  }

  onSearch = event => {
    const name = event.target.value
    this.setState({search: name})
  }

  onAdd = event => {
    event.preventDefault()
    const {web, user, pass} = this.state
    const newList = {
      id: v4(),
      webName: web,
      userName: user,
      passWord: pass,
    }
    this.setState(prevState => ({
      pasList: [...prevState.pasList, newList],
      web: '',
      pass: '',
      user: '',
    }))
  }

  onclickDelete = id => {
    const {pasList} = this.state
    const data = pasList.filter(each => each.id !== id)
    this.setState({
      pasList: data,
    })
  }

  handleChange = () => {
    const {isChecked} = this.state
    this.setState({isChecked: !isChecked})
  }

  render() {
    const {web, user, pass, isChecked, pasList, search} = this.state
    const count = pasList.length

    const filteredList = pasList.filter(each =>
      each.webName.toLowerCase().includes(search.toLowerCase()),
    )

    return (
      <>
        <div className="main_container">
          <img
            className="appLogo"
            alt="app logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          />
          <div className="first_container">
            <form onSubmit={this.onAdd}>
              <div className="input_container">
                <h2>Add New Password</h2>
                <input
                  type="text"
                  value={web}
                  onChange={this.onclickweb}
                  placeholder="Enter Website"
                />
                <br />
                <input
                  type="text"
                  value={user}
                  onChange={this.onclickuser}
                  placeholder="Enter Username"
                />

                <br />
                <input
                  type="password"
                  value={pass}
                  onChange={this.onclickpass}
                  placeholder="Enter Password"
                />
                <br />
                <button type="submit">Add</button>
              </div>
            </form>
            <div>
              <img
                className="passManager"
                alt="password manager"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              />
            </div>
          </div>
        </div>
        <div className="second_container">
          <div className="searchbar">
            <div>
              <h1>
                Your Passwords <span style={{color: '#f59e0b'}}>{count}</span>
              </h1>
            </div>
            <div>
              <input
                type="text"
                value={search}
                onChange={this.onSearch}
                placeholder="Search"
              />
            </div>
          </div>
          <hr style={{width: '90%'}} />
          <div>
            <input
              type="checkbox"
              id="rrr"
              value={isChecked}
              onChange={this.handleChange}
            />
            <label htmlFor="rrr"> Show Password</label>
          </div>
          {count === 0 ? (
            <div className="nopasswordlist">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="nopassword"
              />
              <h1>No Passwords</h1>
            </div>
          ) : (
            <ul className="list">
              {filteredList.map(each => (
                <PassList
                  key={each.id}
                  list={each}
                  view={isChecked}
                  onDelete={this.onclickDelete}
                />
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }
}

export default App
