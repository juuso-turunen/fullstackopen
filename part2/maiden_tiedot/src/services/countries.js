import axios from "axios";

const allItemsUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const get = () => {
    return axios.get(allItemsUrl).then((response) => response.data);
};

export default { get };
