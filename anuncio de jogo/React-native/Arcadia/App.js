// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroScreen from './screens/CadastroScreen';
import ConsultaScreen from './screens/ConsultaScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Cadastro"
        screenOptions={{
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#a64dff',
          headerTitleStyle: { fontSize: 24 },
        }}
      >
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Arcadia' }} />
        <Stack.Screen name="Consulta" component={ConsultaScreen} options={{ title: 'Consulta' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;