import { createStackNavigator ,createAppContainer ,createDrawerNavigator,createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import Splash from './Splash.js';
import Slider from './Slider.js';
import Login from './Login.js';
import Otp from './Otp.js';
import Register from './Register.js';
import Forgot from './Forgot.js';
import BasicDetail from './BasicDetail.js';
import Nurse from './Nurse.js';
import MyDocument from './MyDocument.js';
import NurseBooking from './NurseBooking.js';
import NurseTime from './NurseTime.js';
import LabHistory from './LabHistory.js';
import MedicalService from './MedicalService.js';
import  MedicalServiceBooking from './MedicalServiceBooking.js';
import  SurgicalPackage from './SurgicalPackage.js';
import  OpdHealth from './OpdHealth.js';
import LabHistoryDetail from './LabHistoryDetail.js';
import Proceed from './Proceed.js';
import Chat from './Chat.js';
import Ccavenue from  './Ccavenue.js';
import DoctorVisit   from './DoctorVisit.js';
import DoctorVisitDetail from './DoctorVisitDetail.js';
import Emergency from './Emergency.js';
import BookingAppointment from './BookingAppointment.js';
import Insurance from './Insurance.js';
import BookingAppointmentDetail from './BookingAppointmentDetail.js';
import BookingDetailFinal from './BookingDetailFinal.js';
import Confirmation from './Confirmation.js';
import DoctorDetail from './DoctorDetail.js';
import HospitalList from './HospitalList.js';
import HospitalDetail from './HospitalDetail.js';
import AmbulanceBooking from './AmbulanceBooking.js';
import Upload from './Upload.js';
import Location from './Location.js';
import Landing from './Landing.js';
import Home from './Home.js';
import Search from './Search.js';
import ArticleDescription from './ArticleDescription.js';
import Labtest from './Labtest.js';
import Pharmacy from './Pharmacy.js';
import VideoCall from './VideoCall.js';
import Thankyou from './Thankyou.js';
import Appointment from './Appointment.js';
import AppointmentDetail from './AppointmentDetail.js';
import AppointmentResc from './AppointmentResc.js';
import Payment from './Payment.js';
import OnlineBooking from './OnlineBooking.js';
import Filter from './Filter.js';
import SpecialityFilter from './SpecialityFilter.js';
import HospitalFilter from './HospitalFilter.js';
import Department from './Department.js';
import OnlineVideo from './OnlineVideo.js';
import OfflineBooking from './OfflineBooking.js';
import Speciality from './Speciality.js';
import SearchSpeciality from './SearchSpeciality.js';
import EditProfile from './EditProfile.js';
import Drawer  from  './Drawer.js';

import React, {Component} from 'react';

const DrawerNavigator = createDrawerNavigator({
    Home:{
        screen: Home ,

        navigationOptions: ({ navigation }) => ({

            header: () => null,

        }),
    }

},{
    initialRouteName: 'Home',
    contentComponent: Drawer,
    drawerWidth: 250
});

const StackNavigator = createStackNavigator({

        Splash: { screen: Splash },
            Slider: { screen: Slider },
    Filter:{screen:Filter},
        Proceed:{screen:Proceed},
    DrawerNavigator:{screen: DrawerNavigator,
        navigationOptions: ({ navigation }) => ({
            header:null,
        }),
    },
        OnlineBooking:{screen:OnlineBooking},
        SpecialityFilter:{screen:SpecialityFilter},
        HospitalFilter:{screen:HospitalFilter},
        Department:{screen:Department},
        OnlineVideo:{screen:OnlineVideo},
        SearchSpeciality:{screen:SearchSpeciality},
        EditProfile:{screen:EditProfile},
        Ccavenue: { screen: Ccavenue },
        LabHistoryDetail:{screen:LabHistoryDetail},
        VideoCall: { screen: VideoCall },
        Home: { screen: Home },
        LabHistory:{screen:LabHistory},
        Landing: { screen: Landing },
        Search: { screen: Search },
        Payment: { screen: Payment },
        OfflineBooking: { screen: OfflineBooking },


        Login: { screen: Login },
        Otp: { screen: Otp },
        Register: { screen: Register },
        Forgot: { screen: Forgot },
            BasicDetail: { screen: BasicDetail },
        NurseTime:{screen:NurseTime},
        Insurance:{screen:Insurance},

        Appointment:{screen:Appointment},
        AppointmentDetail:{screen:AppointmentDetail},
        AppointmentResc:{screen:AppointmentResc},

        NurseBooking:{screen:NurseBooking},
        MedicalServiceBooking:{screen:MedicalServiceBooking},
            DoctorVisitDetail:{screen:DoctorVisitDetail},
            Emergency:{screen:Emergency},
        BookingAppointmentDetail:{screen:BookingAppointmentDetail},
        BookingDetailFinal:{screen:BookingDetailFinal},
        Confirmation:{screen:Confirmation},
        DoctorDetail:{screen:DoctorDetail},
        Labtest:{screen:Labtest},
        HospitalDetail:{screen:HospitalDetail},
        Location:{screen:Location},
        AmbulanceBooking:{screen:AmbulanceBooking},
        HospitalList:{screen:HospitalList},
        BookingAppointment:{screen:BookingAppointment},
        DoctorVisit:{screen:DoctorVisit},
        OpdHealth:{screen:OpdHealth},
        SurgicalPackage:{screen:SurgicalPackage},
        MedicalService:{screen:MedicalService},
        Nurse: { screen: Nurse },

        MyDocument: { screen: MyDocument },
            Speciality: { screen: Speciality },
        Thankyou: { screen: Thankyou },
        Pharmacy:{screen:Pharmacy},
        Upload:{screen:Upload},
        Chat:{screen:Chat},
        ArticleDescription:{screen:ArticleDescription},
    },

   // {headerMode :'none'},
);

export default createAppContainer(StackNavigator);
//LabourLaw