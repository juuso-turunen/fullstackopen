import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const create = (newObject) => {
    return axios.post(baseUrl, newObject).then((response) => response.data);
};

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default { create, remove };
