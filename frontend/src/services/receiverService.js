import api from "./api";

export async function createBloodRequest(payload) {
  const { data } = await api.post("/receiver/requests", payload);
  return data;
}

export async function getMyRequests() {
  const { data } = await api.get("/receiver/requests");
  return data;
}

export async function deleteBloodRequest(requestId) {
  const { data } = await api.delete(`/receiver/requests/${requestId}`);
  return data;
}
