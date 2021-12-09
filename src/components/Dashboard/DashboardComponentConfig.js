const config = {
    superadmin: [
        'TotalAppointments',
        'ActivePatient',
        'ActiveOrganizations',
        'AcitveDoctors',
        'UnassignedReadings',
        'OtherUsers',
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
    patient: [
        'Appointments',
        'AcitveDoctors',
        'LastLoggedIn',
        'AppointmentList'
    ],
};

export default config;