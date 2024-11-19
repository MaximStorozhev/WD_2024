/* Disable foreign key checks temporarily */
SET FOREIGN_KEY_CHECKS=0;

/* Teachers Table */
CREATE TABLE Teachers (
    teacher_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    phone_number VARCHAR(30),
    registration_date DATE,
    bio TEXT,
    curriculum_name TEXT,
    subject_name TEXT,
    grade_level TEXT
);

/* Insert sample data into Teachers table */
INSERT INTO Teachers (teacher_id, name, email, password, phone_number, registration_date, bio, curriculum_name, subject_name, grade_level) 
VALUES 
(1, 'Alice Johnson', 'alice.j@example.com', 'password1', '123-456-7890', '2024-01-01', 'Expert in Mathematics', 'American', 'Math, Physics', 'Grade 11, Grade 12'),
(2, 'Ahmed Saif', 'bob.s@example.com', 'password2', '234-567-8901', '2024-02-15', 'Arabic teacher with 10 years of experience', 'IB', 'Arabic, Social studies', 'Grade 5, Grade 6, Grade 7, Grade 8'),
(3, 'Cathy Brown', 'cathy.b@example.com', 'password3', '345-678-9012', '2024-03-20', 'English literature specialist', 'IB', 'English', 'Grade 9, Grade 10, Grade 11, Grade 12');

/* Students Table */
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone_number VARCHAR(30),
    registration_date DATE
);

/* Insert sample data into Students table */
INSERT INTO Students VALUES 
(101, 'David White', 'david.w@example.com', '456-789-0123', '2024-01-10'),
(102, 'Eva Green', 'eva.g@example.com', '567-890-1234', '2024-02-18'),
(103, 'Frank Black', 'frank.b@example.com', '678-901-2345', '2024-03-22');

/* Subjects Table */
CREATE TABLE Subjects (
    subject_id INT PRIMARY KEY,
    subject_name VARCHAR(100),
    grade_level VARCHAR(20)
);

/* Insert sample data into Subjects table */
INSERT INTO Subjects VALUES 
(201, 'Mathematics', 'Grade 10'),
(202, 'Physics', 'Grade 11'),
(203, 'English', 'Grade 12');

/* Subscriptions Table */
CREATE TABLE Subscriptions (
    subscription_id INT PRIMARY KEY,
    student_id INT,
    teacher_id INT,
    start_date DATE,
    end_date DATE,
    subscription_fee DECIMAL(10,2),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id)
);

/* Insert sample data into Subscriptions table */
INSERT INTO Subscriptions VALUES 
(301, 101, 1, '2024-04-01', '2024-06-01', 100.00),
(302, 102, 2, '2024-04-15', '2024-07-15', 450.00),
(303, 103, 3, '2024-05-01', '2024-08-01', 850.00);

/* Payments Table */
CREATE TABLE Payments (
    payment_id INT PRIMARY KEY,
    subscription_id INT,
    amount DECIMAL(10,2),
    payment_date DATE,
    payment_method VARCHAR(50),
    FOREIGN KEY (subscription_id) REFERENCES Subscriptions(subscription_id)
);

/* Insert sample data into Payments table */
INSERT INTO Payments VALUES 
(401, 301, 100.00, '2024-04-05', 'Credit Card'),
(402, 302, 450.00, '2024-04-20', 'PayPal'),
(403, 303, 850.00, '2024-05-10', 'Bank Transfer');

/* Re-enable foreign key checks */
SET FOREIGN_KEY_CHECKS=1;
