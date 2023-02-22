//Cho Cart và CartDetail
import axios from "axios";
import * as Config from "./Config";
export default function APICaller3(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${Config.API_URL4}/${endpoint}`,
    data: body,
  }).catch(err => {
    console.log(err);
  });
};