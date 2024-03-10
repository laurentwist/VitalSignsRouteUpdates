import json
import random
import string

def generate_username(name):
    # extract first and last name initials
    first_name, last_name = name.split()
    username = first_name.lower() + last_name.lower()
    
    return username

def generate_password(length=12):
    letters = string.ascii_letters
    numbers = string.digits
    special_chars = string.punctuation

    # choose one number
    password = random.choice(numbers)

    # choose one special character
    special_char = random.choice(special_chars)
    while special_char.isalnum():  # ensure special character is not alphanumeric
        special_char = random.choice(special_chars)
    password += special_char

    # fill the rest of the password with random letters
    available_chars = letters
    password += ''.join(random.choices(available_chars, k=length - 2))

    # shuffle the password to make the order random
    password_list = list(password)
    random.shuffle(password_list)
    password = ''.join(password_list)

    return password

if __name__ == "__main__":
    with open("patient_data.json") as f:
        staff_data = json.load(f)

    staff_credentials = []

    for staff in staff_data["staff"]:
        staffID = staff["staffID"]
        name = staff["name"]
        username = generate_username(name)
        password = generate_password()
        staff_credentials.append({
            "staffID": staffID,
            "name": name,
            "username": username,
            "password": password
        })

    with open("login_credentials.json", "w") as outfile:
        json.dump(staff_credentials, outfile, indent=4)

    print("Staff credentials saved to login_credentials.json.")