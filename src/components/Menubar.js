import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Menubar = (props) => {
    const {menu} = props
    const {name} = '1'
    return (
        <header className="menubar">
            <ul>
                {menu.map(elem=>(<li className={name===elem.name?'highlight_menu':null}><Link key={elem.name} to={elem.to}>{elem.name}</Link></li>))}
            </ul>
        </header>
    )
}
Menubar.propTypes = {
    menu:PropTypes.array,
}
export default Menubar