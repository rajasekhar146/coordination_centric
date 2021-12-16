const config = {
    superadmin: [
        'TotalAppointments',
        'ActivePatient',
        'ActiveOrganizations',
        'AcitveDoctors',
        'UnassignedReadings',
        // 'OtherUsers',
        'OrganizationOnboardings'
    ],
    admin: [
        'TotalAppointments',
        'ActivePatient',
        'AcitveDoctors',
        'OtherUsers',
        'ActiveOrganizations',

        // 'Readings',
        // 'OrderstoExpireinXdays',
        'OrganizationOnboardings'
    ],
    doctor: [
        'ActivePatient',
        'Appointments',
        'LastLoggedIn',
        'AppointmentList'
    ],
    PA: [
        'ActivePatient',
        'Appointments',
        'LastLoggedIn',
        'AppointmentList'
    ],
    HR: [
        'ActivePatient',
        'Appointments',
        'LastLoggedIn',
        'AppointmentList'
    ],
    receptionist: [
        'ActivePatient',
        'Appointments',
        'LastLoggedIn',
        'AppointmentList'
    ],
    pharmacist: [
        'ActivePatient',
        'Appointments',
        'LastLoggedIn',
        'AppointmentList'
    ],
    Dieticians: [
        'ActivePatient',
        'Appointments',
        'LastLoggedIn',
        'AppointmentList'
    ],
    'Occupational therapists': [
        'ActivePatient',
        'Appointments',
        'LastLoggedIn',
        'AppointmentList'
    ],
    surgeon: [
        'ActivePatient',
        'Appointments',
        'LastLoggedIn',
        'AppointmentList'
    ],
    clerk: [
        'ActivePatient',
        'Appointments',
        'LastLoggedIn',
        'AppointmentList'
    ],
    patient: [
        'Appointments',
        'AcitveDoctors',
        'LastLoggedIn',
        'AppointmentList'
    ],
};

export default config;