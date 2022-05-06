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

const Button = () => {
  return (
    <TouchableOpacity style={styles.btn_container}>
      <AntDesign name="creditcard" size={24} color="white" />
      <Text style={styles.text_btn}>CARD</Text>
    </TouchableOpacity>
  );
};

const deviceWidth = Dimensions.get("window").width;
const modalSize = deviceWidth - 50;
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
          <View
            style={[styles.modalView, { backgroundColor: colors.background }]}
          >
            <View style={styles.pay_text_container}>
              <Text style={styles.pay_text}>PAYMENT METHOD</Text>
            </View>
            <View style={styles.btn_view}>
              <Button />
            </View>
            <TouchableOpacity
              style={[
                styles.cancel_container,
                { backgroundColor: colors.accent },
              ]}
            >
              <Text style={{ fontSize: 17 }}>CANCEL</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  pay_text: {
    fontSize: modalSize / 16,
    width: "100%",
    textAlign: "center",
  },
  btn_view: {
    backgroundColor: "#d22",
    width: "100%",
    height: modalSize * 1.2 - (modalSize / 4 + modalSize / 6.5),
    alignItems: "center",
    justifyContent: "center",
  },
  btn_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    width: 150,
    height: 50,
    borderRadius: 10,
  },
  text_btn: {
    color: "#FFF",
    marginLeft: 10,
  },
  cancel_container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: modalSize / 6.5,
  },
});
