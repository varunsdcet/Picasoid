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
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Login extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,

        selected:false,
        data:[],
        results:[],

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


    componentDidMount(){
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
        if (this.state.phone == ''){
            alert('Please Enter Username')
        }    else if (this.state.company == '') {
            alert('Please Enter Password')
        }  else {
            this.showLoading()
            const url = GLOBAL.BASE_URL + 'Signin'
            this.showLoading()
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: this.state.phone,
                    password: this.state.company,
                    deviceID: '',
                    deviceType: Platform.OS,
                    deviceToken: '',
                    model_name: '',
                    carrier_name: '',
                    device_country: '',
                    device_memory: '',
                    has_notch: '',
                    manufacture: '',
                    ip_address: '',
                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                   // alert(JSON.stringify(responseJson))

                    this.hideLoading()
                    if (responseJson.status == true) {
                        this.setState({results: responseJson.user_detail})
                        GLOBAL.user_id = this.state.results.user_id
                        AsyncStorage.setItem('userID', this.state.results.user_id);
                        AsyncStorage.setItem('image', this.state.results.image);
                        AsyncStorage.setItem('name', this.state.results.name);
                        AsyncStorage.setItem('email', this.state.results.email);
                        AsyncStorage.setItem('mobile', this.state.results.mobile);
                        this.props.navigation.replace('Home')
                    } else {
                        alert('Invalid Credentials!')
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
       // this.props.navigation.navigate('BasicDetail')
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
            <SafeAreaView>
                <View style={styles.container}>
                    <KeyboardAwareScrollView>

                        <ImageBackground source={require('./background.png')}style={{width: '100%', height: '100%'}}>

                        <Image style = {{width :300 ,height: 140,alignSelf:'center',marginTop:'10%',resizeMode: 'contain'}}
                               source={require('./logo.png')}/>


                            <Text style={{marginLeft:20,textAlign:'left',width:'100%',color :'black',fontFamily:'Konnect-Medium',fontSize: 40,marginTop:40}} >

                                Login
                            </Text>

                            <Text style={{marginLeft:20,textAlign:'left',width:'90%',color :'#c6c6c6',fontFamily:'Konnect-Regular',fontSize: 19,marginTop:5}} >

                                Please sign In to your account to continue with Picasoid
                            </Text>


                        <View style = {{marginLeft:'5%',width:'90%',marginTop:'2%',flexDirection:'row'}}>

                            <Image style = {{width :25 ,height: 25,resizeMode: 'contain',marginTop:30}}
                                   source={require('./username.png')}/>

                            <View style = {{width:'90%',marginLeft:'2%'}}>

                            <TextField
                                label= 'USERID'
                                value={phone}
                                lineWidth={ 0}
                                activeLineWidth={0}


                            onChangeText={ (phone) => this.setState({ phone }) }
                                tintColor = {'#c6c6c6'}
                            />

                            </View>


                        </View>

<View style = {{backgroundColor:'#c6c6c6',height:1,marginLeft:'5%',width:'90%',marginTop:0}}>

</View>

                            <View style = {{marginLeft:'5%',width:'90%',marginTop:'1%',flexDirection:'row'}}>

                                <Image style = {{width :25 ,height: 25,resizeMode: 'contain',marginTop:30}}
                                       source={require('./password.png')}/>

                                <View style = {{width:'90%',marginLeft:'2%'}}>

                                    <TextField
                                        label= 'PASSWORD'
                                        value={company}
                                        lineWidth={ 0}
                                        activeLineWidth={0}
                                        secureTextEntry = {true}


                                        onChangeText={ (company) => this.setState({ company }) }
                                        tintColor = {'#c6c6c6'}
                                    />

                                </View>


                            </View>

                            <View style = {{backgroundColor:'#c6c6c6',height:1,marginLeft:'5%',width:'90%',marginTop:0}}>

                            </View>





                            <TouchableOpacity onPress={() => this.login()
                            }>

                     <View style = {{marginTop:40,backgroundColor:'#800000',height:45,borderRadius:22,alignSelf:'center',width:300,


                         borderBottomWidth: 0,
                         shadowColor: '#80000',
                         shadowOffset: { width: 0, height: 2 },
                         shadowOpacity: 0.8,
                         shadowRadius: 2,
                         flexDirection:'row'}}>


                         <Text style= {{width:'100%',alignSelf:'center',textAlign:'center',fontSize:20,fontFamily:'Konnect-Medium',color:'white',padding:11}} >
                            SUBMIT
                         </Text>

                         <Image style = {{width :25 ,height: 25,resizeMode: 'contain',marginLeft:-40,marginTop:10}}
                                source={require('./right.png')}/>


                     </View>
                            </TouchableOpacity>







                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')
                        }>
                            <Text style={styles.createaccount} >

                                <Text style={styles.account} >
                                    Don't have an account?
                                </Text>


                                <Text style={styles.createaccounts} >
                                    &nbsp;Sign Up
                                </Text>


                            </Text>

                        </TouchableOpacity>
                        </ImageBackground>

                    </KeyboardAwareScrollView>

                </View>
            </SafeAreaView>
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