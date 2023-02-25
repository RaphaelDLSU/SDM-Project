import React from "react";
import EnrollIcon from '@mui/icons-material/AssignmentOutlined';
import ScheduleIcon from '@mui/icons-material/CalendarMonthOutlined';
import InboxIcon from '@mui/icons-material/EmailOutlined';
import NotificationIcon from '@mui/icons-material/NotificationsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';


export const SidebarData = [
    {
        title: "Enroll",
        icon:<EnrollIcon style={{fontSize:60}}/>,
        link: '/enrollform  '
    },
    {
        title: "Schedule",
        icon:<ScheduleIcon style={{fontSize:60}}/>,
        link: '/sched'
    },
    {
        title: "Inbox",
        icon:<InboxIcon style={{fontSize:60}}/>,
        link: '/notif'
    },
    {
        title: "Notifications",
        icon:<NotificationIcon style={{fontSize:60}}/>,
        link: '/notif'
    },
    {
        title: "Logout",
        icon:<LogoutIcon style={{fontSize:60}}/>,
        link: '/login'
    },
 
]

