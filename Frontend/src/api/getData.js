import axios from "axios";

const link = process.env.BACKEND_URL ?? "http://localhost:5000";

export const getParts = async (page) => {
  if (page === undefined) page = 1;
  const response = await axios.get(`${link}/parts_paginated?page=${page}&per_page=10`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${link}/part_categories`);
  return response.data;
};

export const getSets = async (page) => {
  if (page === undefined) page = 1;
  const response = await axios.get(`${link}/sets_paginated`,
    {
      params: {
        page: page,
        per_page: 10,
      }
    }
  );
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
