import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Linking,



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
import moment from "moment";

export default class Home extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        searchText:'',
        banner:[],
        value:0,
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
        this.setState({banner:res.banners})
        this.setState({articles:res.articles})

    }

    componentDidMount(){
        GLOBAL.date = moment()
        var self=this;
        store.get('responseJson')
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

        if (this.state.value == 0){
            this.props.navigation.navigate('BookingAppointment')
        }else{
            GLOBAL.onlinetype = "normal"
            this.props.navigation.navigate('OfflineBooking')
        }


    }

    selectedFirstsd = (item) => {
        GLOBAL.searchSpeciality = item
        this.props.navigation.navigate('SearchSpeciality')
        //  this.props.navigation.navigate('ArticleDescription')
    }
//SearchSpeciality
    renderRowItem2 = (itemData) => {
        var index = itemData.index

        return (
            <TouchableOpacity onPress={() => this.selectedFirstsd(itemData.item.title)
            }>
            <View   style  = {{width:window.width/3 - 8,margin:4, height:120,borderRadius: 30,shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            }}
            >
                {index % 3 == 0 && (
                <Image   source={require('./firsts.png')}
                       style  = {{width:window.width/3 - 12, height:100,borderRadius:22
                       }}

                />
                )}

                {index % 3 == 1 && (
                    <Image   source={require('./seconds.png')}
                    style  = {{width:window.width/3 - 12, height:100,borderRadius:22
                }}

                    />
                    )}

                {index % 3 == 2 && (
                    <Image   source={require('./thirds.png')}
                    style  = {{width:window.width/3 - 12, height:100,borderRadius:22
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

    article = (itemData) =>{

        GLOBAL.aid = itemData
        this.props.navigation.navigate('ArticleDescription')
    }
    //aid
    renderRowItem3 = (itemData) => {
        return (
            <TouchableOpacity onPress={() => this.article(itemData.item.description)
            }>
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





                <Text style = {{fontSize:13,margin:5,fontFamily:'Konnect-Regular',color:'black',height:30}}>
                    {itemData.item.title}

                </Text>



            </View>
            </TouchableOpacity>

        )
    }

    selectedFirst = (index)=> {
        if (index == 0){
            this.dialogComponent.show();
        }else if  (index == 3){
            this.props.navigation.navigate('HospitalList')
        }else if  (index == 1){
            this.props.navigation.navigate('Labtest')
        }else if(index == 2) {
            Linking.openURL(`tel:${GLOBAL.ambulance}`)
        }else if(index == 4) {
            this.props.navigation.navigate('Upload')
        }

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
                    <TouchableOpacity style = {{width:'76%'}}
                        onPress={() =>this.props.navigation.toggleDrawer()}>
                    <View style = {{flexDirection:'row'}}>
                    <Image style = {{margin :15,height:25,width:30}}
                           source={require('./drawer.png')}/>

                    <Image style = {{marginTop:14,height:27,width:27,marginLeft:-7}}
                           source={require('./homelogo.png')}/>



                    <Text style= {{fontSize:17,fontFamily:'Konnect-Medium',color:'white',marginTop:17,marginLeft:8}} >
                        Home
                    </Text>
                    </View>
                    </TouchableOpacity>

                <View style = {{flexDirection:'row',marginTop :2}}>

                    <TouchableOpacity
                                      onPress={() =>   Linking.openURL(`tel:${GLOBAL.emer}`)}>
                <Image style = {{margin :15,height:20,width:20}}
                       source={require('./call.png')}/>
                    </TouchableOpacity>

                <Image style = {{marginTop:14,height:20,width:20,marginLeft:-2}}
                       source={require('./calendar.png')}/>

                </View>
                </View>
                <KeyboardAwareScrollView>
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    showsPageIndicator={false}
                    index={0}
                    pageSize={BannerWidth}
                >
                    {this.state.banner.map((image, index) => this.renderPage(image, index))}
                </Carousel>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')
                    }>
                <View style = {{width :'80%',alignSelf:'center',height:40,borderRadius:22,marginTop:- 20,flexDirection:'row',backgroundColor:'white',borderColor: '#ddd',
                    borderBottomWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,}}>

                    <Image style = {{height:20,width:20,marginLeft :20,marginTop:10,resizeMode:'contain'}}
                           source={require('./homesearch.png')}/>
                           <TextInput
                               style={{width:'69%',marginLeft:20}}
                               value={this.state.searchText}
                               onChange={this.setSearchText.bind(this)}
                               editable = {false}
                               placeholder='Search  for doctor,speciality etc'
                           />

                </View>
                    </TouchableOpacity>


                <Text style= {{color:'black',fontSize:20,fontFamily:'Konnect-Regular',marginLeft:15,marginTop:15}}>

                    Services

                </Text>

                <View style = {{marginLeft:15,backgroundColor:'black',height:2,width:20}}>

                </View>


                <FlatList style = {{marginTop:20,marginLeft:5,width:window.width - 10}}
                    data={this.state.moviesList}
                          numColumns={3}

                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderRowItem1}
                    extraData={this.state}
                />


                   <View style = {{flexDirection:'row',width:'100%'}}>
                    <Text style= {{color:'black',fontSize:20,fontFamily:'Konnect-Regular',marginLeft:15,marginTop:15,width:'70%'}}>

                        Specialities

                    </Text>

                       <TouchableOpacity onPress={() => this.props.navigation.navigate('Speciality')
                       }>

                       <Text style= {{color:'#800000',fontSize:14,fontFamily:'Konnect-Regular',marginLeft:15,marginTop:15,alignSelf:'flex-end',marginRight:20}}>

                           View All

                       </Text>

                       </TouchableOpacity>
                   </View>

                    <View style = {{marginLeft:15,backgroundColor:'black',height:2,width:20}}>

                    </View>

                    <FlatList style = {{marginTop:20,marginLeft:5,width:window.width - 10}}
                              data={this.state.speciality}
                              horizontal={true}
                              keyExtractor={this._keyExtractor}
                              renderItem={this.renderRowItem2}
                              extraData={this.state}
                    />


                    <Text style= {{color:'black',fontSize:20,fontFamily:'Konnect-Regular',marginLeft:15,marginTop:15}}>

                        Articles

                    </Text>

                    <View style = {{marginLeft:15,backgroundColor:'black',height:2,width:20}}>

                    </View>


                    <FlatList style = {{marginTop:20,marginLeft:5,width:window.width - 10}}
                              data={this.state.articles}
                              horizontal={true}
                              keyExtractor={this._keyExtractor}
                              renderItem={this.renderRowItem3}
                              extraData={this.state}
                    />

                    <View style = {{marginTop:100}}>

                    </View>

                </KeyboardAwareScrollView>

                <DialogComponent
                    dialogStyle = {{backgroundColor:'transparent'}}
                    dialogTitle={<DialogTitle title="Dialog Title" />}
                    ref={(dialogComponent) => { this.dialogComponent = dialogComponent; }}
                >
                    <View style = {{width :window.width - 30 ,alignSelf:'center',backgroundColor:'transparent'}}>

                        <View style = {{backgroundColor:'#6d0000',width:window.width - 30,height :50}}>

                            <Text style = {{margin:15,color:'white',fontFamily:'Konnect-Regular',fontSize:18}}>
                            Choose Booking Type
                            </Text>

                        </View>

                        <View style = {{width:window.width - 30,backgroundColor:'white',height:180}}>

                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                buttonColor={'#800000'}
                                buttonOuterColor = {'#800000'}
                                selectedButtonColor = {'#800000'}
                                animation={true}
                                labelColor={'black'}
                                buttonStyle={{marginTop:20}}
                                buttonWrapStyle={{marginTop:20}}
                                labelStyle = {{fontSize:16,fontFamily:'Konnect-Regular',width:window.width - 100,marginTop:20,marginLeft:20}}
                                onPress={(value) => {this.setState({value:value})}}
                            />


                            <Button
                                style={{padding:6,marginTop:20,width:100,fontSize: 14, color: 'white',backgroundColor:'#800000',alignSelf:'center',height:30,fontFamily:'Konnect-Regular',borderRadius:4}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this.login()}>
                                SUBMIT
                            </Button>
                        </View>




                    </View>
                </DialogComponent>


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