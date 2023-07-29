import React, {useEffect,useState} from 'react'
import Styles from './Landing.module.css'
//api
import {getCion} from '../services/api'

//component
import Loder from '../component/Loder'
import Coin from './Coin'

const Landing = () => {

    const [coins,setCoins] = useState([]);
    const [search,setSearch] = useState("");

    useEffect(() => {
        const fetchAPI = async () => {
            const data = await getCion();
            console.log(data)
            setCoins(data)
        }
        
        fetchAPI()

    },[])

  const searchHandler = event => {
    setSearch(event.target.value)
  }

  const searchCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <input className={Styles.input} type='text' placeholder='search' value={search} onChange={searchHandler}/>
      {
        coins.length ?
            <div className={Styles.coincontainer}>
                {
                    searchCoins.map(coin => <Coin
                       key={coin.id}
                        name={coin.name}
                        image={coin.image}
                        symbol={coin.symbol}
                        price={coin.current_price}
                        marketCap={coin.market_cap}
                        priceChange={coin.price_change_percentage_24h}
                      />)
                }
            </div> :
            
            <Loder/>
      }
      
    </>
  )
}

export default Landing
