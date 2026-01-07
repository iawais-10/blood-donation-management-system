import api from "./api";

export async function getApprovedTestimonials() {
  const { data } = await api.get("/testimonials");
  return data;
}

export async function submitTestimonial(testimonialData) {
  const { data } = await api.post("/testimonials", testimonialData);
  return data;
}

export async function getPublicDonors() {
  const { data } = await api.get("/public/donors");
  return data;
}
