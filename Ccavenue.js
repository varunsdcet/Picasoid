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
var RSAKey = require('react-native-rsa');
import { stringToBytes } from 'convert-string';
import { WebView } from 'react-native-webview';
import qs from 'querystring'
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Ccavenue extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        bode:[],

        selected:false,
        data:[],
        images :[
            {
                title :'Planned Visit',
                image :require('./male.png'),
                selected:'',
                images :require('./males.png'),
                price :' INR 100 ',

            },
            {
                title :'Emergency',
                image :require('./female.png'),
                selected:'',
                images :require('./females.png'),
                price :' INR 100 ',

            },
        ]

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
            //   header: () => null,
            title: 'CONFIRMATION',
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

    convertStringToByteArray(str){
        String.prototype.encodeHex = function () {
            var bytes = [];
            for (var i = 0; i < this.length; ++i) {
                bytes.push(this.charCodeAt(i));
            }
            return bytes;
        };

        var byteArray = str.encodeHex();
        return byteArray
    }
    componentDidMount(){

        var access_code = "AVRX75EL12BT74XRTB"
        var merchant_id = "147304"
        var redirect_url = "http://haryanacowmilkdairy.in/cow_nector/cc_php/ccavResponseHandler.php"
        var cancel_url = "http://haryanacowmilkdairy.in/cow_nector/cc_php/cancel.php"
        var enc_val = "S+2NYtE/DG1S5RrmUYHtx7t3Pm0INOvgBIwIv5F++NY4TCmH2O0dTDY0spniUzplnF+vk4dAR1LzeS7gBJ1hmlFz6iGQSZx5b+3b3aDlIkZMa980rpMGHrJTqHNzutkVqfYVnOw+UByeeql2IjGlFwkX1eDaUjOcBRlqV1DVEzVyLfMqsc715gaClIkt40ymgSTPEBwZlj+RdArAp3d/XYv+cgWgbEFlVMJG6FiWFkQndV4HdPmBDuQpmtF9X1MSn9p9zRHNBmT3UETfdOMm+eHKmbjQXcxeNhm7oScbS5rfoyRuUFTLyM9Twj1NBzsBHR18LfDb4IsrTOmmEn5pGg=="

        var commonHtmld = `access_code=${access_code}&merchant_id=${merchant_id}&order_id=${o}&redirect_url=${redirect_url}&cancel_url=${cancel_url}&enc_val=${enc_val}`;

        var str = commonHtmld;



        const data = stringToBytes(str);
        alert(data)
        this.setState({bode:data})




        var o = "11111";


        fetch("http://haryanacowmilkdairy.in/cow_nector/cc_php/GetRSA.php", {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            body: qs.stringify({
                access_code: "AVRX75EL12BT74XRTB",
                order_id: '11111',
            })
        }).then((response) => response.text())
            .then((responseData) => {
alert(responseData)
                //
                // const bits = 1024;
                // const exponent = responseData; // must be a string
                // var rsa = new RSAKey();
                // var r = rsa.generate(bits, exponent);
                // var publicKey = rsa.RSAGetPublicString();
                // var rsa = new RSAKey();
                // rsa.setPublicString(publicKey);
                // var a = "100"
                // var b = "INR"
                //
                // var commonHtml = "amount=100&currency=INR"
                // var originText = commonHtml;
                // var encrypted = rsa.encrypt(originText);
                // alert(encrypted)

                var access_code = "AVRX75EL12BT74XRTB"
                var merchant_id = "147304"
                var redirect_url = "http://haryanacowmilkdairy.in/cow_nector/cc_php/ccavResponseHandler.php"
                var cancel_url = "http://haryanacowmilkdairy.in/cow_nector/cc_php/cancel.php"
                var enc_val = "S+2NYtE/DG1S5RrmUYHtx7t3Pm0INOvgBIwIv5F++NY4TCmH2O0dTDY0spniUzplnF+vk4dAR1LzeS7gBJ1hmlFz6iGQSZx5b+3b3aDlIkZMa980rpMGHrJTqHNzutkVqfYVnOw+UByeeql2IjGlFwkX1eDaUjOcBRlqV1DVEzVyLfMqsc715gaClIkt40ymgSTPEBwZlj+RdArAp3d/XYv+cgWgbEFlVMJG6FiWFkQndV4HdPmBDuQpmtF9X1MSn9p9zRHNBmT3UETfdOMm+eHKmbjQXcxeNhm7oScbS5rfoyRuUFTLyM9Twj1NBzsBHR18LfDb4IsrTOmmEn5pGg=="

                var commonHtmld = `access_code=${access_code}&merchant_id=${merchant_id}&order_id=${o}&redirect_url=${redirect_url}&cancel_url=${cancel_url}&enc_val=${enc_val}`;

                var str = commonHtmld;



                const data = stringToBytes(str);

                return (

                            <WebView

                                source={{uri: 'https://secure.ccavenue.com/transaction/initTrans',body: data,method:'POST'}}
                                style={{marginTop: 20,width:375,height:500}}
                            />
                        )




     //           alert(data)
   //this.setState({bode:d})

            //    var a = "access_code=AVHJ86GH93AD95JHDA&merchant_id=227655&order_id=1-1-month-0&redirect_url=+http%3A%2F%2F139.59.76.223%2Fmindfeed%2Fcc_php%2FccavResponseHandler.php&cancel_url=http%3A%2F%2F139.59.76.223%2Fmindfeed%2Fcc_php%2Fcancel.php&enc_val=cI%2B4ew73sRxoV%2BedOuqMbnH%2F%2Fc43Xq9yrkoJYijUAD9RT8LEMABfGquQIhFqV9vmM9Ojbcfhz2ey%0A1CbSmj5LViloDz3MU%2BF4s4nxgaHgdCNttDV%2BktuCUNPHFDctyGw607X8R8jxjRNGx3iZmBWfz7A7%0AKhyaSiAXR1is%2F3NsiRN3IU6ejWewpToflSuFbuvmIkpiWJcaJCPepw2TLh1Mxm0BCEdqSRYyTWmj%0A0tsCwcF9gj8RXvB09yU5D6FzRS15muLglRXFGdmbdcsz6c9vz8vakv685KB9H7oXokvrH3qsxcSe%0AI4UwP4ZR4yc3c7qtCcqEFeMDUO4lRY5xN6IWgQ%3D%3D%0A"





            })

        //   this._handlePressLogin()
    }


    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>
                <View style={{flexDirection :'row', flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',
                    justifyContent:'space-around',marginTop: 10,marginBottom:10,height:50}}>







                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 20,color :'#1F1F1F', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 80}}>

                        {item.title}
                    </Text>



                    <Image style = {{width :22 ,height :22,alignSelf:'flex-end',marginRight:34,marginBottom:15}}
                           source={require('./service-doorstep_03.png')}/>


                </View>





            </TouchableOpacity>
        )
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
                {this.state.bode.length != 0 && (
                    <WebView

                        source={{uri: 'https://secure.ccavenue.com/transaction/initTrans',body:'',method:'POST'}}
                        style={{marginTop: 20,width:375,height:500}}
                    />
                )}


            </SafeAreaView>
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