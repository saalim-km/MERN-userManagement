import ProfileInfo from '../../components/ProfileInfo'
import Header from '../../components/Header'
import BreadCrumb from '../../components/BreadcCrumb'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const Profile = () => {
    const state = useSelector((state : RootState)=> state.user.user);
    console.log(state)
  return (
    <div>
        <Header/>
        <BreadCrumb/>
      <ProfileInfo userName={state.userName} userEmail={state.email} profileImage={state.profileImg}/>
    </div>
  )
}

export default Profile
