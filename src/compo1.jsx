import React, { useEffect, useState } from "react";

const TelegramWebApp = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    console.log("tg:", tg);
    tg.ready();
    tg.expand();

    const initData = tg.initData;
    console.log("initData:", initData);
    const initDataUnsafe = tg.initDataUnsafe;

    if (initDataUnsafe && initDataUnsafe.user && initDataUnsafe.user.id) {
      setUserId(initDataUnsafe.user.id);
      console.log("initDataUnsafe:", initDataUnsafe);

      tg.MainButton.setText("Submit").show().enable();
      tg.MainButton.onClick(() => {
        const body = JSON.stringify({ id: initDataUnsafe.user.id });
        console.log("Sending body:", body);

        fetch("http://localhost:8080/telegram-webhook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        })
          .then((response) => response.text())
          .then((result) => {
            console.log("Server response:", result);
            if (result === "Received") {
              alert("ID sent successfully!");
            } else {
              alert("Error ID.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Error sending ID.");
          });
      });
    } else {
      console.error("Cannot get user information:", initDataUnsafe);
    }
  }, []);

  return (
    <div className="container">
      <h1>My Title</h1>
      <div className="row" id="tg">
        {userId ? `User ID: ${userId}` : "Loading..."}
      </div>
      <div className="row">
        <button id="btn">all_inclusive</button>
      </div>
    </div>
  );
};

export default TelegramWebApp;
