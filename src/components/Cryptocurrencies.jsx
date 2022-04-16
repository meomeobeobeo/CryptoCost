import React from 'react'
import millify from 'millify'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { useState ,useEffect  } from 'react'
import { Card, Col, Row , Input } from 'antd'
import { Link } from 'react-router-dom'
import Loader from './Loader'


const Cryptocurrencies = ({ simple }) => {
  const count = simple ? 10 : 100;

  

  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(data?.data?.coins)
  const [searchText, setSearchText] = useState('')
  
  
  useEffect(()=>{
    const res = data?.data?.coins.filter((coin)=>{

      return coin.name.toLowerCase().includes(searchText.toLowerCase());

    })
    setCryptos(res)





  },[data?.data?.coins, searchText ])




  if (isFetching) {
    return <Loader/>
  }
 

  return (
    <>
      { !simple && (
        <Input placeholder='Search' style = {{
          margin : '12px 8px',
          width : '25%',
        }}
        onChange = {(e)=>{
          setSearchText(e.target.value)
        }}
        value = {searchText}
        />
      )}
      <Row gutter={[24, 24]}>
        {
          cryptos?.map((res) => {
            return (
              <Col xs={24} sm={12} md={8} lg={6} className='cryptos-card-container' key={res.uuid}>
                <Link to={`crypto/${res.uuid}`}>
                  <Card
                    title={`${res.rank}.${res.name}`}
                    // eslint-disable-next-line jsx-a11y/alt-text
                    extra={<img className='crypto-image' src={`${res.iconUrl}`} />}
                    className='crypto-card'
                    hoverable
                  >
                    <p>Price : {millify(res.price)}</p>
                    <p>Market Cap : {millify(res.marketCap)}</p>
                    <p> Daily change : {millify(res.change)}</p>

                  </Card>


                </Link>

              </Col>
            )
          })
        }

      </Row>
    </>
  )
}

export default Cryptocurrencies