// LockScan.tsx - camera-first auto-decode, no native barcode module
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNotification from '../components/TopNotification';

const { width, height } = Dimensions.get("window");
const scanWindowSize = Math.min(width, height) * 0.62;

export default function LockScan() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [autoCameraAttempted, setAutoCameraAttempted] = useState(false);
    const [notifVisible, setNotifVisible] = useState(false);
    const [notifMessage, setNotifMessage] = useState('');
  
    const showNotification = (msg: string, autoHide = true) => {
      setNotifMessage(msg);
      setNotifVisible(true);
      if (!autoHide) {
  
      }
    };

  useEffect(() => {
    if (!autoCameraAttempted) {
      setAutoCameraAttempted(true);
      void openCameraAndDecode();
    }
  }, [autoCameraAttempted]);

  async function openCameraAndDecode() {
    try {
      setScannedData(null);
      setIsProcessing(true);

      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (perm.status !== "granted") {
        setIsProcessing(false);
        Alert.alert("Camera permission required", "Please allow camera access to scan QR codes.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        // use MediaTypeOptions.Images for your version
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        setIsProcessing(false);
        return;
      }

      const uri = result.assets[0].uri;
      const decoded = await uploadAndDecode(uri);
      setIsProcessing(false);

      if (decoded) {
        setScannedData(decoded);
        if (Platform.OS !== "web") Vibration.vibrate(120);
      } else {
        Alert.alert("No QR found", "Couldn't detect a QR code. Try again with a clearer shot.");
      }
    } catch (err: any) {
      console.error("openCameraAndDecode error:", err);
      setIsProcessing(false);
      Alert.alert("Error", String(err?.message ?? err));
    }
  }

  async function pickFromGalleryAndDecode() {
    try {
      setScannedData(null);
      setIsProcessing(true);

      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (perm.status !== "granted") {
        setIsProcessing(false);
        Alert.alert("Permission required", "Permission to access the gallery is required.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        setIsProcessing(false);
        return;
      }

      const uri = result.assets[0].uri;
      const decoded = await uploadAndDecode(uri);
      setIsProcessing(false);

      if (decoded) {
        setScannedData(decoded);
        if (Platform.OS !== "web") Vibration.vibrate(120);
      } else {
        Alert.alert("No QR found", "Couldn't detect a QR code.");
      }
    } catch (err: any) {
      console.error("pickFromGalleryAndDecode error:", err);
      setIsProcessing(false);
      Alert.alert("Error", String(err?.message ?? err));
    }
  }

  async function uploadAndDecode(uri: string): Promise<string | null> {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const formData = new FormData();
      // @ts-ignore
      formData.append("file", { uri, name: "photo.jpg", type: blob.type || "image/jpeg" });

      console.log("Uploading image to QR API...");
      const res = await fetch("https://api.qrserver.com/v1/read-qr-code/", {
        method: "POST",
        body: formData as any,
      });

      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        console.warn("QR API returned non-JSON response:", text);
        return null;
      }

      console.log("QR API response:", JSON.stringify(json, null, 2));
      if (!Array.isArray(json)) return null;
      const first = json[0];
      if (!first || !Array.isArray(first.symbol)) return null;
      const sym = first.symbol[0];
      if (!sym) return null;
      if (!sym.data) {
        console.warn("QR symbol object:", sym);
        return null;
      }
      return sym.data ?? null;
    } catch (err) {
      console.error("uploadAndDecode error:", err);
      return null;
    }
  }

  return (
    <View style={styles.container}>
      <TopNotification
                  message={notifMessage}
                  visible={notifVisible}
                  onHide={() => setNotifVisible(false)}
                  duration={3000}
                />
            {/* Back button */}
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={() => router.back()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel="Go back"
              activeOpacity={0.7}
            >
              <Image
                source={require('../assets/images/EDen/Arrow.png')}
                style={{ width: 22, height: 22, left: width * 0.03 }}
              />
            </TouchableOpacity>
      
            {/* Screen title */}
            <Text style={styles.forgettext}>Settings</Text>
      
      <SafeAreaView style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Feather name="x" size={26} color="#000" />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.centerScreen}>
        <View style={styles.scanWindow}>
          <View style={[styles.corner, styles.cornerTopLeft]} />
          <View style={[styles.corner, styles.cornerTopRight]} />
          <View style={[styles.corner, styles.cornerBottomLeft]} />
          <View style={[styles.corner, styles.cornerBottomRight]} />

          {isProcessing ? (
            <>
              <ActivityIndicator size="large" />
              <Text style={{ marginTop: 8 }}>Decoding…</Text>
            </>
          ) : scannedData ? (
            <View style={styles.resultBox}>
              <Text numberOfLines={6} style={styles.resultText}>
                {scannedData}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setScannedData(null);
                }}
                style={styles.rescanBtn}
              >
                <Text style={styles.rescanText}>Clear</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={{ textAlign: "center", color: "#333" }}>
                Camera opened automatically. If it didn't, tap the button below.
              </Text>

              <TouchableOpacity style={[styles.actionBtn, { marginTop: 12 }]} onPress={openCameraAndDecode}>
                <Text style={styles.actionText}>Open Camera</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <TouchableOpacity style={[styles.actionBtn, { marginTop: 16 }]} onPress={pickFromGalleryAndDecode}>
          <Text style={styles.actionText}>Pick from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { marginTop: 12, backgroundColor: "#ddd" }]}
          onPress={() => {
            Alert.alert(
              "How this works",
              "This opens the camera, takes a photo and decodes the QR on a remote server. It keeps everything inside the app UI and returns results here."
            );
          }}
        >
          <Text style={{ color: "#000" }}>How it works</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topBar: { width: "100%", paddingHorizontal: 12, paddingTop: 10, alignItems: "flex-start" },
  iconButton: { backgroundColor: "transparent", padding: 8, borderRadius: 8 },
  centerScreen: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 18 },
  scanWindow: {
    width: scanWindowSize,
    height: scanWindowSize,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#fafafa",
  },
  corner: { position: "absolute", width: 24, height: 24, borderColor: "#00FFB3" },
  cornerTopLeft: { top: 6, left: 6, borderLeftWidth: 4, borderTopWidth: 4 },
  cornerTopRight: { top: 6, right: 6, borderTopWidth: 4, borderRightWidth: 4 },
  cornerBottomLeft: { bottom: 6, left: 6, borderLeftWidth: 4, borderBottomWidth: 4 },
  cornerBottomRight: { bottom: 6, right: 6, borderBottomWidth: 4, borderRightWidth: 4 },

  resultBox: { padding: 8, alignItems: "center", justifyContent: "center" },
  resultText: { color: "#000", textAlign: "center" },
  rescanBtn: { backgroundColor: "#00C48C", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, marginTop: 8 },
  rescanText: { color: "#fff" },

  actionBtn: { backgroundColor: "#1C9174", paddingVertical: 12, paddingHorizontal: 28, borderRadius: 8 },
  actionText: { color: "#fff", fontWeight: "600" },
  logoContainer: {
    alignItems: 'center',
    right: width * 0.4,
    marginBottom: height * 0.02,
    paddingTop: height * 0.02,
    top: width * 0.06,
  },
  forgettext:{
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    bottom: width * 0.05,
    left: width * 0.16,
    marginBottom: 0,
    marginLeft: width * 0.23,
    },
});
