import { authService } from "fbase";
import { useState } from "react";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line
export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName) {
     await userObj.updateProfile({
       displayName: newDisplayName,
     });
     refreshUser(); // refresh the profile on reactJs
    }
  };
  return (
    <div className="container">
      <form className="profileForm" onSubmit={onSubmit}>
        <input 
          onChange={onChange}
          type="text" 
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input 
          type="submit" 
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};