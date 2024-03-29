import axios from "axios";

const link = "http://localhost:5000";

export const getParts = async () => {
  const response = await axios.get(`${link}/parts`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${link}/part_categories`);
  return response.data;
};

export const getSets = async () => {
  const response = await axios.get(`${link}/sets`);
  return response.data;
};

export const getThemes = async () => {
  const response = await axios.get(`${link}/themes`);
  return response.data;
};

export const getFilteredSets = async (column, value) => {
  const response = await axios.get(`${link}/set?`, {
    params: {
      [column]: value,
    },
  });
  return response.data;
}

export const getFilteredParts = async (column, value) => {
  const response = await axios.get(`${link}/part?`, {
    params: {
      [column]: value,
    },
  });
  return response.data;
}
export const getHistogram = async () => {
  const response = await axios.get(`${link}/sets/histogram`);
  return response.data;
};
