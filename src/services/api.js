
import axios from "axios";

// base da url:  https://api.themoviedb.org/3/


// url da Api: /movie/now_playing?api_key=ea8a3eddfafb12726795ad839e5b211c

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;