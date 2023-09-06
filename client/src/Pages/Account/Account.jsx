import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './Account.scss';
import Navbar from '../../Components/navbar/navbar';
import userImage from '../../images/userdf.png';

const Account = () => {
    const { user } = useContext(AuthContext);
    // const inputRef = useRef(null);
    // const [image, setImage] = useState('');

    // function handleImageUpload() {
    //     const formData = new FormData();
    //     formData.append('image', image, image.name);
    //     axios.put(`api/user/updateimg`, formData)
    //          .then((res) => {
    //             console.log(res);
    //             toast('The image has been uploaded successfully');
    //          })
    // }

    // function handleImageChange(event) {
    //     setImage(event.target.files[0]);
    //     console.log(event.target.files[0]);
    //     var reader = new FileReader();
    //     reader.readAsDataURL(event.target.files[0]);
    //     reader.onload = () => {
    //         console.log(reader.result);
    //     };
    //     reader.onerror = error => {
    //         console.log('error:' + error);
    //     }
    // }

  return (
    <>
    <Navbar/>
    <div className="user-profile">
    <div className="profile-picture">
      <img src={user.profilePicture ? user.profilePicture : userImage} alt={`${user.username}'s Profile`} />
    </div>

    <div className="user-details">
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Status: {user.isAdmin ? 'Administrator' : 'User'}</p>
      
    </div>
  </div>
    </>
  );
}

export default Account;
