import React, { useState } from 'react'
import { useGetNewsCryptosQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment'
import Loader from './Loader'
const {Text , Title} = Typography
const { Option } = Select;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simple }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const {data : cryptoData , isFetching} = useGetCryptosQuery(50)
  const {data : newsData} = useGetNewsCryptosQuery({newsCategory : newsCategory , count : simple ?6:12})
  
  
  if(!newsData?.value) {
    return <Loader/>
  }
  
  return (
    <div style = {{marginLeft : '4px'}}>
      
      <Row gutter={[24, 24]}>
      {!simple && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {cryptoData?.data?.coins?.map((currency , i) => <Option key = {i} value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      )}
      {newsData?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card> 
        </Col>
      ))}
    </Row>

    </div>
  )
}

export default News