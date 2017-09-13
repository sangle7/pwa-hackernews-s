import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import {Link} from 'react-router-dom';
import {getComments} from '../services'
const Item = (props) => {
  const {commentList} = props
  const CommentRecu = (list) => {
    return list.map(elem=>{
      const childrens = elem.comments?CommentRecu(elem.comments):null
      return (
      <article className="discussion" key={elem.id} style={{marginLeft:`50px`}}>
        <header>
        <Link to={`/user/${elem.user}`}>{elem.user}</Link>
        <span> {elem.time_ago}</span></header>
        <div dangerouslySetInnerHTML={{__html: elem.content}}></div>
        <div className="divide-line"/>
        {childrens}
      </article>)
    })
  }
  return (
    <div>
      <section className="discuessTitle"> 
        <h1>{commentList.title}</h1>
        <h4>{commentList.domain}</h4>
        <span>{commentList.points||0} points</span>
        {commentList.user?<p>by <Link to={`/user/${commentList.user}`}>{commentList.user}</Link></p>:null}
      </section>
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
          comments:[],
        },
        loading: true,
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
        this.setState({
          commentList:commentList.data,
          loading: false,
        })
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
      return (this.state.loading?<Loading/>:<Component {...ComponentProps}/>)
    }
  }
}
export default WrappedComment(Item)