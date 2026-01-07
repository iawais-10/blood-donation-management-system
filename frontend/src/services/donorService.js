import api from "./api";

export async function getDonorProfile() {
  const { data } = await api.get("/donor/profile");
  return data;
}

export async function createAppointment(payload) {
  const { data } = await api.post("/donor/appointments", payload);
  return data;
}

export async function getMyAppointments() {
  const { data } = await api.get("/donor/appointments");
  return data;
}

export async function deleteAppointment(appointmentId) {
  const { data } = await api.delete(`/donor/appointments/${appointmentId}`);
  return data;
}
