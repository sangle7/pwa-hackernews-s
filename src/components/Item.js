import React from 'react'
import PropTypes from 'prop-types'
const Item = (props) => {
  const {match,commentList} = props
  const CommentRecu = (list) => {
    
  }
  return (
    <p>ITEM here:{match.params.itemid}</p>
  )
}
Item.propTypes = {
  menu: PropTypes.array
}
export default Item