import Axios from "axios";
import Cache from "memory-cache";

const fetchWithCache = async (url: string) => {
  const cachedData = await Cache.get(url);
  if (cachedData) return cachedData;
  else {
    const hours = 24;
    const data = await Axios.get(url).then((res) => res.data);
    Cache.put(url, data, hours * 1000 * 60 * 60);
    return data;
  }
};

export default fetchWithCache;
