import { connect } from 'react-redux'
import Login from '../components/login'
import {login} from "../actions"

const mapStateToProps = (state)=> ({
    loginStatus: state.loginState
})

const mapDispatchToProps = (dispatch)=> ({
    login: (user, password)=> dispatch(login(user, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)