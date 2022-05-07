import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import ImageAutoHeight from "react-native-image-auto-height";

const CardButton = () => {
  return (
    <TouchableOpacity style={styles.btn_container}>
      <AntDesign name="creditcard" size={24} color="white" />
      <Text style={styles.text_btn}>CARD</Text>
    </TouchableOpacity>
  );
};
const ImgButton = ({
  src,
  onPress,
  imgSize,
  background,
  borderColor,
  borderWidth,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btn_container,
        {
          backgroundColor: background || "#000",
          borderColor: borderColor,
          borderWidth: borderWidth,
        },
      ]}
    >
      <ImageAutoHeight
        source={src}
        style={[styles.btn_image, { width: imgSize || 100, height: "auto" }]}
      />
    </TouchableOpacity>
  );
};

const deviceWidth = Dimensions.get("window").width;
const modalSize = deviceWidth - 60;
export function PaymentMethod() {
  const { colors } = useTheme();
  const [modal, setModal] = useState(false);

  function handleCheckout() {
    setModal(true);
  }

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}
      >
        <TouchableOpacity
          onPress={() => setModal(!modal)}
          style={styles.centeredView}
          activeOpacity={1}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.modalView, { backgroundColor: colors.background }]}
          >
            <View style={styles.pay_text_container}>
              <Text style={styles.pay_text}>PAYMENT METHOD</Text>
            </View>
            <View style={styles.btn_view}>
              <CardButton />
              <ImgButton
                src={require("../../assets/images/buttons/phonepe_btn.png")}
                background="#FFF"
                borderColor="#5F259F"
                borderWidth={1}
              />
              <ImgButton
                src={require("../../assets/images/buttons/gpay_btn.png")}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.cancel_container,
                { backgroundColor: colors.accent },
              ]}
            >
              <Text style={{ fontSize: 17 }}>CANCEL</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity
        style={[styles.checkout_btn, { backgroundColor: colors.accent }]}
        onPress={handleCheckout}
      >
        <Text>CHECKOUT</Text>
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkout_btn: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.5)",
  },
  modalView: {
    width: modalSize,
    height: modalSize * 1.2,
    borderRadius: modalSize / 15,
    overflow: "hidden",
    alignItems: "center",
  },
  pay_text_container: {
    height: modalSize / 4,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  pay_text: {
    fontSize: modalSize / 16,
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  btn_view: {
    width: "100%",
    height: modalSize * 1.2 - (modalSize / 4 + modalSize / 6.5),
    alignItems: "center",
    justifyContent: "center",
  },
  btn_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1D1D1D",
    width: 150,
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
  },
  text_btn: {
    color: "#FFF",
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "300",
  },
  cancel_container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: modalSize / 6.5,
  },
  btn_image: {
    height: "auto",
  },
});
