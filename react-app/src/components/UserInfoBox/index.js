import { useDispatch, useSelector } from 'react-redux';
import './UserInfoBox.css';

const UserInfoBox = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)

    return (
        <div className='user-info-box-wrapper'>
            <div className='user-info-box-container'>
                <div className='user-info-profile-image-container'>
                    <img src={sessionUser.profile_image} alt='user-profile-pic' className='user-info-profile-image' />
                </div>
                <div className='user-info-name'>{sessionUser.first_name} {sessionUser.last_name}</div>
                <div className='user-info-line-container'>
                    <span className='user-info-line' />
                </div>
                <div className='user-info-about-me'>{sessionUser.about_me}</div>
                <div className='user-info-location'>{sessionUser.location}</div>
            </div>
        </div>
    )
}

export default UserInfoBox;
