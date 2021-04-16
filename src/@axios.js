import axios from "axios";

const url='https://manage-library-backend.herokuapp.com/';
// const local='http://localhost:1200/';
// this is user defined axios with base url
export default axios.create({
    baseURL:url,
    headers:{
        "Content-type": "application/json",
    }
});
