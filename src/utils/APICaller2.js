//Cho Service và Cart
import axios from "axios";
import * as Config from "./Config";
export default function APICaller2(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${Config.API_URL2}/${endpoint}`,
    data: body,
  }).catch(err => {
    console.log(err);
  });
};