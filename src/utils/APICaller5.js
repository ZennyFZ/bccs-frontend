//Cho Booking và BookingDetail
import axios from "axios";
import * as Config from "./Config";
export default function APICaller5(endpoint, method, body) {
  return axios({
    method: method,
    url: `${Config.API_URL5}/${endpoint}`,
    data: body,
  }).catch(err => {
    console.log(err);
  });
};