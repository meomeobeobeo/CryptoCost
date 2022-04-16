import React from 'react'
import millify from 'millify'
import {Typography , Col , Row , Statistic, Space} from 'antd'
import {useGetCryptosQuery} from '../services/cryptoApi'
import {Link} from 'react-router-dom'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'
import Loader from './Loader'



const {Title} = Typography ;


const Home = () => {
  const {data , isFetching} = useGetCryptosQuery(10)
  const globalStats = data?.data?.stats
  if(isFetching){
    return <Loader/>
  }
 
  return (
   <div style={{marginLeft : '4px'}}>
      <Title  level = {2} className = 'heading' >Global Crypto Stats</Title>
      <Row>
          <Col span = {12}  ><Statistic title = 'Total Cryptocurrencies' value={millify(globalStats.total)}></Statistic></Col>
          <Col span = {12}  ><Statistic title = 'Total Exchanges' value={millify(globalStats.totalExchanges)}></Statistic></Col>
          <Col span = {12}  ><Statistic title = 'Total market Cap' value={millify(globalStats.totalMarketCap)}></Statistic></Col>
          <Col span = {12}  ><Statistic title = 'Total 24h Volume' value={millify(globalStats.total24hVolume)}></Statistic></Col>
          <Col span = {12}  ><Statistic title = 'Total Markets' value={millify(globalStats.totalMarkets)}></Statistic></Col>
          

      </Row>
      <div className="home-heading-container">
          <Title  level={2} className='home-title'>Top 10 Cryptocurrencies.</Title>
          <Title level = {3} className = 'show-more'><Link to = '/cryptocurrencies'>Show More</Link></Title>
      </div>
      <Cryptocurrencies simple = {10}/>
      <Space/>
      <div className="home-heading-container">
          <Title  level={2} className='home-title'>Crypto News.</Title>
          <Title level = {3} className = 'show-more'><Link to = '/news'>Show More</Link></Title>
      </div>
      <News simple= {10}  />
   </div>
  )
}

export default Home