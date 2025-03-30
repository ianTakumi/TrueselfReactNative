import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Drawer } from "expo-router/drawer";
import { MaterialIcons, Entypo, Feather, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { logoutUser } from "@/app/redux/slices/authSlices";
import { useRouter } from "expo-router";
import { notifyToast } from "@/utils/helpers";
import ProfilePicture from "@/components/user/profile";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type CustomHeaderProps = {
  navigation: DrawerNavigationProp<any, any>;
};

const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};
const CustomHeader = ({ navigation }: CustomHeaderProps) => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <View className="pr-4 pt-10 pb-5 mt-3  flex flex-row-reverse justify-between items-center bg-[#FAFAFA]">
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <ProfilePicture
          name={user.data?.name}
          imageUrl={user.data?.profile.url}
          size={40}
        />
      </TouchableOpacity>
      <View className="flex   w-1/2 px-5 ">
        <Text className="text-xl font-bold">{getGreeting() + "!"}</Text>
        <Text className="text-left font-extralight">{user.data?.name} </Text>
      </View>
    </View>
  );
};

const CustomDrawerContent = (props: any) => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    notifyToast("Logged out successfully", "success", "success");
    router.push("/login");
  };

  return (
    <ScrollView
      {...props}
      className="mt-10"
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#FAFAFA" }}
    >
      <Link href="/users/profile" asChild>
        <TouchableOpacity>
          <View className="p-4 flex flex-row items-center mt-3">
            <ProfilePicture
              name={user.data?.name}
              imageUrl={user.data?.profile?.url}
              size={50}
            />
            <View className="ml-4">
              <Text className="text-black">{user.data?.name}</Text>
              <Text className="text-gray-400">View profile</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>

      <View className="border-b border-[#353535]"></View>

      <View className="mx-5 my-6">
        {/* Mood Entries */}
        {/* <TouchableOpacity
          onPress={() => router.push("/users/Moods")}
          className="flex flex-row items-center gap-2 mb-6"
        >
          <MaterialIcons name="mood" size={24} color="#63579F" />
          <Text className="text-black font-bold text-xl">All Mood Entries</Text>
        </TouchableOpacity> */}

        {/* Journal Entry */}
        {/* <TouchableOpacity
          onPress={() => router.push("/users/Journals")}
          className="flex flex-row items-center mb-6"
        >
          <MaterialCommunityIcons
            name="notebook-edit"
            size={24}
            color="#63579F"
          />
          <Text className="text-black font-bold text-xl">
            All Journal Entry
          </Text>
        </TouchableOpacity> */}

        {/* AI Anxiety Test Results */}
        <TouchableOpacity
          onPress={() => router.push("/users/AnxietyResults")}
          className="flex flex-row items-center mb-6"
        >
          <FontAwesome6 name="brain" size={24} color="#63579F" />
          <Text className="text-black font-bold text-xl">
            All AI Anxiety Test Results
          </Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex flex-row items-center"
        >
          <AntDesign name="logout" size={24} color="#63579F" />
          <Text className="text-black font-bold text-xl ml-3">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Layout = () => {
  return (
    <Drawer
      screenOptions={{
        header: (props) => <CustomHeader {...props} />, // Use the custom header
        drawerContentStyle: { backgroundColor: "#1F1F1F" }, // Drawer background color
        drawerStyle: { backgroundColor: "#141414" },
        drawerPosition: "right",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom drawer content
    ></Drawer>
  );
};

export default Layout;
