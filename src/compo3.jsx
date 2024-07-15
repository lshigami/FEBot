import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
const Container = styled.div`
  width: 300px;
  margin: 0 auto;
  text-align: center;
  font-family: Arial, sans-serif;
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

const WallOfFame = styled.div`
  padding: 20px;
  text-align: left;
`;

const MainProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin: 10px 0;
`;

const ProfilePic = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.div`
  font-weight: bold;
`;

const ProfileCats = styled.div`
  color: #888;
`;

const HolderList = styled.div`
  margin: 20px 0;
`;

const Holder = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const HolderPic = styled(ProfilePic)`
  background-color: ${({ color }) => color || "#ddd"};
`;

const HolderDetails = styled.div`
  flex-grow: 1;
`;

const HolderName = styled.div`
  font-weight: bold;
`;

const HolderCats = styled.div`
  color: #888;
`;

const HolderRank = styled.div`
  font-weight: bold;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-top: 1px solid #ccc;
`;

const FooterIcon = styled.div`
  text-align: center;
`;

const FooterText = styled.div`
  font-size: 12px;
`;

const LeaderboardInterface = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://my-first-project-production-9b2c.up.railway.app/users",
      };

      try {
        const response = await axios.request(config);
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  console.log("saaa", users);

  return (
    <>
      <WallOfFame>
        <h2>Telegram Wall of Fame</h2>
        <MainProfile>
          <ProfilePic style={{ backgroundColor: "#f5a623" }}>IS</ProfilePic>
          <ProfileDetails>
            <ProfileName>you name</ProfileName>
            <ProfileCats>#yourrank - ... CATS</ProfileCats>
          </ProfileDetails>
        </MainProfile>
        {/* <div>2,482,468 holders (Top 100)</div> */}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <HolderList>
            {Array.isArray(users) &&
              users.map((user, index) => (
                <Holder key={user.id}>
                  <HolderPic color="#f5a623">
                    {user.first_name.charAt(0).toUpperCase()}
                  </HolderPic>
                  <HolderDetails>
                    <HolderName>
                      {`${user.first_name} ${user.last_name}`}
                    </HolderName>
                    <HolderCats>{user.points} CATS</HolderCats>
                  </HolderDetails>
                  <HolderRank>#{index + 1}</HolderRank>
                </Holder>
              ))}
          </HolderList>
        )}
      </WallOfFame>
    </>
  );
};

export default LeaderboardInterface;
