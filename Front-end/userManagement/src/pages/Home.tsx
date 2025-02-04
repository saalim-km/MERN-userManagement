import { useEffect } from 'react';
import Header from '../components/Header'
import { useSelector } from 'react-redux'

const Home = () => {
    const userData = useSelector((state)=> state.user);

    useEffect(()=> {
        console.log("data from redux store : ",userData)
    },[])
  return (
    <div>
      <Header/>
    </div>
  )
}

export default Home
