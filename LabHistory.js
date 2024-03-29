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
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class LabHistory extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        FlatListItems: [
            {"key": "#1",
                "name": "Appointment with Dr.priya Dua(PT)",
                "address": "Dermatologist, Skin ethics Skin Clinc & Dermatosurgery Center",
                "Backchodi": "Branch famous hai inka",
                "imageUrl": "http://venushospital.in/wp-content/uploads/2019/07/noopurchhasatiya-236x300.png",
                "time": "26 Aug 2019, 8:00 AM",
            },
            {"key": "#2",
                "name": "Appointment with Dr.Rinki Mehta(PT)",
                "address": "Dermatologist, Skin ethics Skin Clinic & Dermatosurgery Center",
                "Backchodi": "Branch famous hai inka",
                "imageUrl": "http://venushospital.in/wp-content/uploads/2019/08/Gulfisha_Ahmed-229x300.png",
                "time": "26 Aug 2019, 8:00 AM",
            },
            {"key": "#3",
                "name": "Appointment with Dr.Payal Khatri(PT)",
                "address": "Dermatologist, Skin ethics Skin Clinc & Dermatosurgery Center",
                "Backchodi": "Branch famous hai inka",
                "imageUrl": "https://letsgetsciencey.com/wp-content/uploads/2019/03/wright_jane.jpg",
                "time": "26 Aug 2019, 8:00 AM",
            },
            {"key": "#4",
                "name": "Appointment with Dr.Riyanshi(PT)",
                "address": "Dermatologist, Skin ethics Skin Clinc & Dermatosurgery Center",
                "Backchodi": "Branch famous hai inka",
                "imageUrl": "http://www.tessgerritsen.com/wp-content/files/Tess-Gerritsen.jpg",
                "time": "26 Aug 2019, 8:00 AM",
            },


        ]
    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'LAB BOOKING',
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



    componentDidMount() {


        const url = GLOBAL.BASE_URL + 'lab_booking_list'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id": GLOBAL.user_id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {




                if (responseJson.status == true) {
                    this.setState({results: responseJson.list})


                } else {
                    this.setState({results: []})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }
    selectedFirst = (item) => {
     GLOBAL.labdetail = item
        this.props.navigation.navigate('LabHistoryDetail')

    }

    renderItem=({item}) => {
        return(
            <TouchableOpacity onPress={() => this.selectedFirst(item)
            }>
                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>


                    <View style = {{flexDirection:'row',width :'100%'}}>
                        <Image style = {{width :60 ,height :60,borderRadius: 30,margin:10}}
                               source={{uri:item.lab_image}}/>

                        <View style = {{width :window.width -120}}>

                            <Text  style = {{fontFamily:"Poppins-Regular",color:'black',fontSize:14,marginLeft:4,marginTop:1}}>
                                {item.lab_name}

                            </Text>

                            {item.status == "1" && (
                                <Text  style = {{fontFamily:"Poppins-Regular",color:'grey',fontSize:14,marginLeft:4,marginTop:1}}>
                                    Completed

                                </Text>
                            )}

                            {item.status == "0" && (
                                <Text  style = {{fontFamily:"Poppins-Regular",color:'grey',fontSize:14,marginLeft:4,marginTop:1}}>
                                    Pending

                                </Text>
                            )}







                            {/*                    <Text  style = {{fontFamily:"Poppins-SemiBold",color:'#800000',fontSize:16,textAlign:'right',width:window.width- 50}}>
                        ADD CART

                    </Text>
*/}
                        </View>
                    </View>
                </View>
</TouchableOpacity>

        );
    }

    _keyExtractor=(item, index)=>item.key;



    render() {


        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (
            <View style={{width : Dimensions.get('window').width,flex:1,backgroundColor:'#F2F5F7'}}>
                <FlatList
                    data={this.state.results}

                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',
        flex:1
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },

})