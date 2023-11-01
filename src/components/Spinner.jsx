import { Component } from 'react'
import Spin from '../assets/Spinner.gif'
export default class Spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img src={Spin} alt="loading" />
            </div>
        )
    }
}
