import axios from "axios";

const getToken = () => {
  return sessionStorage.getItem("token");
};

const decodeToken = async () => {
  try {
    const token = getToken();
    if (!token) {
      return null;
    }
    const response = await axios.get(
      "http://localhost:5000/api/authToken/decode",
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (response.data && response.data.decodedToken) {
      const { address } = response.data.decodedToken;
      return address;
    }
  } catch (err) {
    console.error("Axios request failed:", err);
  }
  return null;
};
const getAccountInfo = async () => {
  try {
    const accountNo = await decodeToken();

    const response = await axios.get("http://localhost:5000/api/account/get", {
      headers:{
        authorization:getToken(),
      },
      params: { accountNo },
    });

    if (response.error) {
      console.log(response.error);
      return null;
    } else if (response.data) {
      return response.data;
    }
  } catch (err) {
    console.error("Axios request failed:");
  }
  return null;
};
export { getAccountInfo, decodeToken };
