import { connect } from 'react-redux'
import Header from '../components/header'
import {logout} from "../actions"

const mapDispatchToProps = (dispatch)=> ({
    logout: ()=> dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Header)