import json
from faker import Faker
import random
from datetime import datetime, timedelta

fake = Faker()

# medical staff specialties 
medicalStaffSpecialties = ['EMT', 'nurse', 'doctor', 'radiologist']

def generatePatientIDs(numPatients):
    return [fake.uuid4() for _ in range(numPatients)]

def generateStaffIDs(numStaff):
    return [fake.uuid4() for _ in range(numStaff)]
    
def generateData(numPatients, numStaff, filename):
    patientIDs = generatePatientIDs(numPatients)
    staffIDs = generateStaffIDs(numStaff)

    # dictionary to store patient IDs
    dictPatientID = {staffID: [] for staffID in staffIDs}

    data = {
        "patients": [],
        "staff": [],
        "vital_signs": []
    }

    # patient data
    for patientID in patientIDs:
        patient = {
            "patientID": patientID,
            "name": fake.name(),
            "DOB": fake.date_of_birth(minimum_age=0, maximum_age=100).strftime("%Y-%m-%d"),
            "transportTime": fake.date_time_this_decade().strftime("%Y-%m-%d %H:%M:%S"),
            "doctorID": random.choice(staffIDs)
        }
        data["patients"].append(patient)
        dictPatientID[patient["doctorID"]].append(patientID)

        # vital sign data
        for i in range(20):
            vital_sign = {
                "dataID": fake.uuid4(),
                "transmitTime": (datetime.strptime(patient["transportTime"], "%Y-%m-%d %H:%M:%S") + timedelta(seconds=30 * i)).strftime("%Y-%m-%d %H:%M:%S"),
                "systolicBP": random.randint(40, 200),
                "diastolicBP": random.randint(20, 90),
                "heartRate": random.randint(40, 200),
                "temperature": round((((random.uniform(35.0, 40.0)) * 9/5) + 32), 1),
                "respirationRate": random.randint(8, 40),
                "bloodOxygen": random.randint(60, 110),
                "patientID": patientID
            }
            data["vital_signs"].append(vital_sign)

    # medical staff data
    for staffID in staffIDs:
        staff = {
            "staffID": staffID,
            "name": fake.name(),
            "specialty": random.choice(medicalStaffSpecialties),
            "patientIDs": dictPatientID[staffID]
        }
        data["staff"].append(staff)

    # save data to JSON file
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

    print(f"patient, medical staff, and vital sign data was saved to {filename}")

# specify the output file name, number of patients, and number of staff
outputFile = 'patient_data.json'
numPatients = 5
numStaff = 2

# generate and save mock data
generateData(numPatients, numStaff, outputFile)