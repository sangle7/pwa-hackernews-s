import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {getComments} from '../services'
const Item = (props) => {
  const {match,commentList} = props
  const CommentRecu = (list) => {
    return list.map(elem=>{
      const childrens = elem.comments?CommentRecu(elem.comments):null
      return (
      <article key={elem.id} style={{marginLeft:`50px`}}>
        <h1>{elem.id} </h1>
        <Link to={`/user/${elem.user}`}>{elem.user}</Link>
        <span>{elem.time_ago}</span>
        <p dangerouslySetInnerHTML={{__html: elem.content}}></p>
        {childrens}
      </article>)
    })
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