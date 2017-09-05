import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import style from './style.less'
const Menubar = (props) => {
  const {menu} = props
  return (
    <header className={style.menubar}>
    <ul>
      {menu.map(elem=>(<Link key={elem.name} to={elem.to}><li>{elem.name}</li></Link>))}
    </ul>
    </header>
  )
}
Menubar.propTypes = {
  menu:PropTypes.array,
}
export default Menubar