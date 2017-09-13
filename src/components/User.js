import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import {getUser} from '../services'
const Item = (props) => {
  const {user} = props
  return (
    <section className="discuessTitle"> 
      <h1>{user.id}</h1>
      <h4>created:{user.created}</h4>
      <h4>karma:{user.karma}</h4>
      <h4>avg:{user.avg}</h4>
      <div dangerouslySetInnerHTML={{__html:user.about}}></div>
    </section>
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
        user:{},
        loading: true,
      }
    }
    componentDidMount() {
      const params={
        user:this.props.match.params.username,
      }
      this.fetchData(params)
    }
    componentDidUpdate(nextProps) {
      console.log('update')
    }
    async fetchData(params) {
      try {
        const user = await getUser(params)
        this.setState({
          user:user.data,
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
        user: this.state.user
      }
      return (this.state.loading?<Loading/>:<Component {...ComponentProps}/>)
    }
  }
}
export default WrappedComment(Item)