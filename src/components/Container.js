import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import {Link} from 'react-router-dom';
import {getDatasource,getNumbers} from '../services'
const ListItem = (props) => {
  const {data,index,page} = props
  return (
    <article className="articleInfor">
    <span>{(page-1)*30+index}</span>
    <div>
      <h2><a href={data.url}>{data.title}</a></h2>
      <p>
      <span>{data.points?`${data.points} points `:null}  
      {data.user?<span>by <Link to={`/user/${data.user}`}> {data.user} </Link></span>:null}
      </span>
      <span> {data.time_ago} | </span>
      <Link to={`/item/${data.id}`}> {data.comments_count?`${data.comments_count} comments`:`discuss`}</Link></p>
    </div>
    </article>
  )
}
const Container = (props) => {
  const {pageCount,listData} = props
  const {name,page} = props.match.params
  console.log(props.listData)
  return (
    <div>
      <p className="pagination">
        <Link to={`/${name}/${Math.max(parseInt(page) - 1,1)}`}> {`<-`} </Link>
        <span>{page}/{pageCount}</span>
        <Link to={`/${name}/${Math.min(parseInt(page) + 1,pageCount)}`}> {`->`} </Link>
      </p>
      {listData.map((elem,index) =><ListItem page={page} key={elem.id} data={elem} index={index+1}/>)}
    </div>
  )
}
const LoadFromServer = (Component) => {
  return class WrappedComopnent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        listData: [],
        pageCount: 0,
        loading: true,
      }
    }
    componentWillReceiveProps(nextProps, nextState, context) {
      const a = nextProps.match.params
      const b = this.props.match.params
      if (a.name===b.name&&a.page===b.page){
        return 
      }else{
        this.setState({
        listData: [],
        loading: true,
      })
        const params={
          page:nextProps.match.params.page,
          name:nextProps.match.params.name,
        }
        this.fetchData(params)
      }
    }
    componentDidMount() {
      const params={
        page:this.props.match.params.page,
        name:this.props.match.params.name,
      }
      this.fetchData(params)
    }
    componentDidUpdate(nextProps) {
      console.log('update')
    }
    async fetchData(params) {
      try {
        const listData = await getDatasource(params)
        const items = await getNumbers(params)
        console.log(items)
        this.setState({
          listData: Object.values(listData.data),
          pageCount: Math.ceil(Object.keys(items.data).length/30),
          loading: false,
        })
        // show success message
      } catch (err) {
        // show error tips
      }
    }
    render() {
      const ComponentProps = {
        ...this.props,
        listData: this.state.listData,
        pageCount:this.state.pageCount,
      }
      return (this.state.loading?<Loading/>:<Component {...ComponentProps}/>)
    }
  }
}

Container.propTypes = {
  match: PropTypes.object,
  listData: PropTypes.array
}
export default LoadFromServer(Container)
