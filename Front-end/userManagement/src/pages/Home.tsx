import { useEffect } from 'react';
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store';
import Hero from '../components/Hero';

const Home = () => {
    const userData = useSelector((state : RootState )=> state.user);

    useEffect(()=> {
        console.log("data from redux store : ",userData)
    },[])
  return (
    <div>
      <Header/>
      <Hero username={userData.user.userName} email={userData.user.email}/>
    </div>
  )
}

export default Home
