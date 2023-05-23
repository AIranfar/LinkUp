import { useSelector } from 'react-redux';
import './UserInfoBox.css'

const UserInfoBox = () => {
    const sessionUser = useSelector((state) => state.session.user)
    console.log(sessionUser)
    return (
        <div>
            <img src={sessionUser.profile_image} alt='user-profile-pic' className='user-info-profile-image' />
            <div>{sessionUser.first_name} {sessionUser.last_name}</div>
            <div>{sessionUser.about_me}</div>
            <div>{sessionUser.location}</div>
        </div>
    )
}

export default UserInfoBox;
