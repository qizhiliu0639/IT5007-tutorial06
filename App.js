/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React, { Component } from 'react'
 import { StyleSheet, Text, View, TextInput,TouchableOpacity, Button} from 'react-native'
 import { graphql } from '@apollo/client/react/hoc';
 import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  Mutation,
  useQuery,
  useMutation,
  gql
} from "@apollo/client";

const deleteMutation = gql`mutation issueDelete($issueID:Int!) {
  issueDelete(issueID: $issueID) {
    name
  }
}`;

 function isNumber(value) {
    var reg = /^[\d|\.]*$/;
    return reg.test(value)
  }

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://10.0.2.2:3000/graphql',
  }),
  cache: new InMemoryCache(),
})

function DeleteComponent() {
  let input;
  const [issueDelete, { data, loading, error }] = useMutation(deleteMutation);

  if (loading) return <Text>'Submitting...'</Text>;
  if (error) return <Text>`Submission error! ${error.message}`</Text>;

  return (<View style={styles.container}>
            <TextInput
                placeholder="DeleteID"
                editable={true}//是否可编辑
                style={styles.inputStyle}//input框的基本样式
                onChangeText={(text) =>
                  {{
                    console.log("The text is ",text)
                    input = text
                  
                  }
                }}//输入框改变触发的函数
            />
            <TouchableOpacity onPress={
              // showData()
              () => {
              console.log("the type of input is ",input)
              if (input == undefined) {
                console.log("The input is undefined")
                alert("Input shoundn't be None")
              } else if (!isNumber(input)) {
                alert("The DeleteID is not number")
              } else if (input == "") {
                alert("The DeleteID is None")
              } else {
              issueDelete({
                  variables:{
                    issueID:input
                  }
              })
            }}
            }>
                <View style={styles.btn}>
                    <Text style={styles.wordC}>Delete</Text>
                </View>
            </TouchableOpacity>
        </View>)
}

const App = () => (
  <ApolloProvider client={client}>
    <View style={styles.container}>
    <Text style={styles.welcome}>Delete Function:</Text>
      <DeleteComponent />
    </View>
  </ApolloProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  btn:{
    width:85,
    height:30,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"green",
    // borderRadius:5
},
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  inputStyle:{
    width:280,
    height:50,
    borderColor:"black",
    borderWidth:1,
    marginLeft:5,
},
wordC:{
  color:"white",
  fontSize:18,
}
})

export default App;