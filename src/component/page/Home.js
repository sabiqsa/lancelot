/*----------------------------------------------------------------
                            HOME PAGE
------------------------------------------------------------------*/
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import axios from 'axios'

import {Navbar, Newsbar, LayoutUser, InputContent} from '../index.js'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            today: [],
            assignment: []
        }
    }
    /*----------------------------------------------------------------
                            LIFE CYCLE
------------------------------------------------------------------*/
    componentDidMount() {
        this.handleGetAssignment()
        this.handleGetScheduleToday()
    }
    /*----------------------------------------------------------------
                            HANDLER FUNCTION
------------------------------------------------------------------*/
    handleGetScheduleToday = () => {
        axios.get(`/api/v1/course/149/today`, {
            validateStatus: (status) => {
                return status === 200
            }
        }).then((res) => {
            res.data.code === 200
                ? this.setState({today: res.data.data})
                : this.setState({today: []})
        }).catch((err) => {
            console.log(err)
        })
    }
    handleGetAssignment = () => {
        axios.get(`/api/v1/assignment?schedule_id=149&pg=1&ttl=10`, {
            validateStatus: (status) => {
                return status === 200
            }
        }).then((res) => {
            res.data.code === 200
                ? this.setState({assignment: res.data.data})
                : this.setState({assignment: []})
        }).catch((err) => {
            console.log(err)
        })
    }
    handleClickUpload = () => {
        let modal = document.getElementById('_md')

        let dom = ReactDOM.findDOMNode
        // dom(advance).className = "" dom(basic).className = "_ta5l3a"
        dom(modal).style.display = 'block'
        // dom(advance_content).style.display = 'none'
    }
    renderMain = (today, assignment) => {
        return (
            <LayoutUser>
                <Navbar match={this.props.match} active_navbar={"home"}/>
                <div className="_ro _ma3mn">
                    <div className="_cn3w">
                        <div className="_ro">
                            <div className="_c5m38 _pd5n _pd3cl _pd5m3n">
                                <div className="_he3b">Assignment</div>
                                <Assignment data={assignment} handleClickUpload={this.handleClickUpload}/>
                                <div className="_pg">
                                    <div>
                                        <p>1 of 2 Page</p>
                                    </div>
                                    <div>
                                        <a href="">
                                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                                            &nbsp;previous</a>
                                        <a href="">next&nbsp;
                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="_he3b">Schedule Today</div>
                                <Today data={today}/>
                            </div>
                            <Newsbar/>
                        </div>
                    </div>
                </div>
                <div className="_md" id="_md">
                    <div className="__x"></div>
                    <div className="_ro">
                        <div className="_c5x312 _c5m36 _c5m3o3">
                            <div className="_cn _md5cu">
                                <div className="_ro">
                                    <div className="_c5x312">
                                        <h1 className="_he3nb">Lorem Ipsum</h1>
                                        <p className="_me3c">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                        </p>
                                    </div>
                                </div>
                                <div className="_ro">
                                    <div className="_c5x312">
                                        <div className="_md5i">
                                            <input type="file" name="file"/>
                                            <img className="_i3ce" src="/img/icon/blue/upload.png" alt="upload logo"/>
                                            <p className="_me3c">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="_ro">
                                    <div className="_c5x312">
                                        <label className="_me3b _bd" htmlFor="Subjet">Subject</label>
                                        <InputContent
                                            type="text"
                                            name="subject"
                                            placeholder="Lorem Ipsum"
                                            onChangeState={this.onChangeState}/>
                                        <InputContent
                                            type="text"
                                            name="description"
                                            placeholder="Description"
                                            onChangeState={this.onChangeState}/>
                                    </div>
                                </div>
                                <div className="_ro">
                                    <div className="_c5x312">
                                        <input className="_bt5m3b" type="button" name="submit" value="SUBMIT"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="_md5s _dn">
                    <div className="__x"></div>
                    <div className="_ro">
                        <div className="_c5x312 _c5m36 _c5m3o3">
                            <div className="_cn _md5cu">
                                <div className="_ro">
                                    <div className="_c5x312">
                                        <h1 className="_he3nb">Congratulation</h1>
                                        <p className="_me3c">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutUser>
        )
    }
    /*----------------------------------------------------------------
                            RENDER COMPONENT
------------------------------------------------------------------*/
    render() {
        const {is_logged_in} = this.props
        const assignment = this.state.assignment
        const today = this.state.today

        return (is_logged_in
            ? this.renderMain(today, assignment)
            : <Redirect to={`/login`}/>)
    }
}
/*----------------------------------------------------------------
                            ELEMENT FUNCTION
------------------------------------------------------------------*/
export const Assignment = (props) => {
    return (props.data.length === 0
        ? <table className="_se3msg">
                <tbody>
                    <tr>
                        <td>
                            <i className="fa fa-smile-o" aria-hidden="true"></i>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="_head">Nothing To Report!</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="_main">Have a nice day Rifki Muhammad</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        : <table className="_se3a">
            <tbody>
                {props
                    .data
                    .map((data, i) => (
                        <tr key={i}>
                            <td>
                                <i className="fa fa-circle _i3a" aria-hidden="true"></i>
                            </td>
                            <td>{data.due_date}</td>
                            <td>{data.name}</td>
                            <td>
                                <i
                                    className="fa fa-pencil-square-o _ic __wr"
                                    aria-hidden="true"
                                    onClick={props.handleClickUpload}></i>
                            </td>
                            <td>
                                <i className="fa fa-angle-double-right _ic __wr" aria-hidden="true"></i>
                            </td>
                        </tr>
                    ))
}

            </tbody>
        </table>)
}
const Today = (props) => {
    return props.data.length === 0
        ? <table className="_se3msg">
                <tbody>
                    <tr>
                        <td>
                            <i className="fa fa-calendar-o" aria-hidden="true"></i>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="_head">You Have No Upcoming Events.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="_main">let's do the best, although there is no events today</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        : <table className="_se3s">
            <tbody>
                <tr>
                    <td>
                        <p>10.30-12.00</p>
                        <p>
                            <i className="fa fa-bookmark" aria-hidden="true"></i>
                            Algoritma Pemrograman</p>
                        <p>
                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                            Laboratorium Pemrograman/ UDJT12</p>
                    </td>
                    <td>
                        <i className="fa fa-angle-double-right _ic __wr" aria-hidden="true"></i>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>10.30-12.00</p>
                        <p>
                            <i className="fa fa-bookmark" aria-hidden="true"></i>
                            Algoritma Pemrograman</p>
                        <p>
                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                            Laboratorium Pemrograman/ UDJT12</p>
                    </td>
                    <td>
                        <i className="fa fa-angle-double-right _ic __wr" aria-hidden="true"></i>
                    </td>
                </tr>
            </tbody>
        </table>
}
/*----------------------------------------------------------------
                            DISPATCHER
------------------------------------------------------------------*/
const mapStatetoProps = (state) => {
    return {is_logged_in: state.is_logged_in}
}
const mapDispatchtoProps = (dispatch) => {
    return {
        dispatcher: () => dispatch()
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Home)
