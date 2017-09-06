import React from 'react'
import PropTypes from 'prop-types'
import {getComments} from '../services'
const Item = (props) => {
  const {match,commentList} = props
  const CommentRecu = (list) => {
    for(let i=0;i<list.length;i++){
      const childrens = list[i].comments?CommentRecu(list[i].comments):null
      return (<article><h1>{list[i].id} </h1> {childrens}</article>)
    }
  }
  return (
    <div>
    {CommentRecu(commentList.comments)}
    </div>
  )
}
Item.propTypes = {
  commentList:PropTypes.object,
}

const WrappedComment = (Component) => {
  return class WrappedItme extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        commentList: {
          comments:[]
        }
      }
    }
    componentDidMount() {
      const params={
        itemId:this.props.match.params.itemid,
      }
      this.fetchData(params)
    }
    componentDidUpdate(nextProps) {
      console.log('update')
    }
    async fetchData(params) {
      try {
        const commentList = await getComments(params)
        this.setState({commentList})
        // show success message
      } catch (err) {
        // show error tips
      }
    }
    render(){
      const ComponentProps = {
        ...this.props,
        commentList: this.state.commentList
      }
      return (<Component {...ComponentProps}/>)
    }
  }
}
export default WrappedComment(Item)