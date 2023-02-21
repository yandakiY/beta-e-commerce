import axios from 'axios';


export default axios.create({
    baseURL: 'https://beta-e-commerce-default-rtdb.firebaseio.com/lists.json',
});