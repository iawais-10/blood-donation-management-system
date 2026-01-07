CREATE DATABASE IF NOT EXISTS bdms_db;
USE bdms_db;

DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS blood_requests;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('receiver', 'donor', 'admin') NOT NULL,
  blood_group VARCHAR(5) NULL,
  phone VARCHAR(30) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blood_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  receiver_id INT NOT NULL,
  blood_group VARCHAR(5) NOT NULL,
  quantity INT NOT NULL,
  urgency VARCHAR(20) NOT NULL,
  hospital VARCHAR(120) NOT NULL,
  city VARCHAR(80) NOT NULL,
  status ENUM('pending', 'approved', 'rejected', 'delivered') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_blood_requests_receiver
    FOREIGN KEY (receiver_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  notes TEXT NULL,
  status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_appointments_donor
    FOREIGN KEY (donor_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message TEXT NOT NULL,
  rating INT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_testimonials_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

-- Admin seed (no public signup)
-- Email: admin@bdms.com
-- Password: Admin@123
-- bcrypt hash (10 rounds): $2b$10$xGdg1LKzoSIv52aXGUvu8OUAO7AZKYhTWJomNDNO77AjEUjmodXgu

INSERT INTO users (name, email, password, role, blood_group, phone)
VALUES ('Admin', 'admin@bdms.com', '$2b$10$xGdg1LKzoSIv52aXGUvu8OUAO7AZKYhTWJomNDNO77AjEUjmodXgu', 'admin', NULL, NULL);

-- Sample testimonials
INSERT INTO testimonials (user_id, message, rating, is_approved) VALUES
(1, 'This platform saved my life! I received blood within hours of my emergency request. Forever grateful to all the donors and the admin team.', 5, TRUE),
(1, 'The appointment system is so easy to use. I was able to schedule my donation at my convenience. Great initiative!', 5, TRUE),
(1, 'Thanks to this system, blood donation has become more organized. I can track my appointments and see where my donations are making a difference.', 4, TRUE);
