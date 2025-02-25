import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const mockCommunities = [
  {
    id: "1",
    name: "Mindful Healing",
    createdAt: "Jan 12, 2024",
    members: 1_200,
    image:
      "https://ca-times.brightspotcdn.com/dims4/default/cd10d8e/2147483647/strip/true/crop/2000x1333+0+0/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8e%2Fb7%2F99beae9a4be0bbced1487b04b619%2Fla-hm-nyny-mental-health.jpg",
  },
  {
    id: "2",
    name: "LGBT+ Support",
    createdAt: "Feb 5, 2023",
    members: 980,
    image:
      "https://m.media-amazon.com/images/I/51MIYbkMFlS._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "3",
    name: "Anxiety Warriors",
    createdAt: "March 20, 2022",
    members: 2_500,
    image:
      "https://t3.ftcdn.net/jpg/05/58/79/54/360_F_558795469_pvzp1H4yYhRSqo6hdhD00GzQMt2Vhian.jpg",
  },
  {
    id: "4",
    name: "Mental Wellness Hub",
    createdAt: "July 8, 2021",
    members: 3_100,
    image:
      "https://static.wixstatic.com/media/d61f6d_924cc0e5355f48ce84b159a17166f64e~mv2.jpg/v1/fill/w_568,h_568,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/d61f6d_924cc0e5355f48ce84b159a17166f64e~mv2.jpg",
  },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView className="bg-[#FAFAFA] flex-1 px-4">
      <View className="w-full">
        <Text className="text-left font-bold text-3xl font-[Raleway-Regular]">
          Search Communities
        </Text>
      </View>

      {/* Search input container */}
      <View className="w-full mt-4 flex-row items-center border-2 border-[#9E9E9E] rounded-xl bg-white shadow-md p-4">
        <Ionicons name="search" size={24} color="#9E9E9E" className="mr-2" />
        <TextInput
          placeholder="Search for communities..."
          className="flex-1 text-[18px] text-[#333]"
          placeholderTextColor="#9E9E9E"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Community List */}
      <FlatList
        data={mockCommunities.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-white p-5 mt-4 rounded-2xl shadow-md border border-gray-200">
            <View className="flex-row items-center">
              <Image
                source={{ uri: item.image }}
                className="w-20 h-20 rounded-lg"
              />
              <View className="ml-4 flex-1">
                <Text className="font-bold text-xl">{item.name}</Text>
                <Text className="text-gray-500 text-sm">
                  Created: {item.createdAt}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {item.members} members
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
