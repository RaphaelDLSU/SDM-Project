import React from "react";
import EnrollIcon from '@mui/icons-material/AssignmentOutlined';
import ScheduleIcon from '@mui/icons-material/CalendarMonthOutlined';
import InboxIcon from '@mui/icons-material/EmailOutlined';
import NotificationIcon from '@mui/icons-material/NotificationsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

export const SidebarData = [

    
    {
        title: "Enroll",
        icon:<EnrollIcon style={{fontSize:60}}/>,
        link: '/enrollform',
        type:"Student"
    },
    {
        title: "Schedule",
        icon:<ScheduleIcon style={{fontSize:60}}/>,
        link: '/schedpage',
        type:"Student"
    },
    {
        title: "Payment",
        icon:<AccountBalanceWalletOutlinedIcon style={{fontSize:60}}/>,
        link: '/payment',
        type:"Student"
    },
    {
        title:  `Pending`,
        icon:<EnrollIcon style={{fontSize:60}}/>,
        link: '/enrollpending',
        type:"Admin"
    },
    {
        title: "Students",
        icon:<LocalLibraryOutlinedIcon style={{fontSize:60}}/>,
        link: '/studentRecord',
        type:"Admin"
    },
    {
        title: "Faculty",
        icon:<SchoolOutlinedIcon style={{fontSize:60}}/>,
        link: '/facultymanage',
        type:"Admin"
    },
    {
        title: "Payroll",
        icon:<CreditCardOutlinedIcon style={{fontSize:60}}/>,
        link: '/payroll',
        type:"Admin"
    },
    
    {
        title: "Students",
        icon:<LocalLibraryOutlinedIcon style={{fontSize:60}}/>,
        link: '/mystudents',
        type:"Teacher"
    },
    {
        title: "Schedule",
        icon:<CalendarMonthOutlinedIcon style={{fontSize:60}}/>,
        link: '/teacherschedule',
        type:"Teacher"
    },
    {
        title: "Reports",
        icon:<FileOpenOutlinedIcon style={{fontSize:60}}/>,
        link: '/generatereport',
        type:"Admin"
    },
    {
        title: "Trials",
        icon:<EnrollIcon style={{fontSize:60}}/>,
        link: '/freetrialpending',
        type:"Admin"
    },
    {
        title: "Calendar",
        icon:<CalendarMonthOutlinedIcon style={{fontSize:60}}/>,
        link: '/calendar',
        type:"Admin"
    },
    
   
 
]

