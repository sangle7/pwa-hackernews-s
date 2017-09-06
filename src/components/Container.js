import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {getDatasource} from '../services'
const ListItem = (props) => {
  const {data,index} = props
  return (
    <article>
    <h1>{index}</h1>
      <a href={data.url}>{data.title}</a>
      <span>{data.points} points by <Link to={`/user/${data.user}`}> {data.user} </Link> </span>
      <span> {data.time_ago} </span>
      <Link to={`/item/${data.id}`}> {data.comments_count} comments</Link>
    </article>
  )
}
const Container = (props) => {
  console.log(props.listData)
  return (
    <div>
      <h1>{props.match.params.name}</h1>
      {props.listData.map((elem,index) =><ListItem key={elem.id} data={elem} index={index+1}/>)}
      <Link to={`/${props.match.params.name}/${parseInt(props.match.params.page) - 1}`}>上一页</Link>
      <Link to={`/${props.match.params.name}/${parseInt(props.match.params.page) + 1}`}>下一页</Link>
    </div>
  )
}
const LoadFromServer = (Component) => {
  return class WrappedComopnent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        listData: []
      }
    }
    componentWillReceiveProps(nextProps, nextState, context) {
      const a = nextProps.match.params
      const b = this.props.match.params
      if (a.name===b.name&&a.page===b.page){
        return 
      }else{
        const params={
          page:nextProps.match.params.page,
        }
        this.fetchData(params)
      }
    }
    componentDidMount() {
      const params={
        page:this.props.match.params.page,
      }
      this.fetchData(params)
    }
    componentDidUpdate(nextProps) {
      console.log('update')
    }
    async fetchData(params) {
      try {
        const listData = await getDatasource(params)
        console.log(listData)
        this.setState({listData:Array.isArray(listData)?listData:Object.values(listData)})
        // show success message
      } catch (err) {
        // show error tips
      }
    }
    render() {
      const ComponentProps = {
        ...this.props,
        listData: this.state.listData
      }
      return (<Component {...ComponentProps}/>)
    }
  }
}

Container.propTypes = {
  match: PropTypes.object,
  listData: PropTypes.array
}
export default LoadFromServer(Container)