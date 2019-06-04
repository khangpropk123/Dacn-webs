import React, { Component } from 'react'

class TextInput extends Component {
    _onChange = event => {
        const { name, value } = event.target
        this.props.onChange(name, value)
    }
    render() {
        const {
            label,
            containerStyle,
        } = this.props
        return (
            <div className={containerStyle}>
                <div className="form-group">
                    <label><h6>{label}</h6></label>
                    <input
                        {...this.props}
                        className="form-control"
                        onChange={this._onChange}
                        min={0}
                    />
                </div>
            </div>
        )
    }
}
export default TextInput