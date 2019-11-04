import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    Modal,

    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,

    AsyncStorage, ScrollView
} from 'react-native';
import Button from 'react-native-button';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const window = Dimensions.get('window');

const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
            results: [],
            practice:[],
            avg_rat:0,
            rate_type:'',

        };

    }
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    componentWillUnmount() {

    }

    setModalVisible=(visible,get)=> {
        this.setState({text:get})
        this.setState({modalVisible: visible});
    }



    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            title: 'BOOKING APPOINTMENT',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'black'},
            headerStyle:{
                backgroundColor:'white',
            },
            headerTintColor :'#800000',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }



    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }
    _renderItems = ({item,index}) => {


        return (
            <View>
                <Text style={{fontSize:15, color:'#grey'}}>{item.hospital_name}</Text>
                <Text style={{fontSize:15, color:'#grey'}}>{item.hospital_address}</Text>
            </View>


        )
    }



    showLoading() {
        this.setState({loading: true})
    }


    componentDidMount(){
        const url = 'http://139.59.76.223/picasoid/api/' +  'doctor_review'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({

                "id":GLOBAL.appointmentArray.id,





            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true) {
this.setState({avg_rat:parseInt(responseJson.avg_rat)})
                    this.setState({rate_type:responseJson.rate_type})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
        //   this._handlePressLogin()
    }


    login = () => {
        this.props.navigation.navigate('BookingAppointmentDetail')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }


    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }


    render() {


        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (
           <View style = {{flex:1}}>


               <View style = {{flexDirection:'row',width:window.width - 20,alignSelf:'center',marginTop:10}}>

                   <View style = {{marginLeft:-5,backgroundColor:'white',justifyContent:'center',alignItems:'center',width:window.width/2, borderWidth: 1,
                       borderRadius: 2,
                       borderColor: 'grey',
                       borderBottomWidth: 0,
                       shadowColor: '#000',
                       shadowOffset: { width: 0, height: 1 },
                       shadowOpacity: 0.8,
                       shadowRadius: 2}}>
                   <AnimatedCircularProgress
                       size={100}
                       width={2}
                       fill={this.state.avg_rat}
                       tintColor="#800000"
                       backgroundColor="grey">
                       {
                           (fill) => (
                               <Text style = {{fontSize:30,color:'#800000'}}>
                                   { this.state.avg_rat } %
                               </Text>
                           )
                       }
                   </AnimatedCircularProgress>

                   </View>

                   <View style = {{backgroundColor:'#800000',width:window.width - 200,marginLeft:10}}>

                       <Text style = {{marginLeft:20,fontSize: 20,color: 'white',marginTop:8,fontFamily:'Konnect-Regular'}}>
                           { this.state.avg_rat } / 100

                       </Text>

                       <Text style = {{marginLeft:20,fontSize: 12,color: 'white',fontFamily:'Konnect-Regular',marginTop:4}}>
                          Rating Type : {this.state.rate_type}

                       </Text>
                       <Text style = {{marginLeft:20,fontSize: 12,color: 'white',fontFamily:'Konnect-Regular',marginTop:4}}>
                           Total 2 People Reviewed

                       </Text>




                   </View>
               </View>
           </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',

    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    account :{
        marginTop : 20,
        textAlign : 'center',
        fontSize: 17,
        justifyContent:'center',
        color : '#262628',
        fontFamily:'Poppins-Regular',


    } ,
    createaccount :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#800000',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#800000',
        textDecorationLine: 'underline',



    } ,
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})
