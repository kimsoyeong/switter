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
    <>
      <form onSubmit={onSubmit}>
        <input 
          onChange={onChange}
          type="text" 
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};