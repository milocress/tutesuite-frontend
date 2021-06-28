import { Component } from "react"

export default class ColorTheme extends Component {
  render() {
    return (
      <div className={this.props.light ? '' : 'bg-dark text-white'}>{this.props.children}</div>
    )
  }
}