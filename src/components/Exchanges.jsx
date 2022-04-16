import { Table, Space  } from 'antd';

import millify from 'millify'
import {Typography  , Avatar} from 'antd'
import Loader from './Loader'
import {useGetCryptosQuery} from '../services/cryptoApi'

const {Title , Text} = Typography


const columns = [
  {
    title: '',
    dataIndex: 'avata',
    key: 'avata',
    render :avataUrl=> ( <Avatar className="exchange-image" src={avataUrl} /> )
  
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render : text => (<Text style={{color:'blueviolet'}}>{text}</Text>)
  
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '%7d',
    dataIndex: 'change',
    key: 'change',
  },
  { 
    title : 'Market Cap' ,
    dataIndex: 'marketCap' , 
    key : 'marketCap',
  }
];



const Exchanges = ()=> {


  const {data : cryptoData , isFetching} = useGetCryptosQuery(100)

  const coins = cryptoData?.data?.coins
 

  const data = coins?.map((coin)=>{
    return {
      key : coin.uuid,
      avata : coin.iconUrl,
      name:coin.name,
      price : millify(coin.price),
      change : coin.change,
      marketCap : millify(coin.marketCap),

    }
  })


  if(isFetching){
    return <Loader/>
  }

 
  return (
   <div style={{marginLeft : '4px'}} className = 'exchanges'>
      <Title  level = {2} className = 'heading' >Crypto Exchanges</Title>
      <Space/>

     
     <Table columns={columns} dataSource={data} />

      
   </div>
  )

  // return (
  
  // )
}
export default Exchanges;

