import { connect } from 'react-redux'

import MainMenu from '../components/MainMenu'
import * as actions from '../actions/index'

const mapStateToProps = state => {
    return {
        open: state.mainMenu.open
    }
}

const mapDispatchToProps = dispatch => {
        return {
            setMenuOpen: open => {
            dispatch(actions.setMenuOpen(open))
        }
    }
}

const LeftMainMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainMenu)


export default LeftMainMenu
