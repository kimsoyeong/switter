
import { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';

const SweetFactory = ({ userObj }) => {
  const [sweet, setSweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== ""){ // if there's an attachment(photo)
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL(); // update attachmentUrl
    }
    const sweetObj = {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("sweets").add(sweetObj);
    setSweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const{
      target: { value },
    } = event; // get value inside of the target that is inside of the event
    setSweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0]; // get the file: only 1 file
    const reader= new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);

  return (
    <form onSubmit={onSubmit}>
      <input 
        value={sweet} 
        onChange={onChange} 
        type='text' 
        placeholder="What's on your mind?" 
        maxLength={120} 
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Sweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default SweetFactory;