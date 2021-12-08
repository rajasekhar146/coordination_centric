const config = {
    superadmin: [
        'ActivePatient',
        'ActiveOrganizations',
        'ActivePatientsperOrganization',
        'TotalAppointments',
        'UnassignedReadings',
        'UnassignedReadingsperOrg',
        'OrganizationOnboardings'
    ],
    admin: [
        'ActivePatient',
        'ActiveUsers',
        'TotalUsers',
        'Alerts',
        'Readings',
        'OrderstoExpireinXdays',
        'OrganizationOnboardings'
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