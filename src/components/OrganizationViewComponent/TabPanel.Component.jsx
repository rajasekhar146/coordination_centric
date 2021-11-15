import React from 'react'

const TabPanelComponent = props => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value != index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value == index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}
export default TabPanelComponent