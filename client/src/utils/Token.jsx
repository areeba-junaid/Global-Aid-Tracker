import axios from "axios";
const getToken = () => {
  const token = sessionStorage.getItem("token");
  if (token) return token.toString();
  else return null;
};
const getAccountInfo = async () => {
  try {
    const accountNo = getToken();
    const response = await axios.get("http://localhost:5000/api/account/get",{params: {accountNo}});

    if (response.error) {
      return null;
    } else if (response.data) {
      return response.data;
    }
  } catch (err) {
    console.error("Axios request failed:");
  }
  return null;
};
export { getAccountInfo, getToken };
