const getOptions = () => {
    return [
        {
            menu: 'sent',
            options: [
                // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
                { text: 'Resent Invitation', icon: require('../../src/assets/icons/resent_invitation.png').default },
            ],
        },
        {
            menu: 'pending_verification',
            options: [
                { text: 'View Details', fnKey: 'viewdetails', icon: require('../../src/assets/icons/view_details.png').default },
                { text: 'Send Message', icon: require('../../src/assets/icons/edit_icon.png').default },
                { text: 'Verify', fnKey: 'setIsAcceptClicked', icon: require('../../src/assets/icons/approve.png').default },
                // { text: 'Verify', icon: require('../../assets/icons/suspend.png').default },
                { text: 'Reject', fnKey: 'setIsRejectClicked', icon: require('../../src/assets/icons/reject.png').default },
            ],
        },
        {
            menu: 'cancelled',
            options: [
                { text: 'View Details', fnKey: 'viewdetails', icon: require('../../src/assets/icons/view_details.png').default },
                // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
                // { text: 'Resent Invitation', icon: require('../../assets/icons/resent_invitation.png').default },
                // { text: 'Suspend', icon: require('../../assets/icons/suspend.png').default },
            ],
        },
        {
            menu: 'declined',
            options: [
                { text: 'View Details', fnKey: 'viewdetails', icon: require('../../src/assets/icons/view_details.png').default },
                // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
                // { text: 'Resent Invitation', icon: require('../../assets/icons/resent_invitation.png').default },
                // { text: 'Suspend', icon: require('../../assets/icons/suspend.png').default },
            ],
        },
        {
            menu: 'active',
            options: [
                { text: 'View Details', fnKey: 'viewdetails', icon: require('../../src/assets/icons/view_details.png').default },
                // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
                { text: 'Deactivate', fnKey: 'setIsDeactivateClicked', icon: require('../../src/assets/icons/suspend.png').default },
            ],
        },
        {
            menu: 'inactive',
            options: [
                { text: 'View Details', fnKey: 'viewdetails', icon: require('../../src/assets/icons/view_details.png').default },
                // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
                { text: 'Activate', fnKey: 'setIsActivateClicked', icon: require('../../src/assets/icons/activate.png').default },
            ],
        },
        {
            menu: 'invited',
            options: [
                { text: 'View Details', fnKey: 'viewdetails', icon: require('../../src/assets/icons/view_details.png').default },
                {
                    text: 'Resend Invitation',
                    fnKey: 'setIsResendClicked',
                    icon: require('../../src/assets/icons/resent_invitation.png').default,
                },
                {
                    text: 'Cancel Invite',
                    fnKey: 'setIsCancelInviteClicked',
                    icon: require('../../src/assets/icons/suspend.png').default,
                },
            ],
        },

        {
            menu: 'suspended',
            options: [
                { text: 'View Details', fnKey: 'viewdetails', icon: require('../../src/assets/icons/view_details.png').default },
                // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
                { text: 'Activate', icon: require('../../src/assets/icons/activate.png').default },
            ],
        },
        {
            menu: 'verified',
            options: [
                { text: 'View Details', fnKey: 'viewdetails', icon: require('../../src/assets/icons/view_details.png').default },
                { text: 'Deactivate', icon: require('../../src/assets/icons/edit_icon.png').default },
            ],
        },
        {
            menu: 'unverified',
            options: [
                { text: 'View Details', fnKey: 'viewdetails', icon: require('../../src/assets/icons/view_details.png').default },
                { text: 'Send Message', icon: require('../../src/assets/icons/edit_icon.png').default },
                { text: 'Verify', fnKey: 'setIsAcceptClicked', icon: require('../../src/assets/icons/approve.png').default },
                { text: 'Reject', fnKey: 'setIsRejectClicked', icon: require('../../src/assets/icons/reject.png').default },
            ],
        },
        {
            menu: 'pending_acceptance',
            options: [
                { text: 'View Details', fnKey: 'viewdetails', icon: require('../../src/assets/icons/view_details.png').default },
                { text: 'Send Message', icon: require('../../src/assets/icons/edit_icon.png').default },
                { text: 'Verify', icon: require('../../src/assets/icons/suspend.png').default },
                { text: 'Reject', fnKey: 'setIsRejectClicked', icon: require('../../src/assets/icons/reject.png').default },
            ],
        },
        {
            menu: 'cancelled',
            options: [
                { text: 'View Details', fnKey: 'viewdetails', icon: require('../../src/assets/icons/view_details.png').default },
                {
                    text: 'Resend Invitation',
                    fnKey: 'setIsResendClicked',
                    icon: require('../../src/assets/icons/resent_invitation.png').default,
                },
                { text: 'Cancel Invite', icon: require('../../src/assets/icons/suspend.png').default },
            ],
        },
        {
            menu: 'open',
            options: [
                { text: 'View', fnKey: 'viewdetails', icon: require('../../src/assets/icons/view_details.png').default },
                {
                    text: 'Invite Patient',
                    fnKey: 'setInvitePatientClicked',
                    icon: require('../../src/assets/icons/resent_invitation.png').default,
                },
                {
                    text: 'Share',
                    fnKey: 'setOpenSharePatientRecord',
                    icon: require('../../src/assets/icons/share_icon.png').default
                },
                { text: 'Archive', icon: require('../../src/assets/icons/suspend.png').default },

            ],
        },
    ]
}

export default getOptions