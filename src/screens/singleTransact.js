import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, FlatList, Image, ImageBackground, TouchableOpacity, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {IPAYMU_API_KEY} from 'react-native-dotenv';
import phoneID from '../store/phoneID';
import axios from 'axios';
import moment from 'moment'
import { connect } from "react-redux"
import {postOrder, postTransaksi} from '../public/redux/action/order'
import DateTimePicker from "react-native-modal-datetime-picker";
import { AsyncStorage } from "react-native";

class singleTransact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.navigation.getParam('data'),
            va: '',
            processing: false,
            stat: '',
            date: moment(new Date()).format('DD-MM-YYYY'),
            isDateTimePickerVisible: false,
            datas:[]
        }
    }

    orderNow = async() =>{
        // alert('hello');
        this.setState({ processing: true });

        let data = {
                key: IPAYMU_API_KEY,
                price: this.state.data.price,
                uniqid: "1",
                notify_url: "http://websiteanda.com/notify.php"
            }

        await axios.post("https://my.ipaymu.com/api/getbniva", data).then(res => {
            // alert(JSON.stringify(res.data));
            this.setState({ va: res.data.va, processing: false, stat: 'finish', datas: res.data });
            this.triggerNotif();
        }).catch(error => {
            alert('transaction failed'+JSON.stringify(error));
        });

        let id = await AsyncStorage.getItem('id')
        let a = this.state.date;
        let b = a.split('-');
        let newDate = b[2]+"-"+b[1]+"-"+b[0];

        let value = {
            id: this.state.datas.id,
            va: this.state.datas.va,
            displayName: this.state.datas.displayName,
            id_user : id,
            id_destination: this.state.data.id_destination,
            price: this.state.data.price,
            date: newDate
        }
        this.props.dispatch(postTransaksi(value))
    }

    confirmOrder = async() =>{
        let id = await AsyncStorage.getItem('id')
        let value = ''
        let a = this.state.date;
        let b = a.split('-');
        let newDate = b[2]+"-"+b[1]+"-"+b[0];
        
        if (this.state.data.category) {
            value = {
                id_user: id,
                id_destination: this.state.data.id_destination,
                id_transaksi: this.state.datas.id,
                date: newDate,
                price: this.state.data.price,
                category: this.state.data.category
            }
        }else{
            value = {
                id_user: id,
                id_destination: this.state.data.id_destination,
                id_transaksi: this.state.datas.id,
                date: newDate,
                price: this.state.data.price,
                category: 0
            }
        }
        await this.props.dispatch(postOrder(value))
        this.props.navigation.navigate('Home')
    }

    triggerNotif = () =>{

        let data = {
            phoneid: phoneID.phoneID,
            msg: "Please continue the payment via BNI",
            header: "Transaction"
        }

        axios.post("https://ayodolanbackend.herokuapp.com/singleorder/notif", data);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log(date)
        this.setState({
            date: moment(new Date(date)).format('DD-MM-YYYY')
        })
        this.hideDateTimePicker();
    };

    MonthFormat = (month=0) =>{

        let newDate;

        if (month == 1) {
            newDate = 'Jan';
        }
        else if (month == 2) {
            newDate = 'Feb';

        }
        else if (month == 3) {
            newDate = 'Mar';

        }
        else if (month == 4) {
            newDate = 'Apr';

        }
        else if (month == 5) {
            newDate = 'May';

        }
        else if (month == 6) {
            newDate = 'Jun';

        }
        else if (month == 7) {
            newDate = 'Jul';

        }
        else if (month == 8) {
            newDate = 'Aug';

        }
        else if (month == 9) {
            newDate = 'Sep';

        }
        else if (month == 10) {
            newDate = 'Oct';

        }
        else if (month == 11) {
            newDate = 'Nov';

        }
        else if (month == 12) {
            newDate = 'Dec';

        }
        else {
            newDate = 'Jan';

        }

        return newDate;
    }

    DateNow = (mode='showcase') =>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        if(mode == 'showcase')
        {
            today = dd + ' ' + this.MonthFormat(mm) +' '+ yyyy;
        }
        else if(mode == 'sql')
        {
            today = yyyy + '-' + mm + '-' + dd;
        }

        return today;
    }

    listMainB = ({ item }) => (
        <TouchableOpacity activeOpacity={0.8}>
            <View style={{ marginLeft: "8%", marginBottom: 25 }}>
                <Image source={{ uri: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg' }} style={styles.BgListB} />
                <View style={{ marginTop: 15, marginLeft: "8%" }}>
                    <Text style={{ fontSize: 20 }}>{item.title}</Text>
                    <Text>{item.hours} Hours</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    formatNumber = nums => {
        return nums.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    render() {
        return (
            <Fragment>
                <ImageBackground source={require('../img/bgb.png')} style={{ width: "100%", height: "100%" }}>
                <ScrollView>
                    <View style={component.header}>
                        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="left" size={24}/>
                        </TouchableOpacity>
                        <Text style={{flex: 1, fontSize: 24, textAlign: 'right'}} >Payment</Text>
                    </View>
                    {this.props.paket.isError ?
                        alert("guide Habis")
                    :
                        null
                    }
                    
                    <View style={{flex: 1, alignSelf: 'center'}}>
                        <View style={component.date}>
                            <View style={{flex: 2, justifyContent: 'center'}}>
                                <Text style={{fontSize: 20, fontFamily: 'sans-serif-thin', paddingLeft: 5}}>{this.state.date}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Button title="Tanggal" onPress={this.showDateTimePicker}/>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={component.body}>
                        <View style={component.card}>
                            <View style={{flex: 1}}>
                                <Text style={{ fontSize: 20 }}>{this.state.data.destination}</Text>
                            </View>
                            <View style={{ height: 30 }}>
                                
                            </View>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 1}}>
                                    <Text style={{ fontFamily: 'sans-serif-medium' }}>Price</Text>
                                    <Text style={{ fontSize: 18 }}>Rp {this.formatNumber(this.state.data.price)}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{ textAlign: 'right', fontFamily: 'sans-serif-medium' }}>Order Date</Text>
                                    <Text style={{ textAlign: 'right', fontSize: 18 }}>{this.state.date}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={component.body}>
                    {
                        this.state.va != ''
                        ?
                            <View style={component.card}>
                                <View style={{flex: 1}}>
                                    <Text style={{ fontSize: 16, marginBottom: 15, textAlign: "center" }}>
                                        Please complete your payment via BNI
                                    </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{ fontSize: 26, marginBottom: 15, textAlign: "center" }}>
                                        VA: {this.state.va}
                                    </Text>
                                </View>
                            </View>
                        :
                        null
                    }
                    </View>
                    
                </ScrollView>
                <View style={{ flex: 1 }}>
                    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20 }}>
                        {
                        this.state.processing
                        ?
                            <Text style={{ textAlign: "center", fontSize: 20,backgroundColor: "#18d92b", padding:15}}>Processing...</Text>
                        :
                            this.state.stat == ''
                            ?
                            <TouchableOpacity onPress={() => {this.orderNow()}} style={{backgroundColor: "#18d92b", padding:15}}>
                                <Text style={{ textAlign: "center", fontSize: 20 }}>Order Now</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => {this.confirmOrder()}} style={{backgroundColor: "#7ce619", padding:15}}>
                                <Text style={{ textAlign: "center", fontSize: 20 }}>confirmation</Text>
                            </TouchableOpacity>

                        }
                    </View>
                </View>
                </ImageBackground>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
      paket: state.paket
      // auth: state.auth
    };
  };
  
export default connect(mapStateToProps)(singleTransact);

const component = StyleSheet.create({
    header: {
        flexDirection: 'row',
        flex: 1,
        paddingLeft: 15,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    body: {
        flex: 1,
        marginTop: 25,
    },
    card: {
        width: '90%', 
        backgroundColor: "#EEEEEE", 
        alignSelf: 'center', 
        padding: 20,
        borderRadius: 15
    },
    date: {
        height:60, 
        flexDirection: 'row', 
        paddingLeft: 15, 
        paddingRight: 15, 
        backgroundColor: '#EEEEEE', 
        justifyContent: 'center', 
        width: '90%', 
        borderRadius: 15
    }
})

const styles = StyleSheet.create({
    container: {
        display: "flex",
    },
    btnA:{
        borderWidth: 0.3,
        borderColor: "#fff",
        width: "100%",
        marginHorizontal: 16,
        padding: 15,
        borderRadius: 15,
        backgroundColor: "#C5E1A5"
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 40
    },
    dates:{
        marginTop: 5,
        fontSize: 20
    },
    AdditionTitle:{
        flex: 1,
        fontSize: 15
    },
    AdditionValue:{
        flex: 1,
        fontSize: 25

    },
    money:{
        marginTop: 12,
        fontSize: 24
    },
    PaymentTitle:{
        flex: 1,
        fontSize: 20,
        fontWeight: "bold"
    },
    PaymentValue:{
        flex: 1,
        marginLeft: 25,
        textAlign: "right",
        fontSize: 20,
        alignItems: "flex-end"
    },
    containt:{
        marginTop: 15,
        marginBottom: 20,
        // marginHorizontal: "5%",
        marginLeft: "5%",
        borderRadius: 15,
        width: "90%",
        height: 160,
        backgroundColor: "#EEEEEE",
        padding: 20
        
    },
    containtB:{
        marginTop: 5,
        flexDirection: "row",
        padding: 3

    },
    PaymentContent:{
        flexDirection:"row",
        margin: 15
    },
    contentTitle: {
        marginTop: 25,
        marginLeft: 30
    },
    contentSub: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: "12%",
        marginLeft: 25

    },
    Title: {
        fontSize: 27,
        fontWeight: "bold",
    },
    
    BgList: {

        backgroundColor: "#EEEEEE",
        width: 157,
        height: 250,
        margin: 5,
        borderRadius: 25,
        padding: 30
    },
    BgListB: {
        width: "85%",
        height: 157,
        margin: 5,
        borderRadius: 25,
    },
    TitleList: {
        fontSize: 25,
        marginTop: 150
    },
    textList: {
        alignSelf: "flex-end",
        marginTop: 160,
        color: "#fff"

    },

});