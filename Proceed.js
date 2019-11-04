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
    AsyncStorage,
    Platform, ImageBackground
} from 'react-native';
import store from 'react-native-simple-store';
import { DialogComponent, DialogTitle } from 'react-native-dialog-component';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 200;
const images = [
    "https://www.bhatiahospital.org/storage/app/public/home_banner/2/image/1503411077revised-bhatia-homebanner-03.jpg",
    "https://www.bhatiahospital.org/storage/app/public/home_banner/2/image/1503411077revised-bhatia-homebanner-03.jpg",
    "https://www.bhatiahospital.org/storage/app/public/home_banner/2/image/1503411077revised-bhatia-homebanner-03.jpg"
];
import Carousel from 'react-native-banner-carousel';
import { Header } from 'react-navigation';
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Proceed extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        searchText:'',
        card:false,
        paytm:false,
        banner:[],
        speciality:[],
        article:[],
        moviesList :[
            {
                back :require('./patients.png'),
                title :'Patient Consulation',
                image:require('./patient.png')
            },


            {
                back :require('./labs.png'),
                title :'Lab Test Booking',
                image:require('./lab.png')
            },

            {
                back :require('./ambulances.png'),
                title :'Ambulance Booking',
                image:require('./ambulance.png')
            },

            {
                back :require('./healthcares.png'),
                title :'HealthCare',
                image:require('./healthcare.png')
            },

            {
                back :require('./reports.png'),
                title :'Health Report',
                image:require('./report.png')
            },


        ],

        selected:false,
        data:[],
        results:[],

    };
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    renderPage(image, index) {
        alert(image)
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight ,resizeMode:'stretch'}} source={{ uri: image }} />
            </View>
        );
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
    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.getSelection(index)
            }>
                <View style={{flexDirection :'row', flex: 1 ,marginLeft: '5%',marginTop:12,width : '90%', backgroundColor: 'white',height:38,borderBottomColor:'#77869E',borderBottomWidth:1
                    ,justifyContent:'space-between'}}>

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 20,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium'}}>

                        {item.title}
                    </Text>

                </View>
            </TouchableOpacity>
        )
    }

    showLoading() {
        this.setState({loading: true})
    }


    getRespone = (res) => {
        this.setState({speciality:res.specialty})


    }

    componentDidMount(){
        var self=this;
        store.get('specialty')
            .then((res) =>
                    self.getRespone(res)

                // this.setState({speciality:res.specialty})
            )
        //   this._handlePressLogin()
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

        this.props.navigation.navigate('BookingAppointment')
    }

    selectedFirstsd = (item) => {
        GLOBAL.searchSpeciality = item
        this.props.navigation.navigate('SearchSpeciality')
        //  this.props.navigation.navigate('ArticleDescription')
    }

    renderRowItem2 = (itemData) => {
        var index = itemData.index

        return (
            <TouchableOpacity onPress={() => this.selectedFirstsd(itemData.item.title)
            }>
                <View   style  = {{width:window.width/2 - 12,margin:4, height:125,borderRadius: 30,shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }}
                >
                    {index % 9 == 0 && (
                        <Image   source={require('./firsts.png')}
                                 style  = {{width:window.width/2 - 12, height:125,borderRadius:22
                                 }}

                        />
                    )}

                    {index % 9 == 1 && (
                        <Image   source={require('./seconds.png')}
                                 style  = {{width:window.width/2 - 12, height:125,borderRadius:22
                                 }}

                        />
                    )}

                    {index % 9 == 2 && (
                        <Image   source={require('./thirds.png')}
                                 style  = {{width:window.width/2 - 12, height:125,borderRadius:22
                                 }}

                        />
                    )}

                    {index % 9 == 3 && (
                        <Image   source={require('./patient.png')}
                                 style  = {{width:window.width/2 - 12, height:125,borderRadius:22
                                 }}

                        />
                    )}

                    {index % 9 == 4 && (
                        <Image   source={require('./doctor.png')}
                                 style  = {{width:window.width/2 - 12, height:125,borderRadius:22
                                 }}

                        />
                    )}

                    {index % 9 == 5 && (
                        <Image   source={require('./lab.png')}
                                 style  = {{width:window.width/2 - 12, height:125,borderRadius:22
                                 }}

                        />
                    )}

                    {index % 9 == 6 && (
                        <Image   source={require('./ambulance.png')}
                                 style  = {{width:window.width/2 - 12, height:125,borderRadius:22
                                 }}

                        />
                    )}
                    {index % 9 == 7 && (
                        <Image   source={require('./healthcare.png')}
                                 style  = {{width:window.width/2 - 12, height:125,borderRadius:22
                                 }}

                        />
                    )}
                    {index % 9 == 8 && (
                        <Image   source={require('./report.png')}
                                 style  = {{width:window.width/2 - 12, height:125,borderRadius:22
                                 }}

                        />
                    )}


                    <Image source={{ uri: itemData.item.image }}
                           style  = {{width:45, height:45,marginTop: -80,marginLeft:5,resizeMode:'contain'
                           }}

                    />

                    <Text style = {{fontSize:11,margin:5,marginLeft:10,fontFamily:'Konnect-Regular',color:'white'}}>
                        {itemData.item.title}

                    </Text>

                </View>
            </TouchableOpacity>

        )
    }
    renderRowItem3 = (itemData) => {
        return (
            <View   style  = {{width:window.width/2.5 - 8,margin:4,borderRadius: 30,shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            }}
            >
                <Image source={{ uri: itemData.item.image }}
                       style  = {{width:window.width/2.5 - 12, height:100,borderRadius:22
                       }}

                />





                <Text style = {{fontSize:13,margin:5,fontFamily:'Konnect-Regular',color:'black'}}>
                    {itemData.item.title}

                </Text>



            </View>

        )
    }

    selectedFirst = ()=> {
        this.dialogComponent.show();
    }

    renderRowItem1 = (itemData) => {
        return (
            <TouchableOpacity onPress={() => this.selectedFirst(itemData.index)
            }>
                <View   style  = {{width:window.width/3 - 8,margin:4, height:100,borderRadius: 30,shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }}
                >
                    <Image source={itemData.item.image}
                           style  = {{width:window.width/3 - 12, height:100,borderRadius:22
                           }}

                    />



                    <Image source={itemData.item.back}
                           style  = {{width:45, height:45,marginTop: -80,marginLeft:5,resizeMode:'contain'
                           }}

                    />

                    <Text style = {{fontSize:11,margin:5,fontFamily:'Konnect-Regular',color:'white'}}>
                        {itemData.item.title}

                    </Text>

                </View>
            </TouchableOpacity>

        )
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }
    setSearchText (e) {
        this.setState({
            searchText: e.target.value
        });
    }
    render() {

        var radio_props = [
            {label: 'Online Consulltation', value: 0 },
            {label: 'Offline Consulltation', value: 1 }
        ];

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
            <View>
                <SafeAreaView style={{ flex:0, backgroundColor: '#6d0000' }} />


                <View style={{ flex: 1, backgroundColor: 'white' }} />
                <View style = {{backgroundColor:'#800000',height:54,width:'100%',flexDirection: 'row'}}>
                    <View style = {{width :'76%',flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()
                        }>
                        <Image style = {{margin :15,height:25,width:30}}
                               source={require('./back.png')}/>
                        </TouchableOpacity>

                        <Image style = {{marginTop:14,height:27,width:27,marginLeft:-7}}
                               source={require('./homelogo.png')}/>



                        <Text style= {{fontSize:17,fontFamily:'Konnect-Medium',color:'white',marginTop:17,marginLeft:8}} >
                            PAYMENT
                        </Text>
                    </View>


                </View>
                <KeyboardAwareScrollView>
                    <Text style= {{fontSize:20,fontFamily:'Konnect-Medium',color:'black',marginTop:2,marginLeft:8}} >
                        Payment Option
                    </Text>

                    <TouchableOpacity onPress={() => this.setState({card:!this.state.card})
                    }>
                    <View style = {{flexDirection:'row',width:'100%',marginTop:10}}>

                        <View style ={{flexDirection:'row',width:'80%'}}>
                            {this.state.card == false && (
                                <Image style = {{marginTop:8,marginLeft:8,height:20,width:20,resizeMode:'contain'}}
                                       source={require('./unfill.png')}/>
                            )}
                            {this.state.card == true && (
                                <Image style = {{marginTop:8,marginLeft:8,height:20,width:20,resizeMode:'contain'}}
                                       source={require('./fill.png')}/>
                            )}

                            <Text style= {{fontSize:13,fontFamily:'Konnect-Regular',color:'black',marginTop:10,marginLeft:8}} >
                                Debit/CreditCard Netbanking Via Payu
                            </Text>

                        </View>
                        <Image style = {{marginLeft:10,marginTop:8,height:22,width:22,resizeMode:'contain'}}
                               source={require('./card.png')}/>

                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.setState({paytm:!this.state.paytm})
                    }>
                    <View style = {{flexDirection:'row',width:'100%',marginTop:10}}>

                        <View style ={{flexDirection:'row',width:'80%'}}>

                            {this.state.paytm == false && (
                                <Image style = {{marginTop:8,marginLeft:8,height:20,width:20,resizeMode:'contain'}}
                                       source={require('./unfill.png')}/>
                            )}
                            {this.state.paytm == true && (
                                <Image style = {{marginTop:8,marginLeft:8,height:20,width:20,resizeMode:'contain'}}
                                       source={require('./fill.png')}/>
                            )}


                            <Text style= {{fontSize:13,fontFamily:'Konnect-Regular',color:'black',marginTop:10,marginLeft:8}} >
                                Pay With Paytm
                            </Text>

                        </View>
                        <Image style = {{marginLeft:10,marginTop:8,height:22,width:22,resizeMode:'contain'}}
                               source={require('./paytm.png')}/>

                    </View>
                    </TouchableOpacity>


                    <View style = {{width:'100%',backgroundColor:'#f2f5f7',marginTop:20,height:40}}>

                        <Text style= {{fontSize:17,fontFamily:'Konnect-Medium',color:'black',marginTop:8,marginLeft:8}} >
                            Registration Charge
                        </Text>
                    </View>

                    <View style = {{flexDirection:'row',width:'100%'}}>

                        <Text style= {{fontSize:20,fontFamily:'Konnect-Regular',color:'black',marginTop:10,marginLeft:8,width:'80%'}} >
                           Amount Pay
                        </Text>
                        <Text style= {{fontSize:20,fontFamily:'Konnect-Regular',color:'black',marginTop:10,marginLeft:8}} >
                            ₹ 100
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerNavigator')
                    }>
                        <View style = {{marginTop:window.height -400,backgroundColor:'#800000',height:45,borderRadius:22,alignSelf:'center',width:300,


                            borderBottomWidth: 0,
                            shadowColor: '#80000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            flexDirection:'row'}}>


                            <Text style= {{width:'100%',alignSelf:'center',textAlign:'center',fontSize:20,fontFamily:'Konnect-Medium',color:'white',padding:11}} >
                                PROCEED TO PAYMENT
                            </Text>

                            <Image style = {{width :25 ,height: 25,resizeMode: 'contain',marginLeft:-40,marginTop:10}}
                                   source={require('./right.png')}/>


                        </View>
                    </TouchableOpacity>

                </KeyboardAwareScrollView>




            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'white'
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
        color : '#c6c6c6',
        fontFamily:'Konnect-Regular',



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