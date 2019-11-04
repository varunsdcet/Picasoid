import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
const window = Dimensions.get('window');
import CalendarStrip from "react-native-calendar-strip";
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
const GLOBAL = require('./Global');
import moment from 'moment';

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class NurseTime extends Component {
    constructor () {
        super()
        this.state = {
        name: '',
        email: '',
        phone: '',
        company: '',
        loading: false,
        visible: false,
            time:[],

        selected: false,
        data: [],
        images: [
            {
                days :'1',
                selected:'',
            },
            {
                days :'2',
                selected:'',
            },
            {
                days :'3',
                selected:'',
            },
            {
                days :'4',
                selected:'',
            },
            {
                days :'5',
                selected:'',
            },
            {
                days :'6',
                selected:'',
            },
            {
                days :'7',
                selected:'',
            },
        ]
    }
    };
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    myCallbackFunctions = (res) => {
        this.hideLoading()
        GLOBAL.mobile =  this.state.phone
        if (res.status == 200){
            GLOBAL.which = "2"

            GLOBAL.userID = res.user_id.toString();
            GLOBAL.name = res.name;
            GLOBAL.mobile =  res.mobile;
            AsyncStorage.setItem('mobile', res.mobile);
            AsyncStorage.setItem('userID', res.user_id);
            AsyncStorage.setItem('username', res.name);


            this.props.navigation.navigate('Otp')
        }
        else if (res.status == 201){
            this.setState({visible:true})
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
    static navigationOptions = ({ navigation }) => {
        return {
               header: () => null,
            title: 'NURSE SERVICE',
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
    _handlePressLogin() {
        this.showLoading()
        var self=this;
        var url = GLOBAL.BASE_URL + 'getrole';
        axios.get(url)
            .then(function (response) {
                self.myCallbackFunction(response.data)
            })
            .catch(function (error) {
                console.log(error);

            });

    }


    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }
    getSelection = (index) => {



        for(let i = 0; i < 2; i++){

            this.state.moviesList[i].selected = "";

        }

        this.setState({moviesList:this.state.moviesList})

        let indexs = this.state.moviesList;
        let targetPost = this.state.moviesList[index];
        if (targetPost.selected == ''){
            targetPost.selected = 'Y'
        }else{
            targetPost.selected = ''
        }
        indexs[index] = targetPost
        this.setState({moviesList:indexs})


    }


    showLoading() {
        this.setState({loading: true})
    }

    calculateDay(date){


        const url = GLOBAL.BASE_URL +  'common_time_slots_comm'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "for_time":'normal',
                "select_date":date,
                "id":GLOBAL.bookingArray.id,





            }),
        }).then((response) => response.json())
            .then((responseJson) => {

alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {
                    this.setState({time:responseJson.slot})


                    // this.props.navigation.navigate("VideoCall", {
                    //     channelName: 'Picasoid',
                    //     onCancel: (message) => {
                    //         this.setState({
                    //             visible: true,
                    //             message
                    //         });
                    //

                    //
                    //     }
                    // });
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }


    componentDidMount(){


        let startDate = moment();
        for (let i=0; i<700; i++) {
            customDatesStyles.push({
                startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
                dateNameStyle: styles.dateNameStyle,
                dateNumberStyle: styles.dateNumberStyle,

                // Random color...
                dateContainerStyle: {shadowOpacity: 1.0,
                    shadowRadius: 1,
                    shadowColor: 'black',
                    shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,borderRadius: 0 ,backgroundColor: 'white' },
            });
        }
        var date = new Date()
        var s = moment(date).format('YYYY-MM-DD')

          this.calculateDay(s)
    }
    _handlePress() {
        console.log('Pressed!');

        if (this.state.mobile == ""){
            alert(stringsoflanguages.mobile + stringsoflanguages.please)
        }else if (this.state.company == ""){
            alert(stringsoflanguages.password + stringsoflanguages.please)
        }else{
            this.showLoading()
            var self=this;

            var url = GLOBAL.BASE_URL + 'login';


            alert(url)

            axios.post(url, {
                mobile: this.state.phone,
                password: this.state.company,
                divice_token:"11111"
            })
                .then(function (response) {

                    self.myCallbackFunctions(response.data)


                    //    self.myCallbackFunction.bind()

                    //   this.myCallbackFunction()


                })
                .catch(function (error) {
                    console.log(error);
                    //  self.myCallbackFunction()

                });

        }

        // this.props.navigation.navigate('Otp')
    }

    login = () => {
        this.props.navigation.navigate('Otp')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = (indexs) => {
        var a = this.state.images
        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }
        var index = a[indexs]
        if (index.selected == ""){
            index.selected = "Y"
        }else{
            index.selected = ""
        }
        this.state.images[indexs] = index
        this.setState({images:this.state.images})
    }
    selectedFirsts = () => {
        var a = this.state.images

        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }

        var index = a[1]
        if (index.selected == ""){
            index.selected = "Y"
        }else{
            index.selected = ""
        }
        this.state.images[1] = index
        this.setState({images:this.state.images})

    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }

    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')

        this.calculateDay(s)
    }

    _renderItems = ({item,index}) => {

        return (


            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>


                <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                    shadowRadius: 1,
                    shadowColor: 'black',
                    shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:50,borderRadius: 0 ,backgroundColor: 'white'
                }}>



                    <Text style={{color:'#707070',fontSize:16}}>
                        {item}
                    </Text>


                </View>




            </TouchableOpacity>




        )
    }
    render() {
var item = GLOBAL.bookingArray

        var s = item.speciality_detail_array
        var speciality =  s.join(',')

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



            <View style = {{backgroundColor:'#f2f5f7'}}>
                <SafeAreaView style={{ flex:0, backgroundColor: '#6d0000' }} />



                <View style = {{backgroundColor:'#800000',height:54,width:'100%',flexDirection: 'row'}}>

                        <Image style = {{margin :15,height:25,width:30}}
                               source={require('./back.png')}/>

                        <Image style = {{marginTop:14,height:27,width:27,marginLeft:-7}}
                               source={require('./homelogo.png')}/>



                        <Text style= {{fontSize:17,fontFamily:'Konnect-Medium',color:'white',marginTop:17,marginLeft:8}} >
                           BOOKING
                        </Text>
                    </View>



<KeyboardAwareScrollView>
                <View style={{ marginLeft : 10,width:window.width - 20, backgroundColor: 'white',marginTop: 10,marginBottom:20,borderRadius:10}}>




                    <View style = {{flexDirection:'row',width :'100%'}}>
                        <View>
                            <Image style = {{width :40 ,height :40,borderRadius: 20,margin:10}}
                                   source={{ uri: item.image }}/>
                            <View style = {{marginLeft:10,backgroundColor:'#800000',borderRadius:4,width:40,height:20,marginTop:-2,flexDirection:'row',justifyItems:'center',alignItems:'center'}}>
                                <Image style = {{width :10 ,height :10,marginLeft:4,resizeMode:'contain'}}
                                       source={require('./star.png')}/>

                                <Text style={{marginLeft : 2,fontSize : 10,marginTop:1,color :'white',fontFamily:'Konnect-Regular',}}>
                                    {item.ratting}
                                </Text>

                            </View>

                            {item.avail == 1 && (
                                <Text style={{textAlign:'center',marginLeft : 2,fontSize : 10,color :'#3DBA56',fontFamily:'Konnect-Regular',width:60}}>

                                    Available
                                </Text>
                            )}
                            {item.avail != 1 && (
                                <Text style={{textAlign:'center',marginLeft : 2,fontSize : 10,color :'#3DBA56',fontFamily:'Konnect-Regular',width:60}}>

                                    Offline
                                </Text>
                            )}

                        </View>

                        <View>

                            <View style = {{flexDirection:'row',width:'100%'}}>
                                <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:'Konnect-Regular',width :'80%',marginTop:10}}>

                                    {item.name}
                                </Text>

                                <Image style = {{width :25 ,height :25,marginLeft:-20,resizeMode:'contain',marginTop:18}}
                                       source={require('./share.png')}/>

                            </View>

                            <View style = {{flexDirection:'row'}}>
                                <Text style={{marginLeft : 5,fontSize : 12,color :'#8F8F8F',fontFamily:'Konnect-Regular',width :'90%'}}>

                                    {speciality}
                                </Text>



                            </View>



                            <View style = {{flexDirection:'row',marginTop:10}}>
                                <Image style = {{width :20 ,height :20,resizeMode:'contain'}}
                                       source={require('./location.png')}/>

                                <Text style={{marginLeft : 5,fontSize : 12,color :'#8F8F8F',fontFamily:'Konnect-Regular',width:window.width - 120}}>

                                    Branch: {item.lat_long_address}
                                </Text>

                            </View>

                            <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:10,marginBottom:15,width:250}}>

                                <View>
                                    <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Konnect-Regular',}}>

                                        Experience
                                    </Text>
                                    <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Konnect-Regular',textAlign:'center'}}>

                                        {item.experience} Years
                                    </Text>
                                </View>

                                <View >
                                    <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Konnect-Regular',}}>

                                        Likes
                                    </Text>
                                    <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Konnect-Regular',textAlign:'center'}}>

                                        {item.like}
                                    </Text>
                                </View>

                                <View >
                                    <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Konnect-Regular',}}>

                                        Reviews
                                    </Text>
                                    <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Konnect-Regular',textAlign:'center'}}>

                                        {item.total_review}
                                    </Text>
                                </View>

                            </View>
                        </View>

                    </View>



                </View>


                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 18,color :'#707070', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 80}}>

                        Select Date
                    </Text>

                    <CalendarStrip

                        calendarAnimation={{type: 'sequence', duration: 30}}
                        daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#80D8CF'}}
                        style={{height:120, paddingTop: 15}}
                        calendarHeaderStyle={{color: 'black'}}
                        calendarColor={'white'}
                        highlightDateNameStyle={{color:'white'}}
                        highlightDateNumberStyle  ={{color:'white'}}


                        customDatesStyles={customDatesStyles}
                        dateContainerStyle = {{shadowOpacity: 1.0,
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,borderRadius: 0 ,backgroundColor: 'white' }}

                        iconContainer={{flex: 0.1}}
                        onDateSelected={(date)=> this.dates(date)}
                    />

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 18,color :'#707070', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 80}}>

                        Select Time Slot
                    </Text>


                    <FlatList style= {{flexGrow:0,margin:8}}
                              data={this.state.time}
                              numColumns={1}
                              horizontal={true}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />

                    <Button
                        style={{padding:7,marginTop:'20%',fontSize: 20, color: 'white',backgroundColor:'#800000',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login()}>
                        PROCEED
                    </Button>

    <View style = {{height:100}}>

    </View>
</KeyboardAwareScrollView>







</View>




        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',
        height: window.height,
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
})