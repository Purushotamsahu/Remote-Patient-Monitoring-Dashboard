# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

## Project Name: MediFlow
### AI-Powered Remote Patient Monitoring & Healthcare Management Platform

**Course Code:** CS-402  
**Course Name:** Software Engineering & Systems Design  

**Student Name:** Shivam Kumar  
**Student Registration Number:** 12112447  

**Prepared for:**  
Continuous Assessment 3  
Spring 2025  

---

## REVISION HISTORY

The development, refinement, and review process of the MediFlow Software Requirements Specification is systematically tracked below, documenting the progression of structural designs, validation protocols, and systems integration.

| Date | Version | Description of Changes | Author |
| :--- | :--- | :--- | :--- |
| May 10, 2024 | 1.0.0 | **Initial Specification Baseline**: Established high-level system boundaries, user role definitions, and core REST API routing proposals. Defined early MongoDB collections for authentication. | Shivam Kumar |
| October 15, 2024 | 1.5.0 | **Architectural Refinement**: Added doctor verification layouts, detailed medical telemetry database structures, validation rules for physiological metrics, and preliminary user interface wireframes. | Shivam Kumar |
| March 18, 2025 | 2.0.0 | **Advanced Services Integration**: Incorporated Google Gemini 2.5 Flash API summary layouts, real-time alert threshold checking, Laravel Reverb event broadcasting configurations, and React state management slices. | Shivam Kumar |
| May 18, 2026 | 3.0.0 | **Comprehensive Academic Revision**: Overhauled the document into a highly detailed 14-15 page equivalent format for Continuous Assessment 3 (CA3) submission. Expanded functional requirement sub-parts, fully populated database schemas, and integrated a complete REST API reference table. | Shivam Kumar |

---

## Table of Contents

* **REVISION HISTORY**...................................................................................................................................... ii
* **1. INTRODUCTION**...................................................................................................................................... 1
  * **1.1 PURPOSE**...................................................................................................................................... 1
  * **1.2 SCOPE**...................................................................................................................................... 1
  * **1.3 DEFINITIONS, ACRONYMS, AND ABBREVIATIONS**.................................................................. 1
  * **1.4 REFERENCES**...................................................................................................................................... 2
  * **1.5 OVERVIEW**...................................................................................................................................... 2
* **2. GENERAL DESCRIPTION**...................................................................................................................................... 3
  * **2.1 PRODUCT PERSPECTIVE**...................................................................................................................................... 3
  * **2.2 PRODUCT FUNCTIONS**...................................................................................................................................... 3
  * **2.3 USER CHARACTERISTICS**...................................................................................................................................... 4
  * **2.4 GENERAL CONSTRAINTS**...................................................................................................................................... 4
  * **2.5 ASSUMPTIONS AND DEPENDENCIES**.......................................................................................... 4
* **3. SPECIFIC REQUIREMENTS**...................................................................................................................................... 5
  * **3.1 EXTERNAL INTERFACE REQUIREMENTS**.......................................................................................... 5
    * **3.1.1 User Interfaces**...................................................................................................................................... 5
    * **3.1.2 Hardware Interfaces**...................................................................................................................................... 5
    * **3.1.3 Software Interfaces**...................................................................................................................................... 6
    * **3.1.4 Communications Interfaces**....................................................................................................................... 6
  * **3.2 FUNCTIONAL REQUIREMENTS**...................................................................................................................................... 7
    * **3.2.1 User Authentication & Authorization (RBAC)**......................................................................... 7
    * **3.2.2 Real-time Health Vital Monitoring & Tracking**.......................................................................... 9
    * **3.2.3 Appointment Scheduling & Booking System**.......................................................................... 11
    * **3.2.4 AI-Powered Health Report Generation & Insights**.................................................................. 13
    * **3.2.5 Real-Time Critical Alerts & Notifications**................................................................................. 15
    * **3.2.6 Doctor Credentials Verification Control Center**....................................................................... 17
* **3.5 NON-FUNCTIONAL REQUIREMENTS**.......................................................................................... 19
    * **3.5.1 Performance**...................................................................................................................................... 19
    * **3.5.2 Reliability**...................................................................................................................................... 19
    * **3.5.3 Availability**...................................................................................................................................... 20
    * **3.5.4 Security**...................................................................................................................................... 20
    * **3.5.5 Maintainability**...................................................................................................................................... 21
    * **3.5.6 Portability**...................................................................................................................................... 21
  * **3.7 DESIGN CONSTRAINTS**...................................................................................................................................... 22
  * **3.9 OTHER REQUIREMENTS**...................................................................................................................................... 22
* **4. ANALYSIS MODELS**...................................................................................................................................... 23
  * **4.1 DATA FLOW DIAGRAMS (DFD)**...................................................................................................................................... 23
* **5. GITHUB LINK**...................................................................................................................................... 25
* **A. APPENDICES**...................................................................................................................................... 26
  * **A.1 APPENDIX 1: DATABASE COLLECTION SCHEMAS**................................................................. 26
  * **A.2 APPENDIX 2: REST API ENDPOINT REFERENCE**...................................................................... 28

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) establishes a complete, formal, and unambiguous requirements baseline for the **MediFlow** platform. This document serves as the primary technical blueprint and system boundary definition for the software engineering, design, and quality assurance teams. 

The primary target audience comprises:
1. **Systems Architects**: To guide structural decisions regarding stateless REST APIs and NoSQL schemaless database collections.
2. **Backend Engineers (Laravel)**: To establish precise routes, data validations, business logic layers, and WebSocket configurations.
3. **Frontend Developers (React)**: To define user interfaces, state management slices, and dynamic roles routing.
4. **Quality Assurance (QA) Teams**: To serve as the definitive specification for constructing automated PHPUnit and Jest test suites.
5. **Academic Evaluators & Health Compliance Officers**: To verify architectural adherence to standard software engineering patterns (IEEE Std 830-1998) and medical data privacy principles.

### 1.2 Scope
**MediFlow** is a secure, cloud-native Remote Patient Monitoring (RPM) and Healthcare Management Platform. It is engineered to bridge the clinical gap between patients, verified medical practitioners, and system administrators. By providing continuous telemetry ingestion, automated anomaly detection, and AI-powered analytical synthesis, MediFlow transforms passive medical record keeping into active, preventive clinical management.

#### System Boundaries: What the Software Will Do
* **Dynamic Role-Based Workspaces**: Provide tailored dashboards for Patients (Care Hub), Doctors (Command Center), and Administrators.
* **Continuous Physiological Telemetry Ingestion**: Capture and track five core medical metrics: Heart Rate (BPM), Blood Oxygen (SpO2), Temperature (°F), Blood Pressure (Systolic/Diastolic), and Blood Sugar Level (mg/dL) via manual telemetry logs and standardized API interfaces.
* **Immediate Warning Pushes**: Detect physiological threshold violations (e.g., SpO2 < 94%, Heart Rate > 120 bpm) and broadcast real-time critical warnings to assigned doctors in less than 500 milliseconds via WebSockets.
* **AI-Powered Clinical Diagnostics Support**: Integrate with the Google Gemini 2.5 Flash API to compile complex, multi-week physiological telemetry data into highly structured, plain-text risk highlights and recommendations.
* **Vetted Appointment Scheduling**: Prevent double-bookings and time-slot conflicts by checking calendar availability before creating scheduled appointment documents.
* **Credentials Verification Panel**: Allow administrators to inspect uploaded license keys and clinical credentials before activating doctor accounts.

#### Out of Scope: What the Software Will NOT Do
* **Primary Prescriptions**: The platform will not generate legally binding primary drug prescriptions or dictate critical medical dosages autonomously. All AI-generated text is classified as "diagnostic support recommendations" and requires verified doctor approval.
* **Direct Clinical Intervention**: The platform does not directly interface with active clinical hardware (e.g., life support controllers, automated insulin pumps) to execute direct therapeutic commands.
* **Emergency Medical Dispatch**: MediFlow is not an automated replacement for national emergency dispatch services (such as 911). It warns assigned doctors and contacts, but does not guarantee immediate hospital ambulance routing.

### 1.3 Definitions, Acronyms, and Abbreviations
To ensure consistent technical and clinical interpretation across this document, the following definitions are defined:

* **JWT (JSON Web Token)**: A compact, URL-safe means of representing claims to be transferred between two parties. Used as a stateless token-based authorization mechanism carried in HTTP headers.
* **RBAC (Role-Based Access Control)**: An approach to restricting system access to authorized users based on defined database roles: Patient, Doctor, and Administrator.
* **WebSocket**: A standardized communication protocol providing full-duplex communication channels over a single, long-lived TCP connection, facilitated in MediFlow via Laravel Reverb.
* **DFD (Data Flow Diagram)**: A graphical representation of the "flow" of data through an information system, detailing external entities, processes, data stores, and data flows.
* **LLM (Large Language Model)**: Artificial intelligence models trained on massive text corpuses, represented in MediFlow by the Google Gemini 2.5 Flash API for automated reporting.
* **NoSQL (Not Only SQL)**: A non-relational database design. MediFlow utilizes MongoDB, representing records as BSON/JSON-like documents rather than traditional relational tables.
* **HIPAA (Health Insurance Portability and Accountability Act)**: A US federal law establishing data privacy and security provisions for safeguarding medical information.
* **MTBF (Mean Time Between Failures)**: The predicted elapsed time between inherent failures of a mechanical or electronic system during normal system operation.
* **API (Application Programming Interface)**: A set of defined rules that enable different application utilities to communicate with each other.
* **Laravel Reverb**: A high-performance, built-in WebSocket server designed specifically for Laravel applications, enabling real-time events broadcasting.
* **SPA (Single Page Application)**: A web application or website that interacts with the user by dynamically rewriting the current web page with new data from the server, rather than default browser page loads.

### 1.4 References
1. **IEEE Std 830-1998**: *IEEE Recommended Practice for Software Requirements Specifications*. Institute of Electrical and Electronics Engineers, New York.
2. **MongoDB Database Technical Manual (v6.0+)**: Document modeling guidelines, index behaviors, and transactional durability metrics. MongoDB Inc.
3. **Laravel 12 Application Architecture Guide**: Event broadcasting, service isolation, middleware filtering, and Eloquent ORM abstractions. Taylor Otwell, Laravel LLC.
4. **React 18.3 & Vite 7 Official Specifications**: Component lifecycle, virtual DOM reconciliation, and fast building assets pipeline. React Team.
5. **Google Gemini API Documentation (v1beta)**: Schema specifications for stateless prompt generation, system instructions, and JSON response constraints. Google DeepMind.
6. **HIPAA Security Rule Standards (45 CFR Part 160 and Part 164, Subparts A and C)**: Technical safeguards for electronic Protected Health Information (ePHI) in cloud platforms.

### 1.5 Overview
This Software Requirements Specification is organized to facilitate rapid technical parsing and clear validation tracking.
* **Section 2 (General Description)** provides high-level system context, architectural models, basic user characteristics, system-wide design constraints, and primary operational dependencies.
* **Section 3 (Specific Requirements)** presents the precise engineering requirements. It details external user, hardware, software, and communication interfaces, followed by an in-depth breakdown of the 6 core functional requirements. Each functional feature is fully documented across 5 key dimensions: Introduction, Inputs, Processing, Outputs, and Error Handling.
* **Section 3.5 (Non-Functional Requirements)** defines quantitative benchmarks for performance, reliability, availability, security, maintainability, and portability.
* **Section 4 (Analysis Models)** provides Level 0 and Level 1 Data Flow Diagrams using standard visual modeling to trace transaction paths through the platform.
* **Appendices** provide low-level developer documentation: **Appendix A.1** details complete database collections and index settings, while **Appendix A.2** details the entire REST API endpoint matrix.

---

## 2. General Description

### 2.1 Product Perspective
MediFlow is engineered as a modern, decoupled cloud application. The frontend is a highly responsive React single-page application built using Vite, communicating with a stateless Laravel 12 API backend. 

Data persistence is managed via MongoDB Atlas, utilizing loose schemas and optimized indexing structures. Real-time events, such as clinical alarms and booking confirmations, are synchronized asynchronously through Laravel Reverb WebSocket connections.

```
       +--------------------------------------------------------+
       |               React 18.3 Client (SPA)                  |
       |  - Care Hub (Patient)  - Command Center (Doctor)       |
       +-----------┬────────────────────────────▲---------------+
                   │                            │
      HTTP/HTTPS   │                            │ WSS:// WebSockets
      (REST API)   │                            │ (Laravel Reverb)
                   ▼                            │
       +----------------------------------------┴---------------+
       |             Laravel 12 API Backend                     |
       |   - Auth & RBAC Middleware  - Service / Repo Layers    |
       +-----┬───────────────────┬────────────────────────┬-----+
             │                   │                        │
             ▼                   ▼                        ▼
     +---------------+   +---------------+       +------------------+
     | MongoDB Atlas |   | Google OAuth  |       | Google Gemini    |
     | (Cloud NoSQL) |   | (Social Auth) |       | (AI Diagnostics) |
     +---------------+   +---------------+       +------------------+
```

As illustrated, the application relies on two external API integrations: Google OAuth 2.0 for secure social authentication and Google Gemini 2.5 Flash for telemetry processing.

### 2.2 Product Functions
The core capabilities of the MediFlow platform are organized into six functional areas:
1. **User Authentication & Authorization (RBAC)**: Secure user sign-up, bcrypt password hashing, JWT generation, and middleware token verification across Patient, Doctor, and Admin roles.
2. **Real-time Health Vital Monitoring & Tracking**: Log, store, and visually graph patient biometrics over daily, weekly, and monthly intervals.
3. **Appointment Scheduling & Booking System**: Enable patients to search verified doctors, check real-time schedule slots, book appointments, and let doctors confirm or reschedule.
4. **AI-Powered Health Report Generation & Insights**: Consolidate biometric logs and generate natural language risk summaries and diagnostic recommendations using generative AI.
5. **Real-Time Critical Alerts & Notifications**: Automatically compare incoming patient metrics against safe parameters and push WebSocket alerts to assigned doctors when anomalies are detected.
6. **Doctor Credentials Verification Control Center**: Provide administrators with a dashboard to approve or reject doctor license submissions before accounts are integrated into the scheduling system.

### 2.3 User Characteristics
The user interface and interaction flows are designed around the specific capabilities and needs of three distinct user classes:

* **Patients**: 
  * *Characteristics*: Diverse age groups, potentially low technical literacy, and varying physical conditions.
  * *UI Implications*: Requires a simple, highly readable interface featuring clear status badges (e.g., a green "Healthy" or red "Critical" indicator), large numeric inputs for manual biometric logs, and a clean calendar system.
* **Doctors (Medical Practitioners)**: 
  * *Characteristics*: High professional expertise, limited time, and a need for rapid access to key clinical data.
  * *UI Implications*: Requires a detailed, high-density dashboard featuring real-time interactive line charts, patient lists filterable by alert severity, and single-click AI report summaries to support clinical workflows.
* **Administrators**: 
  * *Characteristics*: Technical support personnel focused on system security, verification, and audit trails.
  * *UI Implications*: Requires text-dense tables for license inspections, system-wide analytics logs, and robust user management interfaces.

### 2.4 General Constraints
* **HIPAA Compliance**: To protect sensitive medical records (ePHI), all telemetry and diagnostic data must be encrypted using TLS 1.3 in transit and AES-256 at rest within MongoDB Atlas. Access logs must be maintained for 7 years.
* **Stateless API Design**: The server must not store session state in memory. All requests must be authenticated via stateless JSON Web Tokens (JWT) carried in the HTTP `Authorization` header.
* **NoSQL Database Constraint**: Referential integrity checks (such as ensuring a metric is linked to a valid patient) cannot rely on native database foreign key cascades. All validation checks must be enforced within the Laravel Service layer code.

### 2.5 Assumptions and Dependencies
* **External API Availability**: The AI reporting features assume continuous availability and sufficient API quotas for the Google Gemini 2.5 Flash API.
* **OAuth Infrastructure**: The social login features depend on the operational state of the Google Google OAuth 2.0 servers.
* **Persistent Web Connection**: Clients must maintain an active internet connection to sustain WebSocket loops with the Laravel Reverb server. If disconnected, clients will automatically fall back to standard HTTP polling.

---

## 3. Specific Requirements

### 3.1 External Interface Requirements

#### 3.1.1 User Interfaces
The user interfaces are responsive, accessible, and structured using utility-first styling patterns.
* **Visual Palette**: Implements a glassmorphic design system using the following values:
  * *Background Color*: Deep Slate Navy (`#0b0f19` / HSL `222, 40%, 7%`) for reduced eye strain during extended use.
  * *Card/Element Color*: Semitransparent Slate (`rgba(17, 24, 39, 0.7)` / HSL `224, 71%, 4%`) with a subtle `backdrop-filter: blur(12px)` and thin border overlay (`rgba(255, 255, 255, 0.08)`).
  * *Primary Accent*: Electric Violet Blue (`#6366f1` / HSL `239, 84%, 67%`).
  * *Normal Vital indicator*: Emerald Green (`#10b981` / HSL `162, 76%, 41%`).
  * *Alert/Emergency Indicator*: Vivid Crimson (`#ef4444` / HSL `0, 84%, 60%`).
* **Typography**: Outfitted with a premium sans-serif typeface hierarchy utilizing **Outfit** and **Inter** loaded from Google Fonts:
  ```css
  font-family: 'Outfit', 'Inter', system-ui, sans-serif;
  ```
* **Layout Design**: Responsive layout adaptivity:
  * *Desktop View (>1024px)*: A multi-column layout featuring a sticky sidebar, dynamic stat cards, real-time vital graphs, and an active alert feed.
  * *Mobile View (<640px)*: A single-column layout optimized for touch, featuring bottom-navigation tabs, swipe actions, and simplified numeric logging forms.

#### 3.1.2 Hardware Interfaces
* **Telemetry Data Sources**: Supports manual numeric inputs, and features background endpoints designed to ingest standardized JSON payloads from external IoT medical devices (e.g., connected pulse oximeters, digital thermometers).
* **System Specifications**:
  * *Application Server*: Minimum 2GB RAM, 1 Core CPU, and 10GB SSD storage (sufficient for running Laravel, Node.js, and local caching).
  * *Database Server (MongoDB Cloud)*: Standard shared cluster or M10 instance with a minimum of 512MB RAM and automated daily backup routines.
  * *Client Terminals*: Any modern web-enabled device (PC, tablet, or smartphone) with at least 1GB of system memory.

#### 3.1.3 Software Interfaces
* **Operating Systems**: Designed for full cross-platform compatibility across Windows 10/11, macOS (12+), and standard Linux distributions (Ubuntu 22.04+).
* **Runtimes & Frameworks**:
  * *Backend*: PHP 8.2+ running Laravel 12.
  * *Frontend*: Node.js 18+ running React 18.3, utilizing Vite 7.0 for asset compilation.
  * *Database*: MongoDB Community Server (v6.0+) or MongoDB Atlas cluster.
* **External Services**:
  * *Google Gemini API*: Uses REST client interfaces to connect with the `gemini-2.5-flash` model.
  * *Google OAuth*: Integrates with the OAuth 2.0 API for social logins.

#### 3.1.4 Communications Interfaces
* **Secure Protocols**: Enforces HTTPS (TLS 1.3) for all web application routes. Raw HTTP requests to port 80 are redirected to port 443.
* **WebSocket Ingestion**: Uses secure WebSocket streams (`wss://`) managed via Laravel Reverb on port 8080.
* **Authorization Headers**: Enforces stateless JWT validation. The React frontend must attach the credentials token to every API request using the standard HTTP header:
  ```http
  Authorization: Bearer <JWT_Token_String>
  ```

---

### 3.2 Functional Requirements

#### 3.2.1 User Authentication & Authorization (RBAC)

##### 3.2.1.1 Introduction
Restricts access to specific patient, doctor, and admin portals based on role access keys. Ensures that clinical databases remain isolated and secure.

##### 3.2.1.2 Inputs
* **Local Signup**: Email, Name, Password (minimum 8 characters, containing uppercase, lowercase, and special characters), Role (patient/doctor/admin), and phone number (+91 format).
* **Google OAuth**: A signed OAuth authorization code redirected to the callback endpoint.
* **Local Login**: Email and Password.

##### 3.2.1.3 Processing
1. **Validation**: Check for password format compliance and query the `users` collection to prevent duplicate email registrations.
2. **Encryption**: Apply the bcrypt algorithm with a work index of 12 to encrypt passwords:
   $$\text{Hash} = \text{bcrypt}(\text{password}, 12)$$
3. **Google Authentication Integration**:
   - Verify the Google authorization code against Google OAuth servers.
   - If the user exists, retrieve their profile; otherwise, create a new record in the `users` collection and generate a corresponding record in the `patients` collection.
4. **Token Generation**: Generate a JSON Web Token (JWT) signed with the server's private secret (`HS256`). The token payload must contain the user ID, email, role, and expiration time (set to 60 minutes).
5. **Role-Based Access Control**:
   - When a request is received, the `JWTAuth` middleware extracts and validates the token.
   - The `RoleMiddleware` checks the user's role against the endpoint's access criteria (e.g., restricting `/api/v1/admin/*` paths to users with the `admin` role).

##### 3.2.1.4 Outputs
* **HTTP 200 OK**: Returns a JSON object containing the signed JWT string, expiration timestamp, and user profile data (ID, name, email, role, avatar).
* **Dynamic Route Redirects**: The frontend router redirects the user to `/patient`, `/doctor`, or `/admin` based on the role parsed from the JWT.

##### 3.2.1.5 Error Handling
* **HTTP 422 Unprocessable Entity**: Returned if validation fails (e.g., invalid email format, weak password, or duplicate email).
* **HTTP 401 Unauthorized**: Returned if login credentials do not match or if a token is expired, invalid, or missing.
* **HTTP 403 Forbidden**: Returned if a user attempts to access an endpoint restricted to a different role (e.g., a patient attempting to access `/api/v1/admin/users`).

```php
// Example: Laravel RoleMiddleware Enforcement
public function handle(Request $request, Closure $next, ...$roles)
{
    $user = $request->user();
    if (! $user || ! in_array($user->role, $roles)) {
        return response()->json(['error' => 'Unauthorized role access.'], 403);
    }
    return $next($request);
}
```

---

#### 3.2.2 Real-time Health Vital Monitoring & Tracking

##### 3.2.2.1 Introduction
Manages the entry, database persistence, visual graphing, and physiological limit validation of patient vital signs.

##### 3.2.2.2 Inputs
* **Biometric Telemetry**: Numeric values for Heart Rate (bpm), Oxygen Saturation (SpO2 percentage), Body Temperature (°F), Systolic Blood Pressure (mmHg), Diastolic Blood Pressure (mmHg), and Blood Sugar (mg/dL).
* **Metadata**: Patient ID (ObjectId reference to the `patients` collection), notes, and timestamp.

##### 3.2.2.3 Processing
1. **Validation**: Enforce range limits on incoming metrics to prevent erroneous records:
   - Heart Rate: 30 to 220 bpm.
   - SpO2: 50% to 100%.
   - Temperature: 90°F to 110°F.
   - Systolic BP: 70 to 200 mmHg; Diastolic BP: 40 to 130 mmHg.
   - Blood Sugar: 40 to 500 mg/dL.
2. **Database Persistence**: Write a new document containing the validated metrics and metadata to the `health_metrics` collection, updating the patient's record.
3. **Threshold Check**: Compare the new values against physiological safety bounds:
   - Critical: SpO2 < 94%, Heart Rate > 120 bpm, Heart Rate < 50 bpm, Systolic BP > 160 mmHg.
4. **Broadcast**:
   - If a metric is within normal limits, broadcast the updated data to the assigned doctor's active session using the `HealthMetricUpdated` WebSocket event via Laravel Reverb.
   - If a metric violates safety bounds, trigger the `AlertCreated` event (see 3.2.5).

##### 3.2.2.4 Outputs
* **HTTP 201 Created**: Returns a JSON object containing the saved metrics document and a status flag indicating whether the metrics are normal or critical.
* **Dashboard Updates**: Update the line charts on the patient's Care Hub and the assigned doctor's Command Center in real time.

##### 3.2.2.5 Error Handling
* **HTTP 422 Unprocessable Entity**: Returned if any biometric input falls outside the defined validation limits (e.g., a heart rate of 350 bpm).
* **HTTP 404 Not Found**: Returned if the patient ID cannot be resolved.

```javascript
// Example: Health Metric Document in MongoDB
{
  "_id": ObjectId("6648da5e1b2f2d1e2c8a0021"),
  "patient_id": ObjectId("6648da5e1b2f2d1e2c8a0001"),
  "heart_rate": 78,
  "spo2": 98,
  "temperature": 98.6,
  "bp_systolic": 120,
  "bp_diastolic": 80,
  "sugar_level": 110,
  "notes": "Patient reports feeling healthy.",
  "measured_by": "manual",
  "created_at": ISODate("2026-05-18T14:30:00.000Z")
}
```

---

#### 3.2.3 Appointment Scheduling & Booking System

##### 3.2.3.1 Introduction
Manages clinical session bookings between patients and verified medical practitioners, preventing scheduling conflicts.

##### 3.2.3.2 Inputs
* **Booking Parameters**: Doctor ID (ObjectId reference to the `users` collection), target date and time slot (ISO 8601 string), type (consultation/follow-up/emergency), and patient notes.
* **Doctor Action**: Appointment ID and status updates (`confirmed`, `cancelled`, `completed`, `no_show`).

##### 3.2.3.3 Processing
1. **Verification Check**: Ensure the target doctor's account is verified (`is_verified = true`).
2. **Conflict Validation**: Query the `appointments` collection to check for existing appointments with the selected doctor at the requested time:
   $$\text{ConflictExists} = \text{Query}(\text{doctor\_id}, \text{scheduled\_at}, \text{status} \neq \text{'cancelled'})$$
3. **Persistence**:
   - If no conflict exists, write a new appointment document with a status of `scheduled`.
   - Update the appointment status upon doctor action, adding cancellation reasons or completion timestamps as appropriate.
4. **Notification**: Broadcast real-time status updates to the patient and doctor via WebSockets.

##### 3.2.3.4 Outputs
* **HTTP 201 Created**: Returns the new appointment document.
* **HTTP 200 OK**: Returns the updated appointment document after a status change.
* **Calendar Integration**: Instantly displays the booking in the patient's Care Hub and the doctor's calendar feed.

##### 3.2.3.5 Error Handling
* **HTTP 403 Forbidden**: Returned if a patient attempts to book an appointment with an unverified doctor.
* **HTTP 409 Conflict**: Returned if the selected time slot is already booked.
* **HTTP 422 Unprocessable Entity**: Returned if the target date is in the past.

```javascript
// Example: Appointment Conflict Check Query
db.appointments.find({
  "doctor_id": ObjectId("6648da5e1b2f2d1e2c8a0110"),
  "scheduled_at": ISODate("2026-05-20T10:00:00.000Z"),
  "status": { $ne: "cancelled" }
})
```

---

#### 3.2.4 AI-Powered Health Report Generation & Insights

##### 3.2.4.1 Introduction
Consolidates patient biometric history and uses generative AI (Google Gemini 2.5 Flash API) to produce analytical summaries and diagnostic support recommendations.

##### 3.2.4.2 Inputs
* **Doctor Trigger**: Target Patient ID and evaluation time window (7 days, 30 days).
* **Payload**: Patient profile data (age, gender, allergies) and historical biometric metrics.

##### 3.2.4.3 Processing
1. **Data Consolidation**: Retrieve the patient's demographic information and fetch health metrics for the selected time window.
2. **Payload Preparation**: Structure the consolidated data into a clean JSON payload.
3. **AI Interface**:
   - Dispatch an authenticated POST request to the Google Gemini 2.5 Flash API endpoint:
     ```http
     POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
     ```
   - Provide a system instruction prompt directing the model to output a structured health analysis including risk highlights and clinical recommendations.
4. **Response Parsing**: Parse the JSON response, extract the generated analysis, and write a new document to the `reports` collection with a status of `draft`.

##### 3.2.4.4 Outputs
* **HTTP 201 Created**: Returns the compiled draft report, displaying the AI analysis on the doctor's review dashboard.
* **Report View**: Displays the finalized, doctor-approved summary in the patient's portal.

##### 3.2.4.5 Error Handling
* **Fallback Logic**: If the Gemini API is unavailable or rate limits are reached, the system falls back to a static analysis engine. This engine calculates basic statistical trends (min, max, average, and standard deviation) and generates a standardized, rules-based summary.
* **HTTP 500 Internal Server Error**: Returned only if the system is unable to compile data or write to the database.

```javascript
// Example: Gemini Prompt Structure
{
  "contents": [{
    "parts": [{
      "text": "Analyze the following clinical vital signs for a 45-year-old male patient over 7 days. Identify metric deviations, classify risk levels, and output a structured list of medical recommendations: Heart Rate Avg: 98, SpO2 Avg: 93.8%, Systolic BP Avg: 145."
    }]
  }],
  "systemInstruction": {
    "parts": [{
      "text": "You are a professional assistant designed to aid clinicians in diagnostics. Present findings objectively. Output two clear sections: 1. Risk Highlights and 2. Clinical Recommendations."
    }]
  }
}
```

---

#### 3.2.5 Real-Time Critical Alerts & Notifications

##### 3.2.5.1 Introduction
Constantly monitors incoming patient vital signs against physiological safety bounds, broadcasting critical alarms to assigned doctors when anomalies are detected.

##### 3.2.5.2 Inputs
* **Incoming Metrics**: Telemetry data from manual logs or IoT devices.
* **Safety Bounds**: Defined limits (e.g., SpO2 < 94%, Heart Rate > 120 bpm, Systolic BP > 160 mmHg).

##### 3.2.5.3 Processing
1. **Real-time Assessment**: Compare incoming biometric values against defined physiological bounds.
2. **Alert Creation**:
   - If an anomaly is detected, create a new document in the `alerts` collection, setting the severity status (e.g., `critical` or `emergency`).
   - Associate the alert with the patient ID and the assigned doctor ID.
3. **Real-time Broadcast**: Fire the `AlertCreated` event, routing the alert to the assigned doctor's WebSocket channel via Laravel Reverb:
   ```
   doctor.{doctorId}.alerts
   ```

##### 3.2.5.4 Outputs
* **Audio-Visual Alarm**: Instantly displays a persistent red alert banner and plays an audible warning on the doctor's Command Center dashboard.
* **Patient Hub Warning**: Displays a persistent warning badge on the patient's dashboard, advising them to contact their healthcare provider.

##### 3.2.5.5 Error Handling
* **WebSocket Disconnection Fallback**: If the WebSocket connection drops, the frontend fallback loop polls the alerts API endpoint every 15 seconds.
* **HTTP 500 Internal Server Error**: Returned if the system fails to persist the alert document to the database.

```javascript
// Example: Real-time Alert Document
{
  "_id": ObjectId("6648da5e1b2f2d1e2c8a0099"),
  "patient_id": ObjectId("6648da5e1b2f2d1e2c8a0001"),
  "doctor_id": ObjectId("6648da5e1b2f2d1e2c8a0110"),
  "type": "vital_abnormal",
  "severity": "critical",
  "message": "Patient SpO2 level dropped below threshold: 92% (Normal: >=94%).",
  "condition": { "field": "spo2", "value": 92, "threshold": 94 },
  "status": "unread",
  "created_at": ISODate("2026-05-18T14:35:10.000Z")
}
```

---

#### 3.2.6 Doctor Credentials Verification Control Center

##### 3.2.6.1 Introduction
Provides administrators with a secure vetting dashboard to verify doctor registration credentials, medical license keys, and certifications before accounts are activated.

##### 3.2.6.2 Inputs
* **Registration Submission**: Medical license key (string), medical board certification (file path), and clinical specialty.
* **Admin Action**: Registration ID and verification choice (`approve` or `reject`).

##### 3.2.6.3 Processing
1. **Pending Status**: Set the user's verification status to `pending` upon doctor registration:
   - `is_verified` = false
   - `verification_status` = `pending`
2. **Admin Vetting**:
   - Compile pending submissions in the Administrator Control Panel.
   - Allow administrators to inspect license keys and credentials.
3. **Activation**:
   - If approved, update `is_verified` to `true` and set `verification_status` to `verified`.
   - If rejected, update `verification_status` to `rejected`, keeping `is_verified` as `false`.
4. **Integration**: Integrate verified doctors into the patient portal's searchable list.

##### 3.2.6.4 Outputs
* **HTTP 200 OK**: Returns the updated user profile reflecting the verification status change.
* **Status Updates**: Sends an email notification to the doctor informing them of their account status.
* **Directory Integration**: Automatically includes verified doctors in the patient-facing clinical directory.

##### 3.2.6.5 Error Handling
* **Access Control**: Returns an HTTP 403 Forbidden error if a user without the `admin` role attempts to access or modify verification states.
* **Validation Enforcement**: Prevents unverified doctors from scheduling appointments or managing patients.

---

### 3.5 Non-Functional Requirements

#### 3.5.1 Performance
* **API Speed**: Standard REST API queries must return responses in under **200 milliseconds** under normal load conditions.
* **Real-time Alert Delivery**: Critical alarms must be routed via WebSockets from database persistence to the assigned doctor's screen in under **500 milliseconds**.
* **Page Load Optimization**: Client-side assets (compiled with Vite) must load and become interactive in under **2.0 seconds** over a standard broadband connection.
* **UI Rendering**: The dashboard line charts must render at a consistent **60 FPS** to ensure smooth performance during interaction.

#### 3.5.2 Reliability
* **Data Integrity**: Enforce atomic writes using MongoDB transaction controls when updating related records.
* **Continuous Operation**: Maintain a targeted Mean Time Between Failures (MTBF) of at least **30 days** for core system runtimes.
* **Automatic Backups**: Perform automated incremental backups of MongoDB Atlas hourly, with full snapshot backups generated daily and retained for 30 days.

#### 3.5.3 Availability
* **Service Uptime**: The system targets a minimum continuous uptime of **99.5%**, excluding planned maintenance windows.
* **Self-Healing WebSockets**: The React frontend must implement automatic reconnection logic that retries dropped WebSocket connections every 5 seconds, up to 10 consecutive attempts before falling back to HTTP polling.

#### 3.5.4 Security
* **Access Control**: Enforce stateless token-based authorization via JWT (using the `HS256` signature algorithm). Tokens must expire after 60 minutes.
* **Data Encryption**:
  - Encrypt all HTTP traffic using TLS 1.3.
  - Secure all database records at rest using AES-256 encryption within MongoDB Atlas.
  - Hash all passwords using the bcrypt algorithm with a work factor of 12.
* **Data Privacy**: Implement database logging for all actions involving patient records to maintain a HIPAA-compliant audit trail.
* **Sanitization**: Sanitize all API inputs to prevent injection attacks and Cross-Site Scripting (XSS).

#### 3.5.5 Maintainability
* **Architectural Organization**: Enforce a decoupled Service Layer architecture to separate business logic from HTTP controller routing.
* **Code Standards**: The backend codebase must adhere to the **PSR-12** PHP styling guidelines, and the React frontend must comply with standardized ESLint configuration rules.
* **Component Design**: UI components must be modular, reusable, and self-contained, leveraging utility classes in Tailwind CSS to ensure easy maintenance.

#### 3.5.6 Portability
* **Browser Compatibility**: The user interface must maintain functional parity across all major modern web browsers:
  - Google Chrome (v100+)
  - Apple Safari (v15+)
  - Mozilla Firefox (v98+)
  - Microsoft Edge (v100+)
* **Environment Independence**: The backend must run on standard server environments hosting PHP 8.2+ and Node.js 18+, and it must support containerization via Docker.

---

### 3.7 Design Constraints
* **Database Engine**: The application must run on MongoDB Atlas or a local MongoDB community server (v6.0+). Traditional SQL relational database structures are not allowed.
* **Styling Framework**: The user interface must be styled using utility classes in Tailwind CSS. Custom CSS overrides should be kept to a minimum to maintain design consistency.
* **Session Architecture**: The application server must remain stateless. Server-side session storage (e.g., standard PHP sessions) is not permitted, and all user context must be verified using client-side Redux store configurations and JWT payloads.

---

### 3.9 Other Requirements
* **Development Isolation**: Sandbox configurations and test suites must be isolated from the production database cluster.
* **Data Archiving Policy**: Health metrics logs older than 12 months must be archived to cold storage files (compressed JSON formats) once per quarter. This helps optimize active database query speeds and manage storage costs.

---

## 4. Analysis Models

### 4.1 Data Flow Diagrams (DFD)

#### Level 0 Context Diagram
The Level 0 Context Diagram illustrates the main boundary of the MediFlow application, showing the interactions between external actors (Patients, Doctors, and Administrators) and the core platform.

```
                  +----------------------------------------------+
                  |                 Patient                      |
                  +------┬--------------------------------▲------+
                         │                                │
      Vitals Entry,      │                                │  Alert Notification,
      Booking Requests   │                                │  Reports Access
                          ▼                                │
                 +------------------------------------------------+
                 |                                                |
                 |              MEDIFLOW SYSTEM                   |
                 |                 (CORE)                         |
                 |                                                |
                 +------▲--------------------------------──▲------+
                        │                                  │
    Clinical Notes,     │                                  │  Doctor Approvals,
    Report Requests     │                                  │  System Statistics
                        │                                  │
                  +-----┴──────────────────+        +──────┴───────────────+
                  |        Doctor          |        |      Admin           |
                  +------------------------+        +----------------------+
```

#### Level 1 DFD: System Operations Breakdown
The Level 1 Data Flow Diagram traces data transactions through the system's core processes, illustrating interactions with specific MongoDB data collections.

```
       [ Patient ]                                              [ Doctor ]
         │     ▲                                                  │     ▲
         │     │                                                  │     │
         │ (1.2) Live Vitals                                      │ (3.1) Patient List
  (1.1)  │     │                                           (3.2)  │     │
  Record │     │                                           Review │     │
  Vitals │     │                                           Alerts │     │
         ▼     │                                                  ▼     │
   ┌───────────┴──────────┐                                ┌────────────┴─────────┐
   │ 1.0 Vitals Manager   ├───────────────────────────────>│  3.0 Doctor Workspace│
   └───────────┬──────────┘        WebSocket Broadcast     └────────────┬─────────┘
                │                                                        │
                │ (1.3) Write Vitals                                     │ (3.3) Request AI
                ▼                                                        ▼
          database.health_metrics                                  ┌────────────┴─────────┐
                                                                   │ 4.0 AI Report Engine │
          database.appointments                                    └─────┬──────────▲─────┘
                ▲                                                        │          │
                │ (2.3) Write Booking                                    │ (4.2)    │ (4.1) Get
                ▼                                                        │ Save     │ Vitals
   ┌───────────┴──────────┐                                             ▼          │ History
   │ 2.0 Appointment      │                                      database.reports  │
   │     Scheduler        │                                                        │
   └───────────▲──────────┘                                                        │
         │     │                                                                   │
         │     │                                                                   │
  (2.1)  │     │ (2.2) Status Updates                                              │
  Submit │     └───────────────────────────────────────────────────────────────────┘
  Booking│
         ▼
       [ Patient ]
```

##### Tracing Core Data Processes:
* **Process 1.0 (Vitals Manager)**: Captures patient vital sign entries, validates the input range, persists the data to the `health_metrics` database collection, and broadcasts real-time updates to the doctor's workspace.
* **Process 2.0 (Appointment Scheduler)**: Checks doctor availability to prevent schedule conflicts, records booking requests to the `appointments` collection, and updates status values upon doctor actions.
* **Process 3.0 (Doctor Workspace)**: Consolidates patient records, processes real-time vital sign broadcasts, and manages critical alert acknowledgements.
* **Process 4.0 (AI Report Engine)**: Fetches historical metrics from the database, sends the data to the Google Gemini API, and writes the generated summaries and clinical recommendations to the `reports` collection.

---

## 5. GITHUB LINK

The version history, active development branches, and frontend/backend code repositories for this project are hosted at:
* **Repository URL**: [https://github.com/shivamkumarp447/mediflow-core-platform](https://github.com/shivamkumarp447/mediflow-core-platform)

---

## A. Appendices

### A.1 Appendix 1: Database Collection Schemas
The application uses six primary database collections within MongoDB, using optimized indexes to ensure high performance.

#### 1. Users Collection Schema
Tracks credentials and profile details for all three system roles.
* **Primary Index**: `{ email: 1 }` (Unique)
* **Secondary Indexes**: `{ role: 1 }`, `{ is_verified: 1 }`

| Field Name | Data Type | Key Type | Validation / Rules |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Auto-generated unique identifier |
| `name` | String | Normal | Maximum 100 characters, required |
| `email` | String | Index (Unique) | Must be a valid email format, required |
| `password` | String | Normal | Hashed using the bcrypt algorithm |
| `phone` | String | Normal | Must follow the +91 phone format |
| `role` | String | Index | Must be one of: `admin`, `doctor`, `patient` |
| `is_verified` | Boolean | Index | Defaults to `false` |
| `verification_status` | String | Normal | Must be one of: `pending`, `verified`, `rejected` |
| `medical_license` | String | Normal | Required only if `role` is `doctor` |
| `specialization` | String | Normal | Required only if `role` is `doctor` |
| `created_at` | Date | Normal | Timestamp |

#### 2. Patients Collection Schema
Tracks medical profiles and contact details for patient users.
* **Primary Index**: `{ user_id: 1 }` (Unique)
* **Secondary Index**: `{ doctor_id: 1 }`

| Field Name | Data Type | Key Type | Validation / Rules |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Auto-generated unique identifier |
| `user_id` | ObjectId | Index (Unique) | Must match a valid ID in the `users` collection |
| `date_of_birth` | Date | Normal | Required |
| `gender` | String | Normal | Must be one of: `male`, `female`, `other` |
| `blood_type` | String | Normal | e.g., A+, O-, B+ |
| `height_cm` | Double | Normal | Must be greater than 0 |
| `weight_kg` | Double | Normal | Must be greater than 0 |
| `doctor_id` | ObjectId | Index | References a verified doctor in the `users` collection |
| `allergies` | Array (String) | Normal | List of patient allergies |
| `current_medications`| Array (String) | Normal | List of active prescriptions |
| `is_critical` | Boolean | Normal | Defaults to `false` |

#### 3. Health Metrics Collection Schema
Stores continuous physiological vital signs records.
* **Primary Index**: `{ patient_id: 1, created_at: -1 }` (Compound)

| Field Name | Data Type | Key Type | Validation / Rules |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Auto-generated unique identifier |
| `patient_id` | ObjectId | Index | References a valid patient record |
| `heart_rate` | Int32 | Normal | Range: 30 to 220 bpm |
| `spo2` | Int32 | Normal | Range: 50% to 100% |
| `temperature` | Double | Normal | Range: 90.0°F to 110.0°F |
| `bp_systolic` | Int32 | Normal | Range: 70 to 200 mmHg |
| `bp_diastolic` | Int32 | Normal | Range: 40 to 130 mmHg |
| `sugar_level` | Int32 | Normal | Range: 40 to 500 mg/dL |
| `notes` | String | Normal | Optional text description |
| `measured_by` | String | Normal | Must be one of: `manual`, `device` |
| `created_at` | Date | Index | Ingestion timestamp |

#### 4. Appointments Collection Schema
Manages patient booking requests and status states.
* **Primary Index**: `{ scheduled_at: 1 }`
* **Secondary Indexes**: `{ doctor_id: 1, status: 1 }`, `{ patient_id: 1 }`

| Field Name | Data Type | Key Type | Validation / Rules |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Auto-generated unique identifier |
| `patient_id` | ObjectId | Index | References a valid patient record |
| `doctor_id` | ObjectId | Index | References a verified doctor record |
| `title` | String | Normal | Maximum 100 characters, required |
| `description` | String | Normal | Optional details |
| `scheduled_at` | Date | Index | ISO 8601 schedule timestamp |
| `duration` | Int32 | Normal | Duration in minutes (defaults to 30) |
| `type` | String | Normal | Must be one of: `consultation`, `follow_up`, `emergency` |
| `status` | String | Index | Must be one of: `scheduled`, `confirmed`, `completed`, `cancelled` |

#### 5. Reports Collection Schema
Stores diagnostic summaries and clinical recommendations.
* **Primary Index**: `{ patient_id: 1, generated_at: -1 }` (Compound)

| Field Name | Data Type | Key Type | Validation / Rules |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Auto-generated unique identifier |
| `patient_id` | ObjectId | Index | References a valid patient record |
| `doctor_id` | ObjectId | Index | References the doctor who triggered the report |
| `title` | String | Normal | e.g., "Weekly Health Summary" |
| `content` | String | Normal | Detailed report body text |
| `summary` | String | Normal | Text generated by the Google Gemini API |
| `recommendations` | Array (String) | Normal | AI-generated clinical suggestions |
| `status` | String | Normal | Must be one of: `draft`, `completed`, `shared` |
| `generated_at` | Date | Index | Generation timestamp |

#### 6. Alerts Collection Schema
Tracks physiological threshold violations and abnormal metrics.
* **Primary Index**: `{ patient_id: 1, status: 1 }`
* **Secondary Index**: `{ severity: 1 }`

| Field Name | Data Type | Key Type | Validation / Rules |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Auto-generated unique identifier |
| `patient_id` | ObjectId | Index | References a valid patient record |
| `doctor_id` | ObjectId | Index | References the doctor monitoring the patient |
| `type` | String | Normal | Must be one of: `vital_abnormal`, `critical`, `warning` |
| `severity` | String | Index | Must be one of: `low`, `medium`, `high`, `critical` |
| `message` | String | Normal | Alert details, required |
| `status` | String | Index | Must be one of: `unread`, `acknowledged`, `resolved` |
| `created_at` | Date | Normal | Trigger timestamp |

---

### A.2 Appendix 2: REST API Endpoint Reference

All endpoints start with `/api/v1` and return JSON payloads.

| Category | HTTP Method | Endpoint URI | Auth Required | Access Level | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/auth/register` | None | Public | Creates a new user account |
| **Auth** | `POST` | `/auth/login` | None | Public | Authenticates credentials and returns a JWT |
| **Auth** | `POST` | `/auth/logout` | JWT | Active User | Invalidates the active access token |
| **Auth** | `GET` | `/auth/me` | JWT | Active User | Returns the current user's profile |
| **Auth** | `PUT` | `/auth/profile` | JWT | Active User | Updates profile details (phone, avatar, etc.) |
| **Metrics**| `GET` | `/health-metrics` | JWT | Doctor, Patient | Fetches physiological vitals history |
| **Metrics**| `POST` | `/health-metrics` | JWT | Patient | Logs a new health metric record |
| **Metrics**| `GET` | `/metrics/critical-check`| JWT | Doctor | Checks if patient vitals cross threshold limits |
| **Appts** | `GET` | `/appointments` | JWT | Active User | Lists appointments for the user |
| **Appts** | `POST` | `/appointments` | JWT | Patient | Books an appointment slot |
| **Appts** | `PUT` | `/appointments/{id}` | JWT | Doctor, Patient | Updates appointment details or status |
| **Reports**| `GET` | `/reports` | JWT | Doctor, Patient | Lists generated clinical reports |
| **Reports**| `POST` | `/reports/generate` | JWT | Doctor | Triggers Google Gemini report generation |
| **Alerts** | `GET` | `/alerts` | JWT | Doctor, Patient | Lists active physiological warnings |
| **Alerts** | `PATCH`| `/alerts/{id}` | JWT | Doctor | Acknowledges or dismisses an alert |
| **Admin** | `GET` | `/admin/users` | JWT | Administrator | Lists all accounts on the platform |
| **Admin** | `POST` | `/admin/doctors/create` | JWT | Administrator | Creates a pre-verified doctor profile |
| **Admin** | `POST` | `/admin/verify-doctor` | JWT | Administrator | Approves or rejects doctor certifications |
