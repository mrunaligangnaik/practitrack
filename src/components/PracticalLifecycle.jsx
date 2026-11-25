import { Component } from 'react'

// small class component to show the lifecycle methods
class PracticalLifecycle extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  // runs once, after the component appears
  componentDidMount() {
    console.log('Lifecycle: component mounted')
  }

  // runs after every update
  componentDidUpdate() {
    console.log('Lifecycle: component updated, count = ' + this.state.count)
  }

  // runs just before the component is removed
  componentWillUnmount() {
    console.log('Lifecycle: component unmounted')
  }

  render() {
    return (
      <div className="card">
        <h3>⚙ Lifecycle Demo (class component)</h3>
        <p>Count: {this.state.count}</p>
        <button className="btn" onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increase
        </button>
        <p className="small">Open the browser console (F12) to see the messages.</p>
      </div>
    )
  }
}

export default PracticalLifecycle