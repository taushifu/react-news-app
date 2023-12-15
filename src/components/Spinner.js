import React, { Component } from 'react'
import Loading from '../assets/spinner.gif'

export default class Spinner extends Component {
    render() {
        return (
            <div className="text-center mt-5">
                <img src={Loading} alt="Loading" />
            </div>
        )
    }
}
