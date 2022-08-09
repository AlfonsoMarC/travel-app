import { fetchWithToken } from "helpers/fetch";
import { LocationPayload, PostPayload, TripPayload } from "types/types";

export const createTrip = async (trip: TripPayload) => {
  try {
    const resp = await fetchWithToken({
      endpoint: "trips",
      body: trip,
      method: "POST"
    });
    const body = await resp.json();
    return body;
  } catch {
    return {
      error: "There was an error creating the trip"
    };
  }
};

export const createLocation = async (location: LocationPayload) => {
  try {
    const resp = await fetchWithToken({
      endpoint: "locations",
      body: location,
      method: "POST"
    });
    const body = await resp.json();
    return body;
  } catch {
    return {
      error: "There was an error creating the location"
    };
  }
};

export const createPosts = async ({ files, location, trip }: PostPayload) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const endpoint = "posts";
  const url = `${baseUrl}/${endpoint}`;
  const formData = new FormData();
  files.forEach((file: File) => {
    formData.append("images", file);
  });
  if (location) {
    formData.append("location", location);
  }
  if (trip) {
    formData.append("trip", trip);
  }
  const token = localStorage.getItem("token") || "";
  const resp = await fetch(url, {
    method: "post",
    headers: {
      "x-token": token
    },
    body: formData
  });
  const body = await resp.json();
  return body;
};
