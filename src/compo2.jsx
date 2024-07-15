import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 300px;
  margin: 0 auto;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 20px;
  border-bottom: 1px solid #ccc;
`;

const BackIcon = styled.span`
  font-size: 20px;
  cursor: pointer;
  margin-right: 10px;
`;

const Title = styled.div`
  flex-grow: 1;
  font-weight: bold;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
  margin: 20px auto;
  display: block;
`;

const Balance = styled.div`
  font-size: 30px;
  margin: 10px 0;
`;

const CommunitySection = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  margin: 20px 0;
  border-radius: 10px;
`;

const CommunityTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  space-bottom: 10px;
`;

const CommunityLink = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FacebookLink = styled(CommunityLink)`
  margin-top: 10px;
`;

const ChannelSubscription = styled.div`
  font-weight: bold;
`;

const CatsInterface = () => {
  const nav = useNavigate();
  const [userId, setUserId] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [err, setErr] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isJoined, setIsJoined] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    console.log("tg:", tg);
    tg.ready();
    tg.expand();

    const initData = tg.initData;
    console.log("initData:", initData);
    const initDataUnsafe = tg.initDataUnsafe;
    console.log("initDataUnsafe:", initDataUnsafe);

    if (
      initDataUnsafe?.user?.id &&
      initDataUnsafe?.user?.last_name &&
      initDataUnsafe?.user?.first_name
    ) {
      setUserId(initDataUnsafe.user.id);
      setFirstName(initDataUnsafe.user.first_name);
      setLastName(initDataUnsafe.user.last_name);

      console.log("initDataUnsafe:", initDataUnsafe);
    } else {
      console.error("Cannot get user information:", initDataUnsafe);
    }
  }, []);

  const handleSubmit = () => {
    let data = JSON.stringify({
      id: userId,
      first_name: first_name,
      last_name: last_name,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://my-first-project-production-9b2c.up.railway.app/telegram-webhook",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        setErr(error);
        console.log(error);
      });
  };

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://my-first-project-production-9b2c.up.railway.app/users/${userId}`,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setBalance(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  let configz = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://my-first-project-production-9b2c.up.railway.app/channel/${userId}`,
  };

  axios
    .request(configz)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      const x = response.data;
      if (x == true) {
        setIsJoined(true);
      } else {
        setIsJoined(false);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  const handleFacebookLinkClick = () => {
    window.location.href = "https://t.me/hunterxui";
  };

  return (
    <Container>
      <Icon src="coin.png" alt="Cat Icon" />
      <Balance>{balance ?? ""} COINS</Balance>
      <CommunitySection>
        <CommunityTitle>StudiHub COMMUNITY</CommunityTitle>
        <div>Home for Telegram EL</div>
        <CommunityLink onClick={handleSubmit}>Get Rewards</CommunityLink>
        <ChannelSubscription>
          Channel Subscription :
          {isJoined === true ? " 100 POINTS" : ` Not Earned`}
        </ChannelSubscription>
        <FacebookLink onClick={handleFacebookLinkClick}>
          Join our channel
        </FacebookLink>
      </CommunitySection>
    </Container>
  );
};

export default CatsInterface;
