import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  Text,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import pattern from "../../assets/pattern.png";
import axios from "axios";
import { Linking } from "react-native";

const Capture = ({ navigation, route }) => {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case "picture":
          return route.params.picture;
      }
    }
    return "";
  };

  const [picture, setPicture] = useState(getDetails("picture"));
  const [modal, setModal] = useState(false);
  const [enableshift, setenableShift] = useState(false);
  const [result, setResult] = useState();

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.canceled) {
        const formData = new FormData();
        formData.append("file", {
          uri: data.uri,
          type: "image/jpeg",
          name: "my_image.jpg",
        });
        setModal(false)
        uploadImage(formData);
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.canceled) {
        const formData = new FormData();
        formData.append("file", {
          uri: data.uri,
          type: "image/jpeg",
          name: "my_image.jpg",
        });
        setModal(false)
        uploadImage(formData);
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };

  const uploadImage = (formData) => {
    axios
      .post(" https://ef59-103-127-35-2.ngrok-free.app/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(formData, "For data");
        console.log("Image uploaded successfully:", response.data);
        setResult(JSON.stringify(response.data));
        navigation.navigate('Result',{ result: response.data });
        Alert.alert(
          "Your Image Result is Here",
          // JSON.stringify(response.data)
        );
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const checkPing = () => {
    axios
      .get(" https://ef59-103-127-35-2.ngrok-free.app/ping", {})
      .then((response) => {
        // console.log(formData,"For data");
        console.log("Server Status:", response.data);
        setResult(JSON.stringify(response.data));
        Alert.alert("Server Status", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  const imageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw8kqlw8SSli_9CG-boUVYMxv7aAjdmgPDr5xX4ssU&s";

  const text = "------------>";
  const Note = "(Click on the Capture Button 👉 )";
  const textP = "(👈Click here to predict Image..!  )";

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.patternbg} source={pattern} />
      <KeyboardAvoidingView
        behavior="position"
        style={styles.root}
        enabled={enableshift}
      >
        <View>
          <Image
            style={styles.ImageK}
            source={require("../../assets/green.png")}
          ></Image>
          <Text style={styles.heading}>
            One-step solution for every farmer needs
          </Text>

          <Text style={styles.desc}>
            Capture the picture of your crop and upload it, we give a feasible
            solution for it.
          </Text>

          <View style={styles.CaptureD}>
            <Text style={styles.Note}> {Note}</Text>
            <View style={{ marginTop: 1 }}>
              <TouchableOpacity
                icon={picture == "" ? "camera" : "check"}
                mode="contained"
                theme={theme}
                onPress={() => setModal(true)}
                style={styles.roundButton}
              >
                <View style={styles.shadowProp}>
                  <Text style={styles.Capture}> Capture </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Predict */}
            <View style={styles.predictD}>
              <TouchableOpacity
                // onPress={() => submit(imageUrl)}
                onPress={() => checkPing()}
                style={styles.roundButton2}
              >
                <View style={styles.shadowProp}>
                  <Text style={styles.Capture}> Predict </Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.predict}>{textP}</Text>
            </View>

            {/* ++++++++++++++++++++++++++++++++++++ */}
            <View style={styles.screen2}>
              <Text style={styles.working}>Our Working..</Text>
              <Image
                style={styles.ImageAl}
                source={require("../../assets/DiseasePre.png")}
              ></Image>
              <Text style={styles.working}>{text}</Text>
            </View>
            {/* <Text style={styles.Plus}>+ </Text> */}
          </View>

          {/* ****************************************** */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
              setModal(false);
            }}
          >
            <View style={styles.modalView}>
              <View style={styles.modalButtonView}>
                <Button
                  icon="camera"
                  theme={theme}
                  mode="contained"
                  onPress={() => pickFromCamera()}
                >
                  camera
                </Button>
                <Button
                  icon="image-area"
                  mode="contained"
                  theme={theme}
                  onPress={() => pickFromGallery()}
                >
                  gallery
                </Button>
              </View>
              <Button theme={theme} onPress={() => setModal(false)}>
                cancel
              </Button>
            </View>
          </Modal>
          {/* ****************************************** */}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const theme = {
  colors: {
    primary: "green",
  },
};

const styles = StyleSheet.create({
  predictD: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    width: "100%",
    height: "120%",
    display: "flex",
  },
  patternbg: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: -2,
  },
  root: {
    flex: 1,
  },
  inputStyle: {
    margin: 5,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  heading: {
    padding: 5,
    fontSize: 35,
    // fontWeight: 500,
    color: "#009e13",
    textAlign: "center",
  },
  button: {
    backgroundColor: "green",
    borderRadius: 10,
    textAlign: "center",
    color: "white",
    padding: 10,
  },

  Capture: {
    textAlign: "center",
    // marginBottom:11,
    // fontWeight: 500,
    fontSize: 15,
    color: "black",
  },
  predict: {
    // fontWeight: 500,
    fontSize: 15,
    color: "white",
    marginTop: 40,
  },
  roundButton2: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#90EE90",
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    left: 0,
  },
  roundButton: {
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
    left: 250,
  },
  desc: {
    padding: 11,
    margin: 5,
    marginBottom: 0,
    color: "white",
    fontSize: 18,
    // fontWeight: 500,
  },
  Note: {
    // padding:10,
    marginLeft: 10,
    marginTop: 20,
    color: "white",
  },
  ImageAl: {
    width: 350,
    height: 200,
  },
  ImageK: {
    width: 200,
    height: 200,
  },
  screen2: {
    backgroundColor: "green",
    borderRadius: 150,
    marginTop: 25,
    padding: 5,
  },
  working: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    // fontWeight: 500,
  },
});

export default Capture;
