import { useSelector } from 'react-redux';
import './UserInfoBox.css'

const UserInfoBox = () => {
    const sessionUser = useSelector((state) => state.session.user)
    console.log(sessionUser)
    return (
        <div className='user-info-box-wrapper'>
            <div className='user-info-box-container'>
                <img src={sessionUser.profile_image} alt='user-profile-pic' className='user-info-profile-image' />
                <div className='user-info-name'>{sessionUser.first_name} {sessionUser.last_name}</div>
                <div className='user-info-about-me'>{sessionUser.about_me}</div>
                <div className='user-info-location'>{sessionUser.location}</div>
            </div>
        </div>
    )
}

export default UserInfoBox;
