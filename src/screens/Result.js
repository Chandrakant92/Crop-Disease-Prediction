import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import pattern from "../../assets/pattern.png";

const Result = ({ navigation, route }) => {
  const { result } = route.params;
  console.log(result);
  const Note = " 👉  Result of Your Image  👈 ";
  const categrious = JSON.stringify(result.class);
  const confidence = JSON.stringify(result.confidence);
  const thank1 = "🙂..Thank you for visiting..🙂";
  const thank2 = "!!..Make sure your plant is healthy..!! ";

  const checkPing = () => {
    navigation.pop();
  };
  return (
    <View style={styles.container}>
      <Image style={styles.patternbg} source={pattern} />

      <View style={styles.screen2}>
        <Text style={styles.heading}>{Note}</Text>
        <View style={styles.subContainer}>
          <Image
            style={styles.ImageK}
            source={require("../../assets/image-cotton.jpg")}
          ></Image>
          <Text style={styles.data1}>
            Plant disease classification: {categrious}
          </Text>
          <Text style={styles.data}>Confidence score: {confidence}</Text>

          <Text style={styles.thank}>{thank1}</Text>
          <Text style={styles.thank}>{thank2}</Text>
        </View>
      </View>

      <View style={styles.predictD}>
        <TouchableOpacity
          // onPress={() => submit(imageUrl)}
          onPress={() => checkPing()}
          style={styles.roundButton2}
        >
          <View style={styles.shadowProp}>
            <Text style={styles.Capture}> Go Back </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  patternbg: {
    position: "absolute",
    top: 0,
    display: "flex",
    width: "100%",
    height: "100%",
    zIndex: -2,
  },
  screen2: {
    backgroundColor: "white",
    marginTop: 25,
    display: "flex",
    padding: 5,
    margin: 10,
    top: "10%",
    height: "55%",
    width: "90%",
    borderRadius: 10,
  },
  heading: {
    textAlign: "center",
    fontSize: 18,
  },
  subContainer: {
    marginTop: 30,
    margin: 10,
    display: "flex",
    // backgroundColor:'#ced0db'
    textAlign: "center",
  },
  data: {
    padding: 1,
    fontSize: 16,
    textAlign: "center",
    margin: 2,
  },
  data1: {
    padding: 1,
    fontSize: 16,
    textAlign: "center",
    marginTop: 15,
  },
  thank: {
    top: "25%",
    padding: 3,
    textAlign: "center",
  },
  ImageK: {
    marginLeft: "7%",
  },
  predictD: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    top:'50%'
  },
  roundButton2: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#e66819",
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    left: 0,
  },
  Capture: {
    textAlign: "center",
    fontSize: 15,
    color: "black",
  },
  predict: {
    // fontWeight: 500,
    fontSize: 15,
    color: "white",
    marginTop: 40,
  },
});
