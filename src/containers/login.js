import { connect } from 'react-redux'
import Login from '../components/login'
import {toggleLoginState} from "../actions";

const mapDispatchToProps = (dispatch)=> ({
    toggleLoginState: (newState)=> dispatch(toggleLoginState(newState))
})

export default connect(null, mapDispatchToProps)(Login)