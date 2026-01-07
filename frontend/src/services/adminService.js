import api from "./api";

export async function getAllRequests() {
  const { data } = await api.get("/admin/requests");
  return data;
}

export async function approveRequest(id) {
  const { data } = await api.patch(`/admin/requests/${id}/approve`);
  return data;
}

export async function rejectRequest(id) {
  const { data } = await api.patch(`/admin/requests/${id}/reject`);
  return data;
}

export async function markDelivered(id) {
  const { data } = await api.patch(`/admin/requests/${id}/deliver`);
  return data;
}

export async function getDonors() {
  const { data } = await api.get("/admin/donors");
  return data;
}

export async function getAppointments() {
  const { data } = await api.get("/admin/appointments");
  return data;
}

export async function getStats() {
  const { data } = await api.get("/admin/stats");
  return data;
}

export async function approveAppointment(id) {
  const { data } = await api.patch(`/admin/appointments/${id}/approve`);
  return data;
}

export async function rejectAppointment(id) {
  const { data } = await api.patch(`/admin/appointments/${id}/reject`);
  return data;
}

export async function deleteRequest(id) {
  const { data } = await api.delete(`/admin/requests/${id}`);
  return data;
}

export async function deleteAppointment(id) {
  const { data } = await api.delete(`/admin/appointments/${id}`);
  return data;
}

export async function getAllTestimonials() {
  const { data } = await api.get("/admin/testimonials");
  return data;
}

export async function approveTestimonial(id) {
  const { data } = await api.patch(`/admin/testimonials/${id}/approve`);
  return data;
}

export async function rejectTestimonial(id) {
  const { data } = await api.patch(`/admin/testimonials/${id}/reject`);
  return data;
}

export async function deleteTestimonial(id) {
  const { data } = await api.delete(`/admin/testimonials/${id}`);
  return data;
}
