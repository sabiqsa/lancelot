/*----------------------------------------------------------------
                            NAVBAR SECTION
------------------------------------------------------------------*/
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import dateformat from 'dateformat'

import {actorRequest} from '../../action/action'

class Navbar extends Component {

    componentDidMount() {
        this.handleActiveMenu()
    }

    handlerSignOut = (dispatcherRequest) => {
        fetch('/api/v1/user/signout', {
            method: 'POST',
            credentials: 'include',
            crossDomain: true
        }).then((res) => {
            return res.json()
        }).then((data) => {
            data.code === 200
                ? dispatcherRequest(false, 0, '')
                : dispatcherRequest(true, 401, 'Error')
        })
    }
    handleActiveMenu = () => {
        const tagID = this.props.active_navbar
        const id = [
            "home",
            "course",
            "schedule",
            "assignment",
            "grade",
            "information",
            "user"
        ]
        id.forEach(function (val) {
            let dom = document.getElementById(val)
            val === tagID
                ? ReactDOM
                    .findDOMNode(dom)
                    .className = "_n3a"
                : ReactDOM
                    .findDOMNode(dom)
                    .className = ""
        }, this)
    }
    /*----------------------------------------------------------------
                            RENDER COMPONENT
------------------------------------------------------------------*/
    render() {
        const {is_logged_in, time_now} = this.props

        return (is_logged_in
            ? <div className="_ro">
                    <div className="_mn">
                        <div className="_c5x32">
                            <nav className="_cn5n">
                                <i className="fa fa-bars _i5h" aria-hidden="true"></i>
                                <ul className="_n">
                                    <div className="_n51">
                                        <li id="home">
                                            <Link to={`/`}><img className="_i3c" src="../img/icon/white/logo_utama.png" alt="logo"/></Link>
                                        </li>
                                        <li id="course">
                                            <Link to={'/course'}>
                                                <i className="fa fa-th-large" aria-hidden="true"></i>
                                            </Link>
                                        </li>
                                        <li id="schedule">
                                            <Link to={'/schedule'}>
                                                <i className="fa fa-calendar" aria-hidden="true"></i>
                                            </Link>
                                        </li>
                                        <li id="assignment">
                                            <Link to={'/assignment'}>
                                                <i className="fa fa-tasks" aria-hidden="true"></i>
                                            </Link>
                                        </li>
                                        <li id="grade">
                                            <Link to={'/grade'}>
                                                <i className="fa fa-bar-chart" aria-hidden="true"></i>
                                            </Link>
                                        </li>
                                        {// Adminnya belum siap gan 
                                        }
                                        {/* <li id="admin" className="_n3a">
                                            <Link to={'/'}>
                                                <i className="fa fa-wrench" aria-hidden="true"></i>
                                            </Link>
                                        </li> */}
                                    </div>
                                    <div className="_n52">
                                        <li id="information">
                                            <Link to={'/information'}>
                                                <i className="fa fa-info-circle" aria-hidden="true"></i>
                                            </Link>
                                        </li>
                                        <li id="user">
                                            <Link to={'/user'}>
                                                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                            </Link>
                                        </li>
                                        <li
                                            id="signout"
                                            onClick={(e) => {
                                            e.preventDefault();
                                            this.handlerSignOut(this.props.dispatcherRequest)
                                        }}>
                                            <Link to={'#'}>
                                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                                            </Link>
                                        </li>
                                    </div>
                                </ul>
                            </nav>
                        </div>
                        <div className="_c5x3o1 _c5x39">
                            <p className="_me5ts _pd3cr">{dateformat(time_now, 'HH.MM.ss | dddd, mmmm dd, yyyy')}</p>
                        </div>
                    </div>
                </div>
            : <Redirect to={'/login'}/>)
    }
}
/*----------------------------------------------------------------
                            DISPATCHER
------------------------------------------------------------------*/
const mapStatetoProps = (state) => {
    return {is_logged_in: state.is_logged_in, modules_access: state.modules_access, time_now: state.time_now}
}
const mapDispatchtoProps = (dispatch) => {
    return {
        dispatcherRequest: (is_logged_in, request_status, error_message) => dispatch(actorRequest(is_logged_in, request_status, error_message))
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Navbar)
