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

const Button = () => {
  return (
    <TouchableOpacity>
      <Text>Hi</Text>
    </TouchableOpacity>
  );
};

const deviceWidth = Dimensions.get("window").width;
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
          // onPress={() => setModal(false)}
          style={styles.centeredView}
          activeOpacity={1}
        >
          <View
            style={[styles.modalView, { backgroundColor: colors.background }]}
          >
            <Text style={styles.pay_text}>PAYMENT METHOD</Text>
            <Button />
            <TouchableOpacity
              style={[
                styles.cancel_container,
                { backgroundColor: colors.accent },
              ]}
            >
              <Text>CANCEL</Text>
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
    backgroundColor: "#d22",
  },
  modalView: {
    width: deviceWidth - 50,
    height: 300,
  },
  pay_text: {
    fontSize: 17,
  },
});
