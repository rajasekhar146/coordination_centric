const config = {
    superadmin: [
        'ActivePatient',
        'ActiveOrganizations',
        'ActivePatientsperOrganization',
        'TotalAppointments',
        'UnassignedReadings',
        'UnassignedReadingsperOrg'
    ],
    admin: [
        'ActivePatient',
        'ActiveUsers',
        'TotalUsers',
        'Alerts',
        'Readings',
        'OrderstoExpireinXdays'
    ],
    doctor: [
        'ActivePatient',
        'Adherence',
        'Appointments',
        'LastLoggedIn',
    ],
    patient: [
        'Appointments',
        'Adherence',
        'Readings',
        'ReadingsFromLastweek',
    ],
};

export default config;