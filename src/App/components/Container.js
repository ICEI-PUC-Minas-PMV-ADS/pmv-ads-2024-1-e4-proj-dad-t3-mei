import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Container = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
