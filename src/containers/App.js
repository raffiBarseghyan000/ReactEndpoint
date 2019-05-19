import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = (state)=> ({
    isLoggedIn: state.clientStatus
})

export default connect(mapStateToProps)(App)