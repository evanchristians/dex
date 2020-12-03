import Axios from "axios";
import cache from "memory-cache";

const fetchWithCache = async (url: string) => {
  const cachedData = await cache.get(url);
  if (cachedData) return cachedData;
  else {
    const hours = 24;
    const data = Axios.get(url).then(async (res) => {
      await cache.put(url, res.data, hours * 1000 * 60 * 60);
      return res.data;
    });

    return data;
  }
};

export default fetchWithCache;
