import { dbService } from "fbase";
import React, { useState,useEffect } from "react";

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] =useState([]);

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  console.log(nweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Whats on your mind?"
          maxLength={120}
          onChange={onChange}
          value={nweet}
        />
        <input type="submit" value="Nweet" />
      </form>
    
    <div>
        {nweets.map((nweet)=>(
            <div key={nweet.id}>
                <h4>{nweet.text}</h4>
            </div>
        ))}
    </div>
    </div>
  );
};

export default Home;
