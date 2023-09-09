import React from 'react';

// Inside Dashboard.tsx

const Dashboard: React.FC<{ userData: any }> = (props) => {
    return (
        <div>
            Welcome to your dashboard, {props.userData.first_name}!
            {/* Display more user-specific data or other dashboard elements here */}
        </div>
    );
};


export default Dashboard;
