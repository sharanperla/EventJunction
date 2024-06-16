import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RegistrationReceipt = ({ data }) => {
    const [display,setDisplay]=useState(true)
  console.log("revieptData",data);

  return (
    <>
        {!display&&<View> 
            <Text>hi</Text>
            </View>}

    {display&&<View style={styles.container}>
     <Text style={styles.title}>Registration Receipt</Text>
      <View style={styles.item}>
        <Text style={styles.label}>Event Name:</Text>
        <Text style={styles.value}>{data.eventName}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Username:</Text>
        {/* <Text style={styles.value}>{userName}</Text> */}
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>{data.eventAmount} ₹</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Place:</Text>
        <Text style={styles.value}>{data.place}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{new Date(data.eDate).toLocaleDateString()}</Text>
      </View>
    </View>}
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
  },
});

export default RegistrationReceipt;
