import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabIcon } from '../../components/Tabicon/TabIcon';
import { PostsScreen } from '../PostsScreen/PostsScreen';
import { CreatePostsScreen } from '../CreatePostsScreen/CreatePostsScreen';
import { ProfileScreen } from '../ProfileScreen/ProfileScreen';
import { Logout } from '../../components/LogOut/LogOut';
import { Goback } from '../../components/GoBack/GoBack';
import ProfileIcon from '../../img/profile-icon.svg';
import Addicon from '../../img/new-icon.svg';
import PublicationIcon from '../../img/publication-icon.svg';

const Tab = createBottomTabNavigator();

export const Home = () => {
   return (
      <Tab.Navigator
         initialRouteName="PostScreen"
         screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: { fontFamily: 'Roboto-Medium', fontSize: 17 },
            headerStyle: {
               borderBottomColor: '#B3B3B3',
               borderBottomWidth: 0.5,
               backgroundColor: '#FFFFFF',
            },
            headerLeftContainerStyle: { marginLeft: 16 },
            headerRightContainerStyle: { marginRight: 16 },
            tabBarShowLabel: false,
            tabBarStyle: { borderTopColor: '#B3B3B3', borderTopWidth: 0.5, height: 71 },
         }}
      >
         <Tab.Screen
            options={{
               title: 'Публікації',
               headerRight: () => <Logout />,
               tabBarIcon: () => <TabIcon icon={PublicationIcon} />,
            }}
            name="PostsScreen"
            component={PostsScreen}
         />
         <Tab.Screen
            options={{
               title: 'Створити публікацію',
               tabBarStyle: { display: 'none' },
               headerLeft: () => <Goback />,
               tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={Addicon} />,
            }}
            name="CreatePostsScreen"
            component={CreatePostsScreen}
         />
         <Tab.Screen
            options={{
               title: 'Профіль',
               headerLeft: () => <Goback onPress={() => goBack()} />,
               tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={ProfileIcon} />,
            }}
            name="ProfileScreen"
            component={ProfileScreen}
         />
      </Tab.Navigator>
   );
};
