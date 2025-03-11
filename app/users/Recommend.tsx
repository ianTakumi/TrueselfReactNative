import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const Recommend: React.FC = () => {
  const [region, setRegion] = useState({
    latitude: 14.5995, // Default: Manila
    longitude: 120.9842,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [hospitals, setHospitals] = useState<
    { name: string; latitude: number; longitude: number }[]
  >([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      const userLocation = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

      setRegion(userLocation);
      setLocation(userLocation);
      fetchHospitals(userLocation.latitude, userLocation.longitude);
    })();
  }, []);

  const fetchHospitals = async (lat: number, lng: number) => {
    const metroManilaHospitals = [
      {
        name: "St. Luke's Medical Center – Quezon City",
        latitude: 14.6181,
        longitude: 121.0004,
      },
      {
        name: "St. Luke's Medical Center – BGC",
        latitude: 14.5412,
        longitude: 121.0537,
      },
      { name: "Makati Medical Center", latitude: 14.5546, longitude: 121.0189 },
      {
        name: "The Medical City – Ortigas",
        latitude: 14.5919,
        longitude: 121.0646,
      },
      {
        name: "Philippine General Hospital",
        latitude: 14.5854,
        longitude: 120.985,
      },
      {
        name: "Manila Doctors Hospital",
        latitude: 14.5875,
        longitude: 120.9824,
      },
      {
        name: "East Avenue Medical Center",
        latitude: 14.6471,
        longitude: 121.045,
      },
      {
        name: "Cardinal Santos Medical Center",
        latitude: 14.607,
        longitude: 121.0449,
      },
      {
        name: "Chinese General Hospital and Medical Center",
        latitude: 14.6337,
        longitude: 120.989,
      },

      { name: "VRP Medical Center", latitude: 14.6023, longitude: 121.0458 },

      {
        name: "Parañaque Doctors' Hospital",
        latitude: 14.4792,
        longitude: 121.0069,
      },
      {
        name: "Las Piñas Doctors Hospital",
        latitude: 14.4477,
        longitude: 120.9804,
      },
      {
        name: "Pasay City General Hospital",
        latitude: 14.5486,
        longitude: 120.9969,
      },
      {
        name: "Caloocan City Medical Center",
        latitude: 14.6571,
        longitude: 120.9913,
      },
      {
        name: "Valenzuela Medical Center",
        latitude: 14.7002,
        longitude: 120.9835,
      },
      { name: "Navotas City Hospital", latitude: 14.6621, longitude: 120.9464 },
      {
        name: "Taguig-Pateros District Hospital",
        latitude: 14.5108,
        longitude: 121.0341,
      },
      {
        name: "Novaliches General Hospital",
        latitude: 14.7095,
        longitude: 121.0389,
      },
      { name: "Ospital ng Muntinlupa", latitude: 14.4148, longitude: 121.0413 },
      {
        name: "San Juan Medical Center",
        latitude: 14.6069,
        longitude: 121.0293,
      },
    ];

    setHospitals(metroManilaHospitals);
  };

  return (
    <ScrollView className="flex-1 bg-[#FAFAFA]">
      <View className="relative h-56">
        <LinearGradient
          colors={["#E0C3FC", "#8E44AD"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="h-full w-full justify-center"
          style={{
            height: "100%",
            width: "100%",
            borderBottomLeftRadius: 9999,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
          }}
        >
          <Text className="absolute top-28 right-6 text-white text-2xl font-bold">
            Recommended Hospitals
          </Text>
        </LinearGradient>
      </View>

      <Text className="text-gray-600 mt-5 px-8">
        Our AI analysis indicates severe anxiety. Seeking professional help is
        highly recommended. Here are hospitals that can assist you.
      </Text>

      <View className="mt-5 px-8">
        <Text className="text-gray-600 font-bold">Nearby Hospitals</Text>
        <MapView style={{ height: 400, width: "100%" }} region={region}>
          {/* User Location Marker */}
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="You are here"
              pinColor="blue"
            />
          )}

          {/* Hospital Markers */}
          {hospitals.map((hospital, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: hospital.latitude,
                longitude: hospital.longitude,
              }}
              title={hospital.name}
            />
          ))}
        </MapView>
      </View>
    </ScrollView>
  );
};

export default Recommend;
