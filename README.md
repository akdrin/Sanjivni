# Sanjivni

Sanjivni is a telemedicine platform designed to connect **rural patients with doctors through local chemists**. In many rural areas, people visit a nearby pharmacy first when they feel sick, but doctors are often far away. Sanjivni bridges that gap by allowing chemists to collect patient vitals and connect them with registered doctors for consultation and prescriptions.

The goal is to make **primary healthcare accessible, structured, and digitally recorded** even in regions with limited medical infrastructure.

---

## Problem

In rural regions:

- Doctors are often unavailable or located far away.
- Patients rely heavily on local chemists for medical advice.
- Patient health data is rarely recorded or tracked.
- Follow-up consultations become difficult.

This leads to **misdiagnosis, repeated tests, and fragmented healthcare records**.

---

## Solution

Sanjivni introduces a structured workflow:

1. Patient visits a **chemist (Sanjivni Sahayak)**.
2. Chemist records **basic vitals** like blood pressure, temperature, and symptoms.
3. The system connects the patient with a **verified doctor**.
4. Doctor reviews the vitals and provides **diagnosis and prescription**.
5. The consultation and prescription are stored digitally for future reference.

This creates a **low-cost telemedicine bridge** between rural patients and qualified doctors.

---

## Key Features

- Chemist and Doctor authentication
- Role-based access control
- Patient record creation without requiring patient accounts
- Vital report recording by chemists
- Doctor diagnosis and prescription system
- Consultation tracking
- Structured medical history storage

---

## Tech Stack

**Frontend**

- React
- TailwindCSS

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose

**Authentication**

- JWT based authentication
- Role-based access control

---

## System Architecture

The backend follows a **feature-based modular architecture** to keep the system scalable and maintainable.

```
backend
│
├── controllers
├── routes
├── models
├── middleware
├── services
└── utils
```

---

## Database Design

### User

Stores both doctors and chemists.

Fields include:

- name
- role (Doctor / Sanjivni Sahayak)
- unique license ID
- email
- phone
- clinic name
- state
- verification status

---

### Patient

Patients do not need accounts.

Stores:

- name
- age
- gender
- phone
- createdByChemist

---

### Consultation

Represents a complete medical interaction.

Fields include:

- patientId
- chemistId
- doctorId
- symptoms
- status
- timestamps

---

### Vital Report

Recorded by chemists before consultation.

Includes:

- blood pressure
- body temperature
- heart rate
- oxygen level
- notes

---

### Prescription

Created by doctors after reviewing the consultation.

Includes:

- diagnosis
- medicines
- dosage
- additional tests
- doctor notes

---

## Consultation Flow

```
Patient visits chemist
        ↓
Chemist creates patient record
        ↓
Vitals are recorded
        ↓
Doctor reviews consultation
        ↓
Doctor writes prescription
        ↓
Consultation marked completed
```

---

## Security Measures

- Password hashing
- Unique license ID verification
- Role-based authorization
- Restricted doctor access
- Verified medical professionals only

---

## Future Improvements

- Video consultation support
- Digital medical document upload
- AI-based symptom analysis
- Medicine inventory for chemists
- Offline-first support for rural areas

---

## Vision

Sanjivni aims to create a **digital healthcare bridge for rural communities**, ensuring that even small villages can access qualified medical professionals through local healthcare providers.

---

## Author

**Aman**  
