import React from 'react'
import {FlatList,TouchableOpacity,StyleSheet,View,Image} from 'react-native'
import {Card,ListItem,Left,Body,Icon,Right,Text,Spinner} from 'native-base';
import {Colors, Typography} from '../../styles/index'
import moment from 'moment'
import { Avatar ,Input,Button} from 'react-native-ui-kitten';


export const ListWithIcon = (Prop)=>  (<FlatList
data={Prop.data}
renderItem={({item})=>
<Card  style={styles.ListWithIconCardStyle}>
  <ListItem
    onPress={()=>Prop.onPress(item)}
    noBorder style={{backgroundColor:Colors.overLay}}>
        <Left style={styles.ListWithIconLeftStyle}>
           <Icon style={[{color:Prop.iconColor,transform:Prop.degree?[{rotate:Prop.degree},Typography.fonts]:[{rotate:"0deg"}]}]} name={Prop.iconLeftName}/>
        </Left>
        <TouchableOpacity onPress={()=>Prop.onPress(item)}>
        <Body>
            {
                Prop.showItem.map((val,index)=>
                  index == 0 ?
                  <Text style={[styles.ListWithIconBodyStyleName,Typography.fonts]}>{item[val]}</Text>
                  :
                  <Text style={[styles.ListWithIconKeyColor,Typography.fonts]}>{item[val]}</Text>
                )
            }
        </Body>
        </TouchableOpacity>
         { 
             //check if a Right item exist which is a bool
         
             Prop.RightItem ?
             <Right style={styles.ListWithIconRightStyle}>
                {
                  Prop.iconRightName && Prop.iconText?
                   <View>
                     <Icon style={{color:Prop.iconColor,transform:Prop.degree?[{rotate:Prop.degree}]:[{rotate:"0deg"}]}} name={Prop.iconRightName}/>
                     <Text style={[styles.ListWithIconRightText,Typography.fonts]} uppercase={false}>{item.price}</Text>
                  </View>
                    :
                    <Icon style={{color:Prop.iconColor,transform:Prop.degree?[{rotate:Prop.degree}]:[{rotate:"0deg"}]}} name={Prop.iconRightName}/>
                }
             </Right> :
             <View></View>  
         }
               
</ListItem>
</Card>
}
/>)

//usually used to show appointment
export const ListWithImage =  (Prop)=>  (<FlatList
    extraData={Prop.state?Prop.state:[]}
    data={Prop.data}
    style={{backgroundColor:Colors.white}}
    renderItem={({item})=>
             <Card style={styles.ListWithIconCardStyle}>   

             <ListItem
               onPress={()=>Prop.onPress(item)}
               noBorder >
                   <Left style={[styles.ListWithIconLeftStyle,{maxWidth:50,width:50,marginRight:10}]}>
                          {/* <View style={styles.ListWithImage}> */}
                                      { 
                                        //tenary operator that checks for docPhoto while rendering flatlist changes
                                         item.avatar?
                                        //   <Image source={{uri:item.photo}} style={styles.imgRounded}/>
                                          <Avatar  source={{uri: item.avatar}} size="giant" />
                                        :

                                        <Avatar style={{borderColor:Colors.lightGray,borderWidth:1}} shape="circle" source={require('../../../assets/default.png')}  />

                                          }
       
                                      
                                      {
                                          //check if list implement a status feature
                                          Prop.status?
                                          <View style={[{backgroundColor:Prop.getBgColor(item)},styles.statusStyle]}></View>
                                         :<View></View>
                                      }
                                          
                          {/* </View> */}
                   </Left>
                   <Body>
                        <TouchableOpacity style={{paddingLeft:2}} onPress={()=>Prop.onPress(item)}>
                           {
                               Prop.showItem.map((val)=>
                
                                  //nested tenary operator
                                    val == 'name'?
                                      <Text category="h2"  style={styles.headerText}>{item.name}</Text> 
                                      :
                                      
                                      <Text style={styles.text}>{item[val]}</Text>  
                               )
                           }   
                         </TouchableOpacity>
                         
                         { item.date?
                         <Text note style={{fontSize:Typography.smallestFontSize,marginVertical:2}}>{item.date?moment(item.date).endOf('day').fromNow():''}</Text>
                         :<View style={{marginTop:10}}/>}


                         {
                             Prop.location?
                              <Button   textStyle={{fontSize:14,lineHeight:14}} status="success" style={{borderRadius:50,width:170,}} size="tiny">{item[Prop.locationProp]}</Button>:
                            <View></View>
                         }

                   
                   </Body>
                    { 
                        //check if a Right item exist which is a bool

                        
                        
                        <Right style={[styles.ListWithIconRightStyle,{width:200}]}>   
                        {/* {
                                         Prop.dateRight?
                                           //nested tenary operator checks if date comes with yymmdd format seperately from db or together and pass to moment
                                           !Prop.format?
                                           <View>
                                              <Text style={styles.text}>{moment(item.date).format('L')}</Text>
                                              <Text style={styles.text}>{moment(item.date).fromNow()}</Text>
                                           </View>
                                           :
                                           <View>
                                                <Text style={styles.text}>{moment(item.date).format('L')}</Text>
                                                <Text style={styles.text}>{moment(item.date).fromNow()}</Text>
                                           </View>
                                           

       
                                          :
                                         <Text></Text>
                                     } 
                           { */}
                           {
                            !Prop.showRight?
                             Prop.iconRightName && Prop.iconText ?
                              <View style={styles.rightStyle}>
                                <Icon style={{color:Prop.iconColor,transform:Prop.degree?[{rotate:Prop.degree}]:[{rotate:"0deg"}]}} name={Prop.iconRightName}/>
                                <Text style={styles.ListWithIconRightText} uppercase={false}>{item[Prop.textPropertyName]}</Text>
                             </View>
                               :
                                item.channel == Prop.connecting?
                                <Spinner color={Colors.lightGray}/>
                                :
                                <Icon style={{fontSize:24,color:Prop.iconColor,transform:Prop.degree?[{rotate:Prop.degree}]:[{rotate:"0deg"}]}} name={Prop.iconRightName}/>
                                :null

                            }
                           
                        </Right>   
                    }
                        
                          
           </ListItem>
           </Card>
    }
    />)

const styles = StyleSheet.create({
    ListWithIconCardStyle:{
        marginBottom:-3,
        borderRadius:5,
        paddingTop: 5,
        paddingBottom: 5,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.5,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
    },
    ListWithIconLeftStyle:{
        ...Typography.fonts,
        maxWidth:50,
        justifyContent:'center',
        alignContent:'center'
    },
    ListWithIconRightStyle:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center'
    },
    ListWithIconBodyStyleName:{
        ...Typography.fonts,
        fontWeight:'bold',
        color:Colors.white
    },
    ListWithIconKeyColor:{
        color:Colors.white
    },
    ListWithIconRightText:{
        fontWeight:'bold',
        ...Typography.fonts
    },
    fonts:{
        fontFamily:'Oxygen-Regular'
    },

    //List with image style
    ListWithImage:{
        height:50,
        width:50,
        backgroundColor:Colors.white,
        borderRadius:100
    },
    statusStyle:{
        width:15,
        height:15,
        borderRadius:100,
        position:'absolute',
        bottom:0,
        right:5,
        borderWidth:3,
        borderColor:'#fff'
      }
      ,
      imgRounded:{
          height:50,
          width:50,
          borderRadius:100
        },

    headerText:{
        ...Typography.fonts,
        fontWeight:'600',
        color:Colors.darkGray,
        fontSize:Typography.headerFontSize
    },
    text:{
        color:Colors.white,
        fontSize:11,
        marginBottom:2,
        fontWeight:'500',
        ...Typography.fonts
    }
    ,
    rightStyle:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    shadow:{
        borderRadius:5,
        paddingTop: 5,
        paddingBottom: 5,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 8},
       }
})