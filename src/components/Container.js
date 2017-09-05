import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
const Container = (props) => (
  <div>
  <h1>{props.match.params.name}</h1>
  <Link to={`/${props.match.params.name}/${parseInt(props.match.params.page)-1}`}>上一页</Link>
  <Link to={`/${props.match.params.name}/${parseInt(props.match.params.page)+1}`}>下一页</Link>
  </div>
)
Container.propTypes = {
  match:PropTypes.object,
}
export default Container