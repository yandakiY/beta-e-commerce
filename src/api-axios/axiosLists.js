import axios from 'axios';


// export default axios.create({
//     baseURL: 'http://localhost:5000/lists',
// });
export default axios.create({
    baseURL: 'https://beta-e-commerce-default-rtdb.firebaseio.com/lists.json',
});